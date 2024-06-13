import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@radix-ui/react-separator'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export interface TEAM {
    createdBy: String,
    teamName: String,
    _id: String

}

const SideNavTopSection = ({ user,setActiveTeamInfo }: any,) => {
    const menu = [
        {
            id: 1,
            name: 'Create Team',
            path: '/teams/create',
            icon: Users
        },
        {
            id: 2,
            name: 'Settings',
            path: '',
            icon: Settings,
        }
    ];
    const router = useRouter();
    const convex = useConvex();
    const [ teamList, setTeamList ] = useState<TEAM[]>();
    const [activeTeam, setActiveTeam] = useState<TEAM>();

    useEffect(() => {
        user && getTeamList()
    }
        , [user])


    useEffect(()=>{
        activeTeam && setActiveTeamInfo(activeTeam)
    },[activeTeam])
    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email })
        console.log("TeamList", result)
        setTeamList(result);
        setActiveTeam(result[0]);
    }

    const onMenuClick = (item:any) => {
        if(item.path){
            router.push(item.path);
        }
    }

    return (
        <div>
        <Popover>
            <PopoverTrigger>
                <div className='flex items-center gap-3 hover:bg-gray-300 p-3 rounded-lg cursor-pointer'>
                    <Image src='/logo-1.png' alt='logo' width={40} height={40} />
                    <h2 className='text-black flex gap-2 items-center font-bold text[17px]'>{activeTeam?.teamName}
                        <ChevronDown size={20} />
                    </h2>
                </div>
            </PopoverTrigger>
            <PopoverContent className='ml-7 p-4'>
                {/* Team Section */}
                <div>
                    {teamList?.map((team, index) => (
                        <h2 key={index}
                        className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer ${activeTeam?.teamName === team.teamName ? 'bg-blue-500 text-white' : 'text-black'}`}

                        onClick={()=>{setActiveTeam(team)}}

                        >{team.teamName}</h2>
                    ))}


                </div>
                <Separator orientation='horizontal' className='my-2' />
                {/* Menu */}
                <div>
                    {menu.map((item, index) => (
                        <h2 key={index} className='flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer'
                        onClick={()=>onMenuClick(item)}
                        >
                            <item.icon className='h-4 w-4'

                            />
                            {item.name}</h2>
                    ))}
                    <LoginLink>

                        <h2 className='flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer'>
                            <LogOut className='h-4 w-4' />
                            Logout</h2>
                    </LoginLink>

                </div>
                <Separator orientation='horizontal' className='my-2' />
                {/* USer Info */}
                {user && <div className='flex mt-2 items-center gap-2'>
                    <Image src={user?.picture} alt='logo' width={30} height={30} className='rounded-full' />
                    <div>
                        <h2 className='text-[14px] font-bold'>

                            {user?.given_name} {user?.family_name}
                        </h2>
                        <h2 className='text-[12px] text-gray-500'>

                            {user?.email}
                        </h2>
                    </div>
                </div>

                }

            </PopoverContent>
        </Popover>
        {/* All File Button  */}
        <Button variant='outline' className='w-full text-black  justify-start gap-2 font-bold mt-8 bg-gray-200 '>
            <LayoutGrid className='h-5 w-5'/>
            All Files</Button>
        </div>
    )
}

export default SideNavTopSection;
