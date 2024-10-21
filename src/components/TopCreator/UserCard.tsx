import { Avatar, Button } from '@mui/material'
import React from 'react'

const UserCard = () => {
  return (
    <div className='flex flex-col items-center gap-2  rounded-lg border-[#1F1F22]'>
        <Avatar>K</Avatar>
        <p className='text-[14px]'>Savannah Nguyen</p>
        <p className='text-[10px] text-light_3'>Followed by jsmastery</p>
        <Button variant="contained" className='bg-primary w-[74px] text-[12px]'>Follow</Button>
    </div>
  )
}

export default UserCard