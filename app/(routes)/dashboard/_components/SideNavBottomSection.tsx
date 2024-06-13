import { Button } from '@/components/ui/button'
import { Archive, FlagIcon, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'


const SideNavBottomSection = ({onFileCreate,totalFiles}:any) => {
  const menuList = [
    {
      id: 1,
      name: 'Getting Started',
      icon: FlagIcon,
      path: '',

    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: '',

    }, {
      id: 3,
      name: 'Archive',
      icon: Archive,
      path: '',

    },
  ]

  const [fileInput, setFileInput] = useState('')



  return (
    <div>
      {menuList.map((menu, index) => (
        <h2 key={index}className='text-black flex gap-2 p-1 text-[14px] hover:bg-gray-200 rounded-md cursor-pointer'>
          {menu.icon && <menu.icon size={20} className='inline-block' />
          }
          {menu.name}</h2>
      ))}

      {/* Add new File  */}
      <Dialog>
        <DialogTrigger className='w-full' asChild><Button className='w-full bg-blue-600  hover:bg-blue-700 mt-2 justify-start'>New File</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-black'>Create New File</DialogTitle>
            <DialogDescription>
              <Input placeholder='Write file name' className='mt-3 border-black'
              onChange={(e)=>setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className='bg-blue-600 hover:bg-blue-700' disabled={!(fileInput&&fileInput.length>0)}

            onClick={()=>{onFileCreate(fileInput)}}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>



      {/* Progreess baar */}
      <div className='h-4 w-full bg-gray-200 rounded-full mt-5 '>
        <div className={`h-full bg-red-500 rounded-full `}
        style={{width:`${(totalFiles/50)*100}%`}}
         ></div>
      </div>

      <h2 className='text-black text-[12px] mt-3' >
        <strong>
          {totalFiles}
        </strong> Out of <strong>50</strong>  files used</h2>
      <h2 className='text-black text-[10px] mt-1'>Upgrade Your plan for unlimited access</h2>
    </div>
  )
}

export default SideNavBottomSection
