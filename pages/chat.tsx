import {ChatObject, GenerateRequestBody, OpenAiApiResponse, SettingDataJson} from "../type";
import ChatInputBox from "../src/components/chat/ChatInputBox";
import {useEffect, useRef, useState} from "react";
import {auth} from '../src/libs/firebase/auth'
import fetchPost from "../src/utils/fetchPost";
import ChatBubble from "../src/components/chat/ChatBubble";
import NavBarLayout from "../src/components/NavBarLayout";

export default function Chat(){
    const chatInputRef = useRef<HTMLInputElement>(null);
    const chatsDivRef = useRef<HTMLDivElement>(null);
    const [previousChats, setPreviousChats] = useState<ChatObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const onSubmit = async (event:any) =>{
        event.preventDefault();
        setLoading(true)

        const prompt = chatInputRef.current?.value ?? "";
        setPreviousChats(prev => [...prev, { role: "user", content:prompt }]);

        chatInputRef.current!.value = '';

        const settingDataJson:SettingDataJson = JSON.parse(localStorage.getItem('settingDataJson') ?? '');
        const isRoleUser:ChatObject[] = previousChats.filter(chat => chat.role === 'user');
        const previousPrompt = isRoleUser.length === 0 ? '' : isRoleUser[isRoleUser.length-1].content;

        const data = await fetchPost<{ result:OpenAiApiResponse }, GenerateRequestBody >({url:"generate", json:{prompt, previousPrompt, settingDataJson, userEmail: auth.currentUser?.email}})
        setLoading(false);
        setPreviousChats(prev => [...prev, { role: data?.result.choices[0].message.role ?? "assistant", content: data?.result.choices[0].message.content ?? "" }]);
    }

    useEffect(()=>{
        chatsDivRef.current!.scrollTop = chatsDivRef.current!.scrollHeight;
    },[loading])


    return (
        <NavBarLayout>
           <div className={`h-[85vh] flex-col space-y-3 scroll-auto overflow-auto relative mx-3 pb-3`} ref={chatsDivRef}>
               {previousChats.map((item,index)=><ChatBubble content={item.content} role={item.role} key={index}/>)}
           </div>

           <form onSubmit={onSubmit} className={'flex space-x-2 w-full'}>
               <ChatInputBox propertyRef={chatInputRef} identity={'prompt'}/>
               <button className={'border-blue w-1/4 hover:bg-blue-500 hover:text-white'}>보내기</button>
           </form>
        </NavBarLayout>

    )
}