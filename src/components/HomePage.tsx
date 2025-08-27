'use client'

import React from 'react'
import { Heading, Button} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const HomePage = () => {

    const route =  useRouter()
  return (
    <div className='w-[90%] h-full flex flex-col items-center justify-evenly !m-auto gap-4'>
        <Heading size={'2xl'}>totemoJapan</Heading>
        <Heading size={'3xl'} textAlign={'center'}>Unlock the World of Japanese Through Interactive AI Lessons</Heading>
        <Image
        className='rounded-xl'
        src= '/linguaImage.png' 
        width={340} 
        height={340} 
        alt='heroImage' />
        <p className='w-[90%] hyphens-auto !text-[13px] !font-bold text-cyan-600'
         >
            Embark on a personalized journey with AI powered feedback and engaging excercises.
        </p>
        <Button
        onClick={() => (route.push('/SignIn'))}
         variant={'solid'} 
         colorPalette={'teal'}>
            Lets Get Started
        </Button>      
    </div>
  )
}

export default HomePage
