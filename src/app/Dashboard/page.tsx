'use client'

import BottomMenu from '@/components/BottomMenu'
import { Heading } from '@chakra-ui/react'
import LessonCard from '@/components/LessonCard'
import React from 'react'


const page = () => {

  return (
    <div className='w-full !mt-12 '>
        <Heading className='w-98 !ml-6 !mb-6'>Qucik Access</Heading>
        <div className='max-w-screen flex flex-col gap-8'>

        <LessonCard
        imgSrc='/selfAssessment.png' 
        header='Take an Assessment Test'
        text='Assess your current Japanese Proficiency'
        btnText='Start'
        />

        
        <LessonCard
        imgSrc='/selfAssessment.png' 
        header='Chat with the AI Agent'
        text='Know how to learn Japanese form our AI agent'
        btnText='Start'
        />

       
                
        </div>
        <BottomMenu />  
    </div>
  )
}

export default page
