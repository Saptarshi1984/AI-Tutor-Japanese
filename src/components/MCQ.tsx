"use client";
import React from "react";
import { Heading, Text, Button, List } from "@chakra-ui/react";

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
  return (
    <form className="w-full max-h-full !mt-8 !p-2  flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth scrollbar-slick bg-gray-900">
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
                    value={i}
                    required
                    className="!mr-2"                   
                  />
                  {opt.text}
                </List.Item>
              ))}
            </List.Root>
          </li>
        ))}
      </List.Root>
      <Button variant={"solid"} colorPalette={'green'} className="mt-4">
        Submit
      </Button>
    </form>
  );
}

export default MCQ;