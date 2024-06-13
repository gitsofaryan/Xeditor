import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const {user}:any=useKindeBrowserClient();
  return (
    <div className='flex justify-end w-full items-center gap-2'>
        <div className='flex gap-2 items-center  p-2'>
            <Search className='h-4 w-4' />
            <input type="text" placeholder="Search" className="text-black border-2 border-gray-800 rounded-lg p-1"/>
        </div>
        <div>
            <Image src={user?.picture}
            alt='user'
            height={30}
            width={30}
            className='rounded-full '/>
        </div>
        <Button className='gap-2 flex border-1 text-sm border-white
        h-8 hover:bg-blue-700 bg-blue-600
        '><Send className='h-4 w-4'/> Invite</Button>
    </div>
  )
}

export default Header
