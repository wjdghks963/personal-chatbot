import google from "../../assets/google.svg";
import email from "../../assets/email.svg"
import anonymous from "../../assets/anonymous.svg"
import signIn from "../../assets/signIn.svg"
import { signInWithAnonymous, signInWithGoogle} from "../../libs/firebase/auth";
import LoginWithProvider from "../LoginWithProvider"
import {useRouter} from "next/router";
import {isWebView} from "../../utils/MobileBridge";


type ProviderMapKey = 'google' | 'emailSignUp' | 'emailSignIn' | 'anonymous';
export type ProviderMapObject = {bgColor:string, svg?: { src:string }, signinFn:any, convertToPermanent?:any}


export function SignIn({isConvert}:{isConvert?:boolean}){

    const router = useRouter();

    const ProviderMap = new Map<ProviderMapKey, ProviderMapObject>();
    ProviderMap.set('google', {
        bgColor:'bg-white',
        svg:google,
        signinFn:signInWithGoogle,
        // convertToPermanent: signAnonymousToGooglePermanent
    })
    ProviderMap.set('emailSignUp', {
        bgColor:'bg-white',
        svg:email,
        signinFn: ()=> router.push('/user/sign-up')
    })
    ProviderMap.set('emailSignIn', {
        bgColor:'bg-white',
        svg:signIn,
        signinFn: ()=> router.push('/user/sign-in')
    })
    ProviderMap.set('anonymous', {
        bgColor:'bg-white',
        svg:anonymous,
        signinFn:signInWithAnonymous
    })

    const isMobile = typeof window !== 'undefined' ? isWebView() : false;

    return (
        <div className={'flex-col w-2/3 mx-auto my-20 space-y-10'}>
            <LoginWithProvider providerMap={ProviderMap.get('emailSignUp')} providerKey={'이메일 만들고'}/>
            <LoginWithProvider providerMap={ProviderMap.get('emailSignIn')} providerKey={'가입한 이메일로'}/>
            {isMobile ? null : <LoginWithProvider providerMap={ProviderMap.get('google')} providerKey={'google'} isConvert={isConvert}/>}
            {isConvert ? null : <LoginWithProvider providerMap={ProviderMap.get('anonymous')} providerKey={'익명'}/>}

        </div>
    )
}
