// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Configuration, OpenAIApi} from "openai";
import {GenerateRequestBody} from "../../type";




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const openai = new OpenAIApi(configuration);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {prompt, previousPrompt, settingDataJson, userEmail}:GenerateRequestBody = req.body

  if (settingDataJson === null || prompt === null) {
    return res.status(400).json({error:'body is empty'});
  }

  try {

    const completion = await openai.createChatCompletion({
      model: process.env.MODEL_ID || "gpt-3.5-turbo",
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
    });


    res.status(200).json({ result: completion.data });
  } catch(error:any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
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