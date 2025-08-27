import React from "react";
import { Heading, Text, Link } from "@chakra-ui/react";
import { PiBooksLight } from "react-icons/pi";

const page = () => {

  return (
    
    <div className="flex flex-col items-center gap-8 !mt-10">
      <Heading>Lessons</Heading>
      <div className="w-98 flex flex-col gap-6 !m-auto">
        <Heading>Beginner's Basics</Heading>
        
        <div className="flex flex-row gap-4 !p-2 items-center cursor-pointer rounded-xl hover:bg-[#1a3232]">
          <div className="!text-3xl !p-2 text-gray-400 bg-gray-700 rounded-xl">
            <PiBooksLight />
          </div>
          <div>
            <Heading className="text-gray-300">Greetings</Heading>
            <Text className="text-cyan-600">Learn basic greetings.</Text>
          </div>
        </div>
         
        <div className="flex flex-row gap-4 items-center !p-2 cursor-pointer rounded-xl hover:bg-[#1a3232]">
          <div className="!text-3xl !p-2 text-gray-400 bg-gray-700 rounded-xl">
            <PiBooksLight />
          </div>
          <div>
            <Heading className="text-gray-300">Introduction</Heading>
            <Text className="text-cyan-600">
              Learn basic intrductory phrases.
            </Text>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center !p-2 cursor-pointer rounded-xl hover:bg-[#1a3232]">
          <div className="!text-3xl !p-2 text-gray-400 bg-gray-700 rounded-xl">
            <PiBooksLight />
          </div>
          <div>
            <Heading className="text-gray-300">Japanese Character</Heading>
            <Text className="text-cyan-600">
              Learn Hiragana, Katakana and Kanji.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
