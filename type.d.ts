import {RefObject} from "react";

type UserName = string;
type AIName = string;
type Concept = string;


interface InputBoxProps {
    propertyRef: RefObject<HTMLInputElement>
    identity?: "다양성" | "일관성" | "중복성" | string
}

interface SettingDataJson {
    userName:string,
    aiName:string,
    concepts:string,
    topP:number,
    frequencyPenalty:number,
    presencePenalty:number
}

export interface GenerateRequestBody {
    previousPrompt?:string,
    prompt:string,
    userEmail?:string | null,
    settingDataJson :SettingDataJson
}


type OpenAIApiResponseRole =  'assistant' | 'user'
type OpenAiApiResponseMessage = { message: {role:OpenAIApiResponseRole,content:string}, finish_reason: 'stop', index:number }

interface OpenAiApiResponse{

    id:string;
    object: string;
    created: number;
    model: string;
    usage: { prompt_tokens: number; completion_tokens: number; total_tokens:number },
    choices: OpenAiApiResponseMessage[]
}



export interface ChatObject {
    content:string;
    role:'user' | 'assistant';
}