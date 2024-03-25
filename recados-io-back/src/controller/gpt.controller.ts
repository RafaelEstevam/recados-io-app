import {Request, Response} from 'express';

import GPT from '../config/gpt';

interface GptMessage {
    role: string,
    content: string
}

interface GptData {
    model: 'gpt-3.5-turbo' | string,
    messages: GptMessage[],
    max_tokens: number,
    temperature: number
}

export default {
    async post(req: Request, res: Response) {
        const {message} = req.body;

        const data:GptData = {
            model: 'gpt-3.5-turbo',
            messages: [
              {role: 'user', content: `Corriga somente a ortografia da seguinte sentença: ${message.replace(/(\r\n|\n|\r)/gm, " ")}. Sem alterar o sentido da frase.`}
            ],
            max_tokens: 56,
            temperature: 0.5
        }

        try{
            const gptResponse = await GPT.post('/chat/completions', data);
            return res.json(gptResponse.data).status(200);
        }catch(e){
            console.log(e);
            return res.status(400).send(e)
        };
    },
}