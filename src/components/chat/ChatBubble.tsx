import {ChatObject, SettingDataJson} from "../../../type";


export default function ChatBubble({role, content}:ChatObject){
console.log(JSON.parse('{"concepts": "","frequencyPenalty": 0,"presencePenalty": 0,"topP": 0,"aiName": "나", "userName": "AI" }'))


     const item : SettingDataJson = JSON.parse(localStorage.getItem('settingDataJson') ?? '{"concepts": "","frequencyPenalty": 0,"presencePenalty": 0,"topP": 0,"aiName": "나", "userName": "AI" }');

    const name = role === 'user' ? item.userName : item.aiName;

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

    return <div className={`flex-col`}>
        <span className={`block font-semibold mb-3`}>{name}</span>
        <span className={`block border-blue ${bgByRole(role)} p-2`}>{content}</span>
    </div>
}