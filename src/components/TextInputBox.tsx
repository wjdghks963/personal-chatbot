import {InputBoxProps} from "../../type";


export default function TextInputBox<T>({propertyRef, identity}:InputBoxProps){

    return (
        <div className={"px-3 py-5"}>
            <input className="p-3 bg-inherit border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-blue-600 focus:ring-blue-600" type={"text"} ref={propertyRef} placeholder={`${identity}를 입력해주세요`}/>
        </div>
    )

}