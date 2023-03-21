import google from "../../assets/google.svg";
import email from "../../assets/email.svg"
import anonymous from "../../assets/anonymous.svg"
import { signInWithAnonymous, signInWithGoogle} from "../../libs/firebase/auth";
import LoginWithProvider from "../LoginWithProvider"


type ProviderMapKey = 'google' | 'email' | 'anonymous';
export type ProviderMapObject = {bgColor:string, svg?: { src:string }, signinFn:any, convertToPermanent?:any}

const ProviderMap = new Map<ProviderMapKey, ProviderMapObject>();
ProviderMap.set('google', {
    bgColor:'bg-white',
    svg:google,
    signinFn:signInWithGoogle,
    // convertToPermanent: signAnonymousToGooglePermanent
})
ProviderMap.set('email', {
    bgColor:'bg-white',
    svg:email,
    signinFn:signInWithGoogle
})
ProviderMap.set('anonymous', {
    bgColor:'bg-white',
    svg:anonymous,
    signinFn:signInWithAnonymous
})
export function SignIn({isConvert}:{isConvert?:boolean}){

    return (
        <div className={'flex-col w-2/3 mx-auto my-20 space-y-10'}>
            <LoginWithProvider providerMap={ProviderMap.get('google')} providerKey={'google'} isConvert={isConvert}/>
            {isConvert ? null : <LoginWithProvider providerMap={ProviderMap.get('anonymous')} providerKey={'익명'}/>}
            {/*<LoginWithProvider providerMap={ProviderMap.get('email')} providerKey={'email'}/>*/}
        </div>
    )
}
