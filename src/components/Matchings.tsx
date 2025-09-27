'use client'
import React from 'react'

interface matchingsProps {
    eng:string[];
    jap:string[];
}

const Matchings = ({eng, jap}:matchingsProps) => {
  return (
    <div className='min-w-[640px] flex flex-row justify-end'>
      <div>{eng}</div>
      <div>{jap}</div>      
    </div>
  )
}

export default Matchings
