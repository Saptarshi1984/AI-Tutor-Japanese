'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Link } from '@chakra-ui/react';
import { GoHome } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";


const BottomMenu = () => {

  const r = useRouter();
  const pathname = usePathname();
  return (
    <div className='absolute bottom-0 w-full min-h-20 flex flex-row !text-3xl !border-t-1 !border-t-gray-500 items-center justify-evenly bg-[#1a3232]'>
      <Link
      className={pathname === '/Dashboard' ? '!text-cyan-500': ''}
      onClick={() => (r.push('/Dashboard'))}><GoHome /></Link>      
      <Link
      className={pathname === '/Lessons' ? '!text-cyan-500': ''}
      onClick={() => (r.push('/Lessons'))}
      ><PiBooksLight /></Link>
      <Link
      className={pathname === '/Settings' ? '!text-cyan-500': ''}
      onClick={() => (r.push('/Settings'))}
      ><IoSettingsOutline /></Link>
      <Link
      className={pathname === '/Profile' ? '!text-cyan-500': ''}
      onClick={() => (r.push('/Profile'))}
      ><IoPersonOutline /></Link>
    </div>
  )
}

export default BottomMenu
