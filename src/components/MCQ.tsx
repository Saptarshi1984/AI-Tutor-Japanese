"use client";
import React from "react";
import { Heading, Text, Button, List } from "@chakra-ui/react";
import { useState } from "react";

interface Option {
  text: string;
  is_correct: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface McqProps {
  data: Question[];
}

function MCQ({ data }: McqProps) {
  
  const [responses, setResponse] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

  function handleSelect(qIndex:number, value:string) {

    setResponse(prev => ({
      ...prev,
      [qIndex]: value

    }));
  }

  

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    let total = 0;

    data.forEach((q, qIndex) => {
      
      const correct = q.options.find(o => o.is_correct)?.text;
      if(responses[qIndex] === correct) total++;
    })

    setScore(total);

  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-h-full !mt-8 !p-2  flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth scrollbar-slick bg-gray-900">
      <List.Root as={"ol"} className="w-full flex flex-col gap-4 !ml-12">
        {data.map((q, qIndex) => (
          <li key={qIndex} className="!mb-4">
            <Heading size="sm" mb={2} className=" max-h-[2.8rem]">
              {q.question}
            </Heading>
            <List.Root as={'ol'}  className="!ml-4">
              {q.options.map((opt, i) => (
                <List.Item key={i} className="flex flex-row items-center mb-1">
                  <input 
                    type="radio" 
                    name={`q-${qIndex}`} 
                    value={opt.text}
                    required
                    className="!mr-2"
                    onChange={(e) => handleSelect(qIndex, e.target.value)}                   
                  />
                  {opt.text}
                </List.Item>
              ))}
            </List.Root>
          </li>
        ))}
      </List.Root>
      <Button type="submit" variant={"solid"} colorPalette={'green'} className="mt-4">
        Submit
      </Button>

      {score !== null && (
        <Text mt={4} fontSize="lg" color="white">
          Your Score: {score} / {data.length}
        </Text>
      )}
    </form>
  );
}

export default MCQ;