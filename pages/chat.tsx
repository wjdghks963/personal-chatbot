import {
    ChatObject,
    GenerateRequestBody,
    OpenAiApiResponse,
    ReduxSliceState,
    selectorClearChatToggle,
    SettingDataJson
} from "../type";
import ChatInputBox from "../src/components/chat/ChatInputBox";
import {useEffect, useRef, useState} from "react";
import {auth} from '../src/libs/firebase/auth'
import fetchPost from "../src/utils/fetchPost";
import ChatBubble from "../src/components/chat/ChatBubble";
import NavBarLayout from "../src/components/NavBarLayout";
import {useSelector} from "react-redux";
import {getSettingDataJson} from "../src/utils/localStorage";


export default function Chat(){
    const chatInputRef = useRef<HTMLInputElement>(null);
    const chatsDivRef = useRef<HTMLDivElement>(null);
    const [previousChats, setPreviousChats] = useState<ChatObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const chatClearToggle = useSelector((state : ReduxSliceState) => state.clearChatsReducer.toggle)


    const onSubmit = async (event:any) =>{
        event.preventDefault();
        if(loading || chatInputRef?.current?.value === "") return;

        setLoading(true)

        const prompt = chatInputRef.current?.value ?? "";
        setPreviousChats(prev => [...prev, { role: "user", content:prompt },{ role: "assistant", content:prompt }]);

        chatInputRef.current!.value = '';


        const settingDataJson:SettingDataJson = getSettingDataJson()
        const isRoleUser:ChatObject[] = previousChats.filter(chat => chat.role === 'user');
        const previousPrompt = isRoleUser.length === 0 ? '' : isRoleUser[isRoleUser.length-1].content;

        const data = await fetchPost<{ result:OpenAiApiResponse }, GenerateRequestBody >({url:"generate", json:{prompt, previousPrompt, settingDataJson, userEmail: auth.currentUser?.email}})
        setLoading(false);
        if(data?.result.error){
            setPreviousChats(prev => {
                const updatedChats = [...prev];
                updatedChats[updatedChats.length - 1] = { role: "assistant", content: "에러가 발생했습니다. 관리자에게 연락 주세요." };
                return updatedChats;
            });
            return console.error("OPEN AI API 관련 에러가 발생했습니다. ERROR : "+data?.result.error.message);
        }else{
            setPreviousChats(prev => {
                const updatedChats = [...prev];
                updatedChats[updatedChats.length - 1] = { role: data?.result.choices[0].message.role ?? "assistant", content: data?.result.choices[0].message.content ?? "" };
                return updatedChats;
            });

            // 동기적으로 localStorage 저장
            localStorage.setItem('previousChats', JSON.stringify([...previousChats, { role: "user", content:prompt  }, { role: data?.result.choices[0].message.role ?? "assistant", content: data?.result.choices[0].message.content ?? "" }]));
        }

    }

    useEffect(()=>{
        chatsDivRef.current!.scrollTop = chatsDivRef.current!.scrollHeight;
    },[loading ])

    useEffect(()=>{
        setPreviousChats([])
    },[chatClearToggle])


    useEffect(()=>{
        const localChats: string | null = localStorage.getItem('previousChats');
        if(localChats !== null){
            setPreviousChats(JSON.parse(localChats) as ChatObject[]);
        }
    },[])


    return (
        <NavBarLayout>
           <div className={'w-full flex-col flex mx-2 mt-3'}>
               <div className={`flex-col flex-1 max-h-[85vh] space-y-3 scroll-auto overflow-auto relative mx-3 pb-3`} ref={chatsDivRef}>
                   {previousChats.map((item,index)=> {
                       if (index !== previousChats.length-1) {
                           return <ChatBubble content={item.content} role={item.role} key={index}/>
                       } else {
                           return <ChatBubble loading={loading} content={item.content} role={item.role} key={index}/>
                       }
                   })
                   }
               </div>

               <form onSubmit={onSubmit} className={'flex space-x-2 w-full mb-3'}>
                   <ChatInputBox propertyRef={chatInputRef} identity={'prompt'}/>
                   <button className={'border-blue w-1/4 hover:bg-blue-500 hover:text-white'}>보내기</button>
               </form>
           </div>
        </NavBarLayout>

    )
}
