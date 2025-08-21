import OpenAI from "openai";
import AiAssistantResponse from '@/app/helper'


export async function POST(req:any) {
    try {

        const {input} = await req.json();

         const message = await AiAssistantResponse(input);         
         return Response.json({ message });

    } catch(error) {

        console.error('Error Getting AI Response', error);
        return new Response("Internal Server Error", { status: 500 });

    }
}

/* const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req:any){
    const prompt:string = 'You are a helpful Japanese teacher.';

    try {

        const {input} = await req.json();

        const completion = await openai.chat.completions.create({
              model: 'gpt-4.1',
              messages: [
                { role: 'system', content: prompt, },
                { role:'user', content:input },
              ],
        });

        const message = completion.choices[0].message.content;

        const speechResponse = await fetch("https://api.openai.com/v1/audio/speech", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "content-Type": "application/json",
            },

            body:JSON.stringify({
                model: 'tts-1',
                input: message,
                voice:'nova',
            }),
        });

        const audioBuffer = await speechResponse.arrayBuffer();
        const audioBase64 = Buffer.from(audioBuffer).toString("base64");

        return new Response(
            JSON.stringify({message, audioBase64}),
            {
                status: 200,
                headers: {"content-type": "application/json"},
            }
        );
    } catch(error:any) {

        console.log("An error occurred!");
        console.log(error);

        return new Response(
            JSON.stringify({
                error: 'API failed',
                details: error.message,
            }),
            {
                status: 500,
                headers:{
                    "content-Type": "application/json",
                },
            }
        );
    }
} */