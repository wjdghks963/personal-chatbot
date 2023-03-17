import TextInputBox from "./TextInputBox";
import ValueInputBox from "./ValueInputBox";
import {Dispatch, SetStateAction, useRef} from "react";
import {AIName, Concept, UserName} from "../../type";
import {settingTransaction} from "../libs/firebase/firestorage";
import {auth} from "../libs/firebase/auth"



export default function SettingForm({setFormToggle}:{setFormToggle?: Dispatch<SetStateAction<boolean>>}){
    const userNameRef = useRef<HTMLInputElement>(null);
    const aiNameRef = useRef<HTMLInputElement>(null);
    const conceptRef = useRef<HTMLInputElement>(null);
    const topPRef = useRef<HTMLInputElement>(null);
    const frequencyPenaltyRef = useRef<HTMLInputElement>(null);
    const presencePenaltyRef = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        const userName = userNameRef?.current?.value;
        const aiName = aiNameRef?.current?.value;
        const concepts = conceptRef?.current?.value;
        const topP = topPRef?.current?.value;
        const frequencyPenalty = frequencyPenaltyRef?.current?.value;
        const presencePenalty = presencePenaltyRef?.current?.value;

        const settingDataJson = {
            userName,
            aiName,
            concepts,
            topP,
            frequencyPenalty,
            presencePenalty
        }

        await settingTransaction(auth.currentUser?.email, settingDataJson);

        localStorage.setItem('settingDataJson', JSON.stringify(settingDataJson));
        


        if(setFormToggle){
            return setFormToggle(prev=>!prev)
        }
    }

    return (
        <div className={"flex-col p-4 absolute bg-white top-20 z-30 border-blue shadow-md"} >
            <TextInputBox<UserName> propertyRef={userNameRef} identity={"유저 이름"} placeholder={"유저 이름"}/>
            <TextInputBox<AIName> propertyRef={aiNameRef} identity={"AI 이름"} placeholder={"AI 이름"}/>
            <TextInputBox<Concept> propertyRef={conceptRef} identity={"컨셉"} placeholder={"ex) 의사 개발자"}/>
            <ValueInputBox propertyRef={topPRef} identity={"다양성"} range={{max:1, min:0}}/>
            <ValueInputBox propertyRef={frequencyPenaltyRef} identity={"일관성"} range={{max:2, min:-2}}/>
            <ValueInputBox propertyRef={presencePenaltyRef} identity={"중복성"} range={{max:2, min:-2}}/>

            <button onClick={onSubmit} className={"mx-auto py-3 px-10 block  border-blue shadow-md"}>저장</button>
        </div>
    )
}