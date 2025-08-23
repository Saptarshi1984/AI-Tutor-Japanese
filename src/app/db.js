import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import{ openai, supabase }from './config.js'

//function for spillting text documents into chuncks
export async function documentChunks(filePath) {
  const doc = await fetch(filePath);
  const text = await doc.text();

  const textSplitter = new RecursiveCharacterTextSplitter({       
    chunkSize: 400,
    chunkOverlap: 50,
  });
  const textChunks = await textSplitter.createDocuments([text]);
  /* console.log(textChunks); */
  return textChunks;
}

//function to create corresponding embeddings of text chunks & storing them to supabase vector database
export async function createAndStoreEmbeddings(){
  const chunkData = await documentChunks('https://fgpspuulkvzysttbrugj.supabase.co/storage/v1/object/public/assistantDocs/guide.txt');
  const embeddingData = await Promise.all( 
    chunkData.map( async (chunk) => {
    const embeddings= await openai.embeddings.create({
      model:"text-embedding-ada-002",
      input: chunk.pageContent
    });
    return ({
      content: chunk.pageContent, 
      embedding: embeddings.data[0].embedding
    });   
  })
  )
  //Inserting vector database to the supabase
 await supabase.from("documents").insert(embeddingData);
 console.log(embeddingData);
 console.log('SUCCESS CREATING DATABASE');

}
createAndStoreEmbeddings();

