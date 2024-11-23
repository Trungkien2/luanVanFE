"use client"
import React from 'react'
import TopPost from './TopPost'
import { AxiosResponse } from 'axios'
import { IUser } from '@/interface/user.interface'
import FormCreate from './FormCreate'
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