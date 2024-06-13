"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
import Canvas from '../_components/Canvas'

function Workspace({params}:any) {
    const convex=useConvex();
    useEffect(() => {
    console.log(params.fileId)
    params.fileId && getFileById()
    }
    , [])
    const [fileData,setFileData]=useState<FILE|any>()

    const getFileById=async()=>{
        const result=await convex.query(api.files.getFileById,{_id:params.fileId})
        setFileData(result)
    }

    const [triggerSave,setTriggerSave]=useState(false)
    return (
        <div>
            <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)}/>
            {/* Workspace Layout  */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* document */}
                <div className='h-screen'>
                        <Editor onSaveTrigger={triggerSave}
                        fileId={params.fileId}
                        fileData={fileData}
                        />
                </div>
                {/* canva  */}
                <div className='h-screen border-l'>
                    <Canvas
                    onSaveTrigger={triggerSave}
                    fileId={params.fileId}
                    fileData={fileData}

                    />
                </div>
            </div>
        </div>
    )
}

export default Workspace
