import { FileListContext } from '@/app/_context/FileListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Archive, MoreHorizontal } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'



export interface FILE {
  archive: boolean,
  createdBy: string,
  document: string,
  fileName: string,
  teamId: string,
  whiteboard: string,
  _id: string,
  _creationTime: number

}
const FileList = () => {
  const { user }: any = useKindeBrowserClient();

  const { fileList_, setFileList_ } = useContext(FileListContext)

  const [fileList, setFileList] = useState<any>()
  const router = useRouter();
  useEffect(() => {
    fileList_ && setFileList(fileList_)
    console.log(fileList)
  }, [fileList_]);
  return (
    <div className='mt-10'>

      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
        >
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Created At
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {fileList && fileList.map((file: FILE, index: number) => (

              <tr className="odd:bg-gray-50 dark:odd:bg-gray-800/50 cursor-pointer"
              onClick={()=>{
                router.push(`/workspace/${file._id}`)

              }}
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"><Image src={user?.picture}
                  alt='user'
                  height={30}
                  width={30}
                  className='rounded-full'
                /> {user?.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">




                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='gap-3 '><Archive
                        className='h-4 w-4'
                      /> Archive</DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>


                </td>
              </tr>
            ))}



          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileList
