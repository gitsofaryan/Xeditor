import { Archive, ChevronDown, FlagIcon, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { create } from 'domain'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FileListContext'



function SideNav() {
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();

  const { fileList_, setFileList_ } = useContext(FileListContext)

  useEffect(() => {
    activeTeam && getFiles()
  }
    , [activeTeam])
  const onFileCreate = (fileName: string, teamId: string) => {
    console.log(fileName)
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id.toString() ?? '',
      createdBy: user?.email ?? '',
      archive: false,
      document: '',
      whiteboard: ''
    }).then(res => {
      if (res) {
        getFiles()
        toast('File Created Successfully!')
      }
    }, (e) => {
      toast.error('Error while Creating File')

    })
  }

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id.toString()??'' })
    console.log("Files", result)
    setFileList_(result)
    setTotalFiles(result?.length)
  }


  const { user }: any = useKindeBrowserClient();
  return (
    <div className='bg-gray-100 p-6 h-screen fixed w-64 border-r border-[1px] flex flex-col'>
      <div className='flex-1'>

        <SideNavTopSection user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />

      </div>
    </div>
  )
}

export default SideNav

