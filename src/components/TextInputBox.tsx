import {InputBoxProps} from "../../type";

interface TextInputBox extends InputBoxProps {
    placeholder?:string;
    inputStyleAdd? :string;
    typeOf:string;
}

export default function TextInputBox<T>({propertyRef, identity, placeholder,inputStyleAdd,typeOf}:TextInputBox){

    return (
        <div className={"py-3 flex justify-between"}>
            <span className={"my-auto align-middle"}>{identity}</span>
            <input className={`p-3 bg-inherit border-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-blue-600 focus:ring-blue-600 ${inputStyleAdd}`} type={typeOf}  ref={propertyRef} placeholder={`${placeholder}`}/>
        </div>
    )

}
