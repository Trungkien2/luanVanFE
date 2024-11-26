"use client"
import { IUser } from '@/interface/user.interface'
import React from 'react'
import FormCreate from './FormCreate'
import TopPost from './TopPost'
interface Iprops {
    user:IUser
  }
const EditProfile:React.FC<Iprops> = ({user}) => {
  return (
    <div className="flex h-dvh">
    <FormCreate  user={user}/>
    <TopPost  user={user} />
  </div>
  )
}

export default EditProfile