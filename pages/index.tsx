import { useState } from "react";
import Head from "next/head";
import SettingForm from "../src/components/SettingForm";
import {GenerateRequestBody, OpenAiApiResponse, SettingDataJson} from "../type";
import useFetchPost from "../src/utils/fetchPost";


export default function Home() {
    const [formToggle, setFormToggle] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");
    const [result, setResult] = useState<any>("");




    return (
        <div>
            <Head>
                <title>Learn OpenAI</title>
            </Head>

            <main className={`flex justify-center h-[100vh]`}>
                {formToggle ? <SettingForm setFormToggle={setFormToggle}/> : null}
                <div className={`w-full h-full ${formToggle ? 'popupOpen' : null}`}>
                    <span onClick={()=>setFormToggle(prev=>!prev)}>시작하기</span>
                </div>
            </main>
        </div>
    );
}