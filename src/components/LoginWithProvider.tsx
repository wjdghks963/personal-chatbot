import {ProviderMapObject} from "./user/SignIn";
import Image from "next/image";
import {auth} from "../libs/firebase/auth"

export default function LoginWithProvider({providerMap, providerKey,isConvert}:{providerMap?:ProviderMapObject, providerKey:string,isConvert?:boolean}){

    const onClick = async ()=>{
        const userInfo = await providerMap?.signinFn();

        if(isConvert){
            return await providerMap?.convertToPermanent(userInfo.idToken)
        }else{
            return userInfo
        }
    }

    return (
        <div className={`flex p-5 cursor-pointer border-2 border-black rounded-md shadow-md ${providerMap?.bgColor}`} onClick={onClick}>
            <Image className={'mr-5'} src={providerMap?.svg?.src as string } alt={`${providerKey}`} width={25} height={25}/>
            <span className={"font-semibold"}>{providerKey}</span>
            <span className={'ml-2'}> 시작하기</span>
    </div>)
}