"use client";

import { Tabs, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { getHiragana, getKatakana } from "@/utils/util";
import type { characterType } from "@/utils/util";
import CharacterBox from "./CharacterBox";

const JapaneseCharacters = () => {
  const [value, setValue] = useState<string | null>("first");

  const hiraganas = getHiragana();
  const katakanas = getKatakana();

  return (
    <div className="flex items-center !mx-auto w-full !mt-14">
      <Tabs.Root
        className="w-full items-center"
        value={value}
        onValueChange={(e) => setValue(e.value)}
      >
        <Tabs.List className="w-98 flex flex-row justify-evenly !m-auto">
          <Tabs.Trigger value="first">Hiragana</Tabs.Trigger>
          <Tabs.Trigger value="second">Katakana</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content
          value="first"
          className="flex overflow-y-scroll scrollbar-slick max-h-[100vh] p-4"
        >
          <SimpleGrid columns={[5]} gap={"4"} m={"auto"} >
            {hiraganas.map((char: characterType) => (
              <CharacterBox key={char.character} character={char.character} romaji={char.romaji} />
            ))}
          </SimpleGrid>
        </Tabs.Content>
        <Tabs.Content
          value="second"
          className="flex overflow-y-scroll scrollbar-slick max-h-[100vh] p-4"
        >
          <SimpleGrid columns={[5]} gap={"4"} m={"auto"}>
            {katakanas.map((char: characterType) => (
              <CharacterBox key={char.character} character={char.character} romaji={char.romaji} />
            ))}
          </SimpleGrid>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default JapaneseCharacters;
