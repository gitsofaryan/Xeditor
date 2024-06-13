"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { mutation } from '@/convex/_generated/server'
import Header from './_components/Header'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'
import FileList from './_components/FileList'

function dashboard() {

  const { user }: any = useKindeBrowserClient()
  const convex = useConvex()


  const createUser = useMutation(api.user.createUser)

  useEffect(() => {
    if (user) {
      checkUser()

    }
  }, [user])


  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email })
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture

      }).then(res => {
        console.log(res)
      })
    }
  }
  return (
    <div className='p-4'>
      <Header />

      <FileList/>
    </div>
  )
}

export default dashboard
