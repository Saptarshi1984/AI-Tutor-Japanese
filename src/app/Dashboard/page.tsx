'use client'


import { Heading } from '@chakra-ui/react'
import LessonCard from '@/components/LessonCard'
import {useState} from 'react'
import { useLoading } from '../providers/LoadingProvider'

const page = () => {  
  const [loading, setloading] = useState(false); 

  return (
    <div className='w-full  !mt-12'>
        <Heading className='w-96 !ml-6 !mb-2'>Qucik Access</Heading>
        <div className='flex flex-col gap-6'>

        <LessonCard
         
        header='Take an Assessment Test'
        text='Assess your current Japanese Proficiency'
        btnText='Start'
        loading={loading}
        />

        
        <LessonCard
        
        header='Chat with the AI Agent'
        text='Ask AI agent for clear roadmap to learn Japanese.'
        btnText='Start'
        loading={loading}
        />

       <LessonCard
        
        header='Build Vocabulary'
        text='Build solid vocabulary with common words.'
        btnText='Start'
        loading={loading}
        />
       
       <LessonCard
        
        header='Learn Japanese Character'
        text='Learn Japanese character the fun way.'
        btnText='Start'
        loading={loading}
        />       
                
        </div>
         
    </div>
  )
}

export default page
