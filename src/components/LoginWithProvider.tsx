import {ProviderMapObject} from "./user/SignIn";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {setAlert} from "../../store/modules/AlertDialogSlice";

export default function LoginWithProvider({providerMap, providerKey,isConvert}:{providerMap?:ProviderMapObject, providerKey:string,isConvert?:boolean}){

    const dispatch = useDispatch();

    const onClick = async ()=>{

        if(providerKey === "익명"){
            const loginFn = async() => await providerMap?.signinFn();
            dispatch(setAlert({alertName:"익명 로그인", toggle:true, okFn:loginFn}))
            return;
        }
        await providerMap?.signinFn();
    }

    return (
        <div className={`flex p-5 cursor-pointer border-2 border-black rounded-md shadow-md ${providerMap?.bgColor}`} onClick={onClick}>
            <Image className={'mr-5'} src={providerMap?.svg?.src as string } alt={`${providerKey}`} width={25} height={25}/>
            <span className={"font-semibold"}>{providerKey} 시작하기</span>
    </div>)
}
