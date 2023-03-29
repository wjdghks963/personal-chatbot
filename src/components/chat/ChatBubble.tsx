import {ChatObject, SettingDataJson} from "../../../type";
import temporaryJson from "../../assets/settingDataJson.json";
import {getSettingDataJson} from "../../utils/localStorage";
interface ChatBubbleObject extends ChatObject {
    loading?:boolean
}


export default function ChatBubble({role, content, loading}:ChatBubbleObject){

    const item = (): SettingDataJson => {

        if(typeof window !== 'undefined'){
            return getSettingDataJson()
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
            <span className={`block border-blue ${bgByRole(role)} p-2`}>{loading ? <span className={'block animate-bounce text-white'}>입력 중...</span>:content}</span>
        </div>
    )
}
