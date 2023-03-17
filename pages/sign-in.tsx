import google from "../src/assets/google.svg";
import email from "../src/assets/email.svg";
import {signInWithGoogle} from "../src/libs/firebase/auth";
import LoginWithProvider from "../src/components/LoginWithProvider";

type ProviderMapKey = 'google' | 'email';
export type ProviderMapObject = {bgColor:string, svg: { src:string }, signinFn:any}

const ProviderMap = new Map<ProviderMapKey, ProviderMapObject>();
ProviderMap.set('google', {
    bgColor:'bg-white',
    svg:google,
    signinFn:signInWithGoogle
})
ProviderMap.set('email', {
    bgColor:'bg-white',
    svg:email,
    signinFn:signInWithGoogle
})

export default function SignIn(){

    return (
        <div className={'flex-col w-2/3 mx-auto my-20 space-y-10'}>
            <LoginWithProvider providerMap={ProviderMap.get('google')} providerKey={'google'}/>
            <LoginWithProvider providerMap={ProviderMap.get('email')} providerKey={'email'}/>
        </div>
    )
}