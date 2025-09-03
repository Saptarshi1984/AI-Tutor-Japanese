import React from 'react'


interface characterBoxProps {
    character: string;
    romaji: string;
    iPlay?: (url:string) => void;
}

const CharacterBox = ({character, romaji, iPlay}:characterBoxProps) => {
  return (
    <div className='w-[56px] h-[56px] !p-1 flex flex-col items-center 
         justify-evenly !border-2 !border-cyan-700 rounded-xl
         cursor-pointer hover:!border-cyan-600'
         >
        <span className='!text-xl text-cyan-400'>{character}</span>
        <span className='!text-sm text-gray-400'>{romaji}</span>      
    </div>
  )
}

export default CharacterBox
