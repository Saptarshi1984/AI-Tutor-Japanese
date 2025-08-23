"use client";
import { Heading, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const InterfaceAI = () => {
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const AIdesc= `Hello! I'm your language counselor here to help you assess your goals. 
                 Based on your needs, I'll recommend the most effective approach to 
                 learning Japanese, and suggest courses if needed.
                 How can I assist you today?`

  const getResponse = async (input: string) => {
    
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });

      const { message } = await res.json();
      setMessage(message);
      setLoading(false);

    } catch (error) {
      console.log("An error occured in AI response!");
      console.log(error);
    }
  };

  const askAI = async () => {
    
    setMessage("Thinking...");
    setLoading(true);
    await getResponse(userInput);
    setUserInput("");
  };

  return (
    <div className="w-[400px] h-[900px] flex flex-col justify-evenly gap-8 items-center !m-auto">
      <Heading className="max-w-80 max-h-10 !text-4xl text-center">
        Learn Japanese
      </Heading>      

      <div className="w-[80px] flex flex-col justify-between items-center gap-4">
        <div className="w-80 min-h-100 flex flex-col items-center gap-6">
          <Heading className="max-w-80 max-h-10 !text-6xl text-center !font-bold">
            AI
          </Heading>
          <Heading size="sm" color="gray">
            Language Program Consultant
          </Heading>
          <div className="w-80 h-80 max-h-80 !p-2 hyphens-auto  !text-sm !font-serif text-gray-400  !border-2 rounded-md !border-gray-700 overflow-y-scroll scrollbar-slick">
            <ReactMarkdown>
              {message == "" ? AIdesc : message}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-4">
        <textarea          
          className="!w-xs  !border-1 !p-2 !text-gray-400  !border-cyan-300 !text-sm rounded-md"
          placeholder="Eg. I want to learn Japanese greetings."
          value={userInput}
          required
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button  fontSize='xl' loading={loading} variant="solid" colorPalette='teal' onClick={askAI}>
          START
        </Button>
      </form>
    </div>
  );
};

export default InterfaceAI;
