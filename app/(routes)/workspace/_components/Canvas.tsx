import React, { use, useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { updateWhiteboard } from '@/convex/files';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';


const Canvas = ({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) => {

  const [whiteBoardData,setWhiteBoardData]=useState<any>()
  const updateWhiteboard=useMutation(api.files.updateWhiteboard)

  useEffect(() => {
    onSaveTrigger && saveWhiteboard()
  }
  , [onSaveTrigger])

  const saveWhiteboard=()=>{
    updateWhiteboard({_id:fileId,
      whiteboard:JSON.stringify(whiteBoardData)}).then((result)=>{
        console.log(result)
      }
    )
  }

  return (
    <div style={{ height: "700px" }}>
        {fileData&&<Excalidraw
        initialData={{
          elements:fileData?.whiteboard&&JSON.parse(fileData.whiteboard)
        }}
        theme='light'
        onChange={(excalidrawElements, appState, files) =>
          setWhiteBoardData(excalidrawElements)}
        >

        <WelcomeScreen>
            <WelcomeScreen.Hints.HelpHint/>
            <WelcomeScreen.Hints.ToolbarHint/>

            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint/>
            <WelcomeScreen.Center>
                    <WelcomeScreen.Center.Heading>
                        Welcome to Excalidraw
                    </WelcomeScreen.Center.Heading>
                     <WelcomeScreen.Center.MenuItemHelp/>
                </WelcomeScreen.Center>
        </WelcomeScreen>
        </Excalidraw>
}
      </div>
  )
}

export default Canvas
