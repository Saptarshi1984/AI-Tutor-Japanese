"use client";
import { Heading, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const InterfaceAI = () => {
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

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

/*       const binaryData = Uint8Array.from(atob(audioBase64), (char) =>
        char.charCodeAt(0)
      );
      const audioBlob = new Blob([binaryData], { type: "audio/mpeg" });

      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.play(); */

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
            Tutor
          </Heading>
          <div className="w-80 h-80 max-h-80 !p-2 !border-2 rounded-md !border-gray-600 overflow-y-scroll scroll-smooth">
            <ReactMarkdown>
              {message == "" ? "What you want to learn today?" : message}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          className="!w-xs  !border-1 !p-2 !border-cyan-300"
          placeholder="Eg. I want to learn Japanese greetings."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button fontSize='xl' loading={loading} variant="solid" colorPalette='teal' onClick={askAI}>
          Ask
        </Button>
      </div>
    </div>
  );
};

export default InterfaceAI;
