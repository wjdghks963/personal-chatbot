import {ProviderMapObject} from "./user/SignIn";
import Image from "next/image";

export default function LoginWithProvider({providerMap, providerKey}:{providerMap?:ProviderMapObject, providerKey:string}){

    return (
        <div className={`flex p-5 cursor-pointer border-2 border-black rounded-md shadow-md ${providerMap?.bgColor}`} onClick={providerMap?.signinFn}>
            <Image className={'mr-5'} src={providerMap?.svg?.src as string } alt={`${providerKey}`} width={25} height={25}/>
            <span className={"font-semibold"}>{providerKey}</span>
            <span>로 시작하기</span>
    </div>)
}