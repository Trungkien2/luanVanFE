'use client'
import { ImageDemo2CreatePost, ImageDemoCreatePost } from '@/app/assets'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const TopPost = () => {
  return (
    <div className='w-[30%] border-l-2 border-l-dark_4 pl-8 overflow-scroll scrollbar-none'>
        <div className='flex items-center w-full justify-center'>
        <Avatar className='w-[130px] h-[130px]'>H</Avatar>
        </div>
        <h1 className='text-center mt-5 text-[30px] font-bold'>Lewis Hamilton</h1>
        <p className='mt-2 text-center text-light_3'>@Lewishamilton</p>

        <h2 className='mt-[56px] text-[24px] font-bold'>Top posts by you</h2>
        <div className='flex flex-col gap-5 mt-3'>
            <Image src={ImageDemoCreatePost} alt='img'/>
            <Image src={ImageDemo2CreatePost} alt='img'/>
        </div>
    </div>
  )
}

export default TopPost