import {ChatObject, SettingDataJson} from "../../../type";
import temporaryJson from "../../assets/settingDataJson.json";
interface ChatBubbleObject extends ChatObject {
    loading?:boolean
}


export default function ChatBubble({role, content, loading}:ChatBubbleObject){

    const item = (): SettingDataJson => {

        if(typeof window !== 'undefined'){
            return JSON.parse( localStorage?.getItem('settingDataJson') ?? JSON.stringify(temporaryJson));
        }
        return JSON.parse(JSON.stringify(temporaryJson));
    }



    const name = role === 'user' ? item().userName : item().aiName;

    const bgByRole = (role:'user'|'assistant'):string =>{
        switch (role){
            case 'user': {
                return 'bg-blue-100'
            }
            case 'assistant':{
                return 'bg-blue-300'
            }
        }
    }

    return (
        <div className={`flex-col`}>
                <span className={`block font-semibold mb-3`}>{name}</span>
                <span className={`block border-blue ${bgByRole(role)} p-2`}>{loading ? '입력 중...':content}</span>
        </div>
    )
}