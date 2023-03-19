import Head from "next/head";
import {useRouter} from "next/router";
import Link from "next/link";


export default function Home() {
    const router = useRouter();

    const goToProfile = () =>{
        return router.replace('/profile');
    }

    return (
        <div>
            <Head>
                <title>Learn OpenAI</title>
            </Head>

            <main className={`h-screen text-center`}>
                <div className={`w-full h-full justify-center items-center flex-wrap`}>
                    <h1 className={`block font-bold text-3xl h-1/3 flex items-center justify-center`}>OA</h1>
                    <div className={`h-1/3 w-2/3 mx-auto font-bold`}>
                        <span className={'block mb-3'}>안녕하세요</span>
                        <span className={'overflow-auto'}>OA는 chatGPT에서 알지 못해 설정하기 어려웠던 Penalty, Top_p 등과 같은 설정들을 보기 쉽게 표현해 설정해 사용하기 쉽게 하기 위해 만들었습니다.
                        AI에게 이름을 부여하거나 역할을 부여할 수도 있습니다.</span>

                        <Link href={'/setting-benefit'}>
                            <span className={`block underline text-blue-300 mt-10`}>설정을 하는 이유</span>
                        </Link>
                    </div>
                    <button className={' mx-auto block border-blue p-3'} onClick={goToProfile}>시작하기</button>
                </div>
            </main>
        </div>
    );
}