import React from 'react'
import { Heading } from '@chakra-ui/react'
import { supabase } from '../config'
import MCQ from '@/components/MCQ'

const Page = async () => {
    
  const { data, error } = await supabase
    .from('japaneseleveltest')
    .select('mcq')
    .eq('level', 'N5')
    .not('mcq', 'is', null)
    .single()

  if (error) {
    console.error(error)
    return <div>Error loading data</div>
  }

  return (
    <div className=' max-h-[834px] !mt-10 flex flex-col items-center'>
      <Heading>Japanese Level Test</Heading>
      <Heading>(MCQ - 20)</Heading>
      <MCQ data={data?.mcq || []} />
    </div>
  )
}

export default Page
