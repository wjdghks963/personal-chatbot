import type {  NextApiResponse } from 'next'
import {GenerateRequestBody} from "../../type";
import {NextRequest} from "next/server";


export const config = {
  runtime: 'edge'
}



export default async function handler(
  req: NextRequest,
  res: NextApiResponse
) {
  const {prompt, previousPrompt, settingDataJson, userEmail}:GenerateRequestBody = await req.json();

  if (settingDataJson === null || prompt === null) {
    return res.status(400).json({error:'body is empty'});
  }

  try {
    // @ts-ignore
      const completion = await fetch(process.env.API_URL,{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(process.env.OPENAI_API_KEY),
          },
          body:JSON.stringify({
            model:  "gpt-3.5-turbo",
            messages:[
              {"role": "system", "content": `You are a helpful assistant. assistant name is ${settingDataJson.aiName}`},
              {"role": "system", "content": `you are role is ${settingDataJson.concepts}. user name is ${settingDataJson.userName}`},
              {"role":'assistant', content:`${previousPrompt ?? ""}`},
              {"role": "user", "content":prompt}],
            temperature:0.9,
            max_tokens:500,
            top_p : +settingDataJson.topP,
            frequency_penalty : +settingDataJson.frequencyPenalty,
            presence_penalty : +settingDataJson.presencePenalty,
            user: userEmail ?? ""
          }),
        }
    )

    const data = await completion.json();

    return new Response(JSON.stringify({ result: data }))
  } catch(error:any) {
    if (error) {
      console.error(error.response.status, error.response.data);
        return new Response(JSON.stringify({status:error.response.status, data:error.response.data}))
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
       res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}