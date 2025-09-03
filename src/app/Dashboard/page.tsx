'use client'


import { Heading } from '@chakra-ui/react'
import LessonCard from '@/components/LessonCard'
import React from 'react'
import { useLoading } from '../providers/LoadingProvider'

const page = () => {   

  return (
    <div className='w-full  !mt-12'>
        <Heading className='w-96 !ml-6 !mb-2'>Qucik Access</Heading>
        <div className='max-w-screen max-h-196 flex flex-col gap-6 scrollbar-slick overflow-y-scroll scroll-smooth'>

        <LessonCard
        imgSrc='/selfAssessment.png' 
        header='Take an Assessment Test'
        text='Assess your current Japanese Proficiency'
        btnText='Start'
        />

        
        <LessonCard
        imgSrc='/aichat.png' 
        header='Chat with the AI Agent'
        text='Ask AI agent for clear roadmap to learn Japanese.'
        btnText='Start'
        />

       <LessonCard
        imgSrc='/buildvocabulary.png' 
        header='Build Vocabulary'
        text='Build solid vocabulary with common words.'
        btnText='Start'
        />
       
       <LessonCard
        imgSrc='/japanesecharacter.png' 
        header='Learn Japanese Character'
        text='Learn Japanese character the fun way.'
        btnText='Start'
        />
       
                
        </div>
         
    </div>
  )
}

export default page
