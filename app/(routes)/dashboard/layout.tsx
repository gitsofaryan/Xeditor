"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FileListContext';

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();

    const router = useRouter();

    useEffect(() => {
        user && checkTeam();
    }
        , [user])

    const [fileList_,setFileList_]=useState();
    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });

        if (!result.length) {
            router.push('teams/create');
        }
    }


    return (

        <div >
            <FileListContext.Provider value={{fileList_,setFileList_}}>
            <div className='grid grid-cols-4'>
                <div className='h-screen w-64 fixed'>
                    <SideNav />
                </div>
                <div className='col-span-4 ml-64'>
                    {children}
                </div>
            </div>

            </FileListContext.Provider>
        </div>
    )
}

export default DashboardLayout
