import { openai, supabase } from "@/app/config";
import type { ChatCompletionCreateParams } from "openai/resources/chat/completions";

export async function main(query: string) {
  const queryEmbedding = await getEmbeddings(query);
  const match = await getMatchedData(queryEmbedding);
  const response = await AiAssistantResponse(match[0].content, query);

  /* console.log("This is Query Embedding:", queryEmbedding); */
  console.log("Matched Data:", match[0].content);
  console.log("This is chat response:", response);

  return response;
}

const prompt = `You are a friendly Japanese language counsellor. Your job is to guide student 
                how to learn Japanese effectively. Depending on the context and the question
                given by the student articulate answer that matches the answer of the question.
                Try not to overwhelm the students with long text. Try to answer the question with
                the provided context. Keep your answer based on the context. Do not make up answer
                that is not in the line of the context.
                While creating text make the text output bit fromatted with the markup language to separate
                and categorised text as heading, title, and paragraph. Use numbers, bullet ponits to make
                the text output well structured.                                
                Do's:
                Always try to help students in simple words.
                Always Motivate students to learn Japanese.
                Explain briefly if asked how learnig Japanese can open door to new job opprtunities.
                Explain briefly if asked how learning language is good for stydents brain and mental health.
                Don't Do's: 
                Remember that you are not a japanese teacher. 
                At no circumstances you will not going to teach studens Japanese language.
                You will not going to discuss anything other than Japanese language.`;

const messages: ChatCompletionCreateParams["messages"] = [
  { role: "system", content: prompt },
];

export async function AiAssistantResponse(
  context: string,
  question: string
): Promise<string> {
  messages.push({
    role: "user",
    content: `Context: ${context} Question:${question}`,
  });

  const resArray = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.3,
    max_completion_tokens: 200,
    frequency_penalty: 1,
  });
  const response = resArray.choices[0].message.content ?? "";
  messages.push({ role: "assistant", content: response });
  console.log('This is the message array:', messages);
  return response;
}

export async function getEmbeddings(input: string) {
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input,
    encoding_format: "float",
  });

  return embeddings.data[0].embedding;
}

export async function getMatchedData(embedding: number[]) {
  try {
    const { data } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.78,
      match_count: 2,
    });
    console.log("Matched data found");
    return data;
  } catch (error) {
    console.error("Error in getting matched data", error);
  }
}
