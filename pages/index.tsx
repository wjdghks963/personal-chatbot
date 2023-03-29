import Head from "next/head";
import {useRouter} from "next/router";
import Link from "next/link";
import {useEffect} from "react";
import {auth} from "../src/libs/firebase/auth";
import {onAuthStateChanged} from "firebase/auth";

export default function Home() {
    const router = useRouter();

    const goToProfile = () =>{
        return router.replace('/user/profile');
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user) return router.replace("/chat");
        })
    },[])


    return (
        <div>
            <Head>
                <title>Learn OpenAI</title>
            </Head>

            <main className={`h-screen text-center`}>
                <div className={`w-full h-full justify-center items-center flex-wrap`}>
                    <h1 className={`block font-bold text-3xl h-1/3 flex items-center justify-center`}>OA</h1>
                    <div className={`w-2/3 mx-auto font-bold`}>
                        <span className={'block mb-3'}>안녕하세요</span>
                        <span className={'block mb-2'}>OA는 chatGPT에서 알지 못해 설정하기 어려웠던 Penalty, Top_p 등과 같은 설정들을 보기 쉽게 표현해 설정해 사용하기 쉽게 하기 위해 만들었습니다.</span>
                        <span>AI에게 이름을 부여하거나 역할을 부여해 자신만의 AI를 만들 수도 있습니다.</span>
                        <Link href={'/information/setting-benefit'}>
                            <span className={`block underline text-blue-300 mt-5`}>설정을 하는 이유</span>
                        </Link>
                        <button className={'font-medium mx-auto block border-blue p-3 my-5'} onClick={goToProfile}>시작하기</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
