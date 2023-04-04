import {useDispatch, useSelector} from "react-redux";
import {ReduxSliceState} from "../../type";
import {setAlert} from "../../store/modules/AlertDialogSlice";

interface AlertDialog {
    text:string;
    okText:string;
    falseText:string
}

export default function AlertDialog({text, okText, falseText}:AlertDialog){
    const dispatch = useDispatch();

    const alertDialogSelector= useSelector((state:ReduxSliceState) => state.alertDialogReducer);
    const onClickOk = ()=>{
        alertDialogSelector.okFn();
        dispatch(setAlert({alertName:"",toggle:false,okFn:()=>{}}));

    }

    const onClickFalse = () =>{
        dispatch(setAlert({alertName:"",toggle:false,okFn:()=>{}}));
    }

    return(
        <div className={'w-1/3 h-1/3 flex-col flex text-center absolute bg-white border-blue'}>
            <span className={"font-bold block text-xl mt-2"}>{alertDialogSelector.alertName}</span>
            <div className={'flex-col flex h-full mx-2 justify-center text-center'}>
                <span className={"block text-blue-300 h-3/4 mt-4"}>{text}</span>
                <div className={'flex justify-between mb-2 flex-1 space-x-3'}>
                    <button className={"border-blue w-1/2 py-3"} onClick={onClickOk}>{okText}</button>
                    <button className={"border-blue w-1/2 py-3"} onClick={onClickFalse}>{falseText}</button>
                </div>
            </div>
        </div>
    )
}
