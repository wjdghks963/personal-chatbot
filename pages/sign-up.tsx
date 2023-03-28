import TextInputBox from "../src/components/TextInputBox";
import {useRef, useState} from "react";
import {createUser} from "../src/libs/firebase/auth";
import {useRouter} from "next/router";


export default function SignUpPage(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const isEmailValid = (email:string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const onSubmit = async () => {

        const emailValue = emailRef.current!.value;
        const passwordValue = passwordRef.current!.value;
        const passwordConfirmValue = passwordConfirmRef.current!.value;

        if(emailValue.length === 0 || passwordValue.length === 0 || passwordConfirmValue.length ===0){
            setError("한자리 이상 입력해주세요");
        }

        const isEmailOk = isEmailValid(emailValue);
        const isPasswordSame = passwordValue === passwordConfirmValue;

        if(isEmailOk && isPasswordSame) {
           const result = await createUser(emailValue, passwordValue);
            // @ts-ignore
            if(result?.error){
                setError('이미 존재하는 이메일입니다.');
            }else{
                return router.replace('/chat');
            }
        }else{
                setError('이메일이나 비밀번호를 다시 한번 확인해주세요');
        }

    }


    return <div className={"flex-col w-2/3 h-screen  flex justify-center mx-auto"}>
            <TextInputBox typeOf={'email'} propertyRef={emailRef} identity={"이메일"} placeholder={'사용할 이메일'} inputStyleAdd={'w-2/3'}/>
            <TextInputBox typeOf={'password'} propertyRef={passwordRef} identity={"비밀번호"} placeholder={'사용할 비밀번호'} inputStyleAdd={'w-2/3'}/>
            <TextInputBox typeOf={'password'} propertyRef={passwordConfirmRef} identity={"비밀번호 확인"} placeholder={'사용할 비밀번호'} inputStyleAdd={'w-2/3'}/>

            <button onClick={onSubmit} className={"mx-auto py-3 px-10 mt-10 block border-blue shadow-md"}>가입</button>
                <span className={'mx-auto mt-10 font-extrabold text-red-500'}>{error}</span>
    </div>
}
