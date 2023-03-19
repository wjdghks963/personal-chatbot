import {ChangeEvent, useRef, useState} from "react";
import {InputBoxProps} from "../../type";
import InputDescription from "./InputDescription";

interface ValueInputBox extends InputBoxProps {
    range:{max:number, min:number}
}

export default function ValueInputBox<T>({propertyRef, identity, range}:ValueInputBox){

    const [value, setValue] = useState<number>(0);
    const [popup, setPopup] = useState<boolean>(false);

   const description  = () =>{
       let text = ""
       switch (identity){
           case "다양성":{
               text = "무작위성을 가지면서도 일관된 결과를 생성하는 수치로 높은 값은 출력을 더 무작위로 만들고 낮은 값은 더 집중적이고 결정적으로 만듭니다.";
               break;
           }
           case "일관성":{
               text = "특정 단어나 구문을 사용할 가능성을 낮추는 수치로 값이 높을수록 모델이 자주 사용하는 단어나 구문을 피하려고 합니다."
               break;
           }
           case "중복성":{
            text = "반복되는 단어나 구문을 피하기 위해 사용되는 수치로 값이 높을수록 이전 대화에서 사용한 단어나 구문을 더 피하려고 합니다."
               break;
           }
           default :{
               break
           }
       }
       return text;
   }

    const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
       let totalValue = 0;

       for(let i = range.min; i<range.max; i++){
           totalValue++;
       }
        let percent = +(((+e.target.value) / totalValue) * 100).toFixed(1);
        setValue(percent);
    }

    const descriptionPopupUp = () =>{
        setPopup(true)
    }

    const descriptionPopupDown = () =>{
        setPopup(false)
    }

    return (
        <div className={"px-3 py-5 flex-col"}>
            <div className={"flex mb-4 flex justify-between"}>
                <input onChange={(e)=>onChange(e)} type={"range"} defaultValue={0} min={range.min} max={range.max} step={0.1} ref={propertyRef}/>
                <span className={'ml-3'}>{identity}의 정도를 설정해주세요</span>
            </div>
            <div className={"relative flex"}>
                {popup ? <InputDescription title={identity!} description={description()} cssClassName={"top-10 z-10"} />: null}
                <svg className={"w-6 text-blue-600"} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path>
                </svg>
            <span className={"cursor-help p-1  block "} onMouseEnter={()=>descriptionPopupUp()} onMouseOut={()=>descriptionPopupDown()}> {identity} : {value}%</span>
            </div>
        </div>
    )
}


