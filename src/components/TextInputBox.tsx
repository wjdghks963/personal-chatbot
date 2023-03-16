import {InputBoxProps} from "../../type";

interface TextInputBox extends InputBoxProps {
    placeholder?:string;
}

export default function TextInputBox<T>({propertyRef, identity, placeholder}:TextInputBox){

    return (
        <div className={"py-3 flex justify-between"}>
            <span className={"my-auto ml-3 align-middle"}>{identity}</span>
            <input className="p-3 bg-inherit border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-blue-600 focus:ring-blue-600" type={"text"} ref={propertyRef} placeholder={`${placeholder}`}/>
        </div>
    )

}