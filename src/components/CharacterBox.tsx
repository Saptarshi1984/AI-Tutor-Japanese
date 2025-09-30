import React from 'react'


interface characterBoxProps {
    character: string;
    romaji: string;    
}

const CharacterBox = ({character, romaji}:characterBoxProps) => {
  return (
    <div className='w-[50px] h-[50px]  flex flex-col items-center 
         justify-evenly !border-3 !border-cyan-700 rounded-xl
         cursor-pointer hover:!border-cyan-600'
         >
        <span className='!text-lg text-cyan-400'>{character}</span>
        <span className='!text-xs text-gray-400'>{romaji}</span>      
    </div>
  )
}

export default CharacterBox
