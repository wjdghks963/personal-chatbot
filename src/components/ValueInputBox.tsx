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
            <div className={"relative"}>
                {popup ? <InputDescription title={identity!} description={description()} cssClassName={"top-10 z-10"} />: null}

            <span className={"cursor-help p-3 block "} onMouseEnter={()=>descriptionPopupUp()} onMouseOut={()=>descriptionPopupDown()}> {identity} : {value}%</span>
            </div>
        </div>
    )
}


