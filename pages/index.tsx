import Head from "next/head";
import {useRouter} from "next/router";


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

            <main className={`h-screen`}>
                <div className={`w-full h-full justify-center items-center flex`}>
                    <button className={'text-center mx-auto block border-blue p-3'} onClick={goToProfile}>시작하기</button>
                </div>
            </main>
        </div>
    );
}