import TextInputBox from "./TextInputBox";
import ValueInputBox from "./ValueInputBox";
import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {AIName, Concept, SettingDataJson, UserName} from "../../type";
import {settingTransaction} from "../libs/firebase/firestorage";
import {auth} from "../libs/firebase/auth"
import {getSettingDataJson, setSettingDataJson} from "../utils/localStorage";



export default function SettingForm({setFormToggle}:{setFormToggle?: Dispatch<SetStateAction<boolean>>}){
    const userNameRef = useRef<HTMLInputElement>(null);
    const aiNameRef = useRef<HTMLInputElement>(null);
    const conceptRef = useRef<HTMLInputElement>(null);
    const topPRef = useRef<HTMLInputElement>(null);
    const frequencyPenaltyRef = useRef<HTMLInputElement>(null);
    const presencePenaltyRef = useRef<HTMLInputElement>(null);


    const closeForm = () =>{
        // @ts-ignore
        return setFormToggle(false)
    }

    const onSubmit = async () => {
        const userName = userNameRef?.current?.value;
        const aiName = aiNameRef?.current?.value;
        const concepts = conceptRef?.current?.value;
        const topP = topPRef?.current?.value;
        const frequencyPenalty = frequencyPenaltyRef?.current?.value;
        const presencePenalty = presencePenaltyRef?.current?.value;

        const settingDataJson:SettingDataJson = {
            userName: userName ?? "",
            aiName:aiName ?? "",
            concepts : concepts ?? "",
            topP:topP ?? '1' ,
            frequencyPenalty:frequencyPenalty ?? '1',
            presencePenalty:presencePenalty ?? '1'
        }
        if(!auth.currentUser?.isAnonymous){
            await settingTransaction(auth.currentUser?.email ?? "", settingDataJson);
        }

        setSettingDataJson(settingDataJson);

        if(setFormToggle){
            return closeForm();
        }
    }


    useEffect(()=>{

        const settingDataJson:SettingDataJson = getSettingDataJson()

        userNameRef.current!.value = settingDataJson.userName;
        aiNameRef.current!.value = settingDataJson.aiName;
        conceptRef.current!.value = settingDataJson.concepts;
        topPRef.current!.value = settingDataJson.topP;
        frequencyPenaltyRef.current!.value = settingDataJson.frequencyPenalty;
        presencePenaltyRef.current!.value = settingDataJson.presencePenalty;
    },[])


    return (
        <div className={"flex-col px-2 absolute bg-white top-10 z-30 border-blue shadow-md"} >
            <TextInputBox<UserName> typeOf={'text'} propertyRef={userNameRef} identity={"유저 이름"} placeholder={"유저 이름"}/>
            <TextInputBox<AIName> typeOf={'text'} propertyRef={aiNameRef} identity={"AI 이름"} placeholder={"AI 이름"}/>
            <TextInputBox<Concept> typeOf={'text'} propertyRef={conceptRef} identity={"컨셉"} placeholder={"ex) 의사 개발자"}/>
            <ValueInputBox propertyRef={topPRef} identity={"다양성"} range={{max:1, min:0}}/>
            <ValueInputBox propertyRef={frequencyPenaltyRef} identity={"일관성"} range={{max:2, min:-2}}/>
            <ValueInputBox propertyRef={presencePenaltyRef} identity={"중복성"} range={{max:2, min:-2}}/>

            <div className={'flex'}>
                <button onClick={onSubmit} className={"mx-auto py-3 px-10 mb-3 block  border-blue shadow-md"}>저장</button>
                <button onClick={closeForm} className={"mx-auto py-3 px-10 mb-3 block  border-blue shadow-md"}>닫기</button>
            </div>
        </div>
    )
}
