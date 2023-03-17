import {InputBoxProps} from "../../../type";

export default function ChatInputBox({identity, propertyRef}:InputBoxProps){

   return (
       <input id={identity} className="w-full p-3 bg-inherit border-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-blue-600 focus:ring-blue-600" type={"text"} ref={propertyRef} placeholder={`AI에게 물어보고 싶은 걸 입력해 주세요`}/>
    )

}