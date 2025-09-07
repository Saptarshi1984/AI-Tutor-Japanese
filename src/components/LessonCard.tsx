import  { useState } from 'react'
import { Heading, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'

interface LessonCardProps {
    header:string;
    text: string;
    imgSrc?: string;
    btnText: string;
    loading:boolean;
}

const LessonCard = ({header, text, btnText, loading}:LessonCardProps ) => {
  

  return (
    
    <div className='w-90 !m-auto'>
        
        <div className='!m-auto flex flex-row text-gray-300 items-center justify-between'>
        <div className='flex flex-col !mt-2'>
        <Heading className='!text-[16px]'>{header}</Heading>        
        <Text className='min-h-2 !text-[12px] text-cyan-600'>{text}</Text>
        </div>
        <Button loading={loading} size={'xs'} variant={'solid'} colorPalette={'cyan'}>{btnText}</Button>
         </div>    
    </div>
  ) 
}

export default LessonCard
