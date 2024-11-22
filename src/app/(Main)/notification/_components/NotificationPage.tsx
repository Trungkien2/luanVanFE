'use client'
import { Avatar } from '@mui/material'
import React from 'react'

const NotificationPage = () => {
  return (
    <div>
        <h1 className='text-[36px] font-bold'>Notifications</h1>
        {Array.from({length : 10},(_,index)=>index).map(item => <div className='flex p-[31px] gap-4' style={{borderBottom : '1px solid'}}>
            <Avatar/>
            <p>Edname liked your post “Nature Love”</p>
        </div>)}
    </div>
  )
}

export default NotificationPage