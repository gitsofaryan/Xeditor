"use client"
import React, { useRef, useEffect, useState } from 'react'
// @ts-ignore

import EditorJS from '@editorjs/editorjs';
// @ts-ignore

import { ToolConstructable } from '@editorjs/editorjs';
// @ts-ignore

import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore

import Checklist from '@editorjs/checklist'
// @ts-ignore

import ImageTool from '@editorjs/image';
// @ts-ignore

import Quote from '@editorjs/quote';
// @ts-ignore

import RawTool from '@editorjs/raw';
// @ts-ignore

import editorjsCodeflask from '@calumk/editorjs-codeflask';
// import LinkAutocomplete from '@editorjs/link-autocomplete'
// @ts-ignore

import Paragraph from '@editorjs/paragraph';
// @ts-ignore

import AIText from '@alkhipce/editorjs-aitext'
import { text } from 'stream/consumers';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';


const rawDocument={
    "time" : 1550476186479,
    "blocks" : [{
        data:{
            text:'Lets Innovate',
            level:2
        },
        id:"123",
        type:'header'
    },
    {
        data:{
            level:4
        },
        id:"1234",
        type:'header'
    }],
    "version" : "2.8.1"
}

function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {

const ref=useRef<EditorJS>();
const updateDocument=useMutation(api.files.updateDocument)
const [document,setDocument]=useState<any>(rawDocument)

    useEffect(() => {
        fileData&&initEditor()
    }
        , [fileData])

        useEffect(() => {
         onSaveTrigger&&onSaveDocument()
        }, [onSaveTrigger])
    const initEditor = () => {

        const editor = new EditorJS({
            tools: {

                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: ["Lets Innovate", "Document", "Share", "Collaborate", "Repeat"],
                        levels: [2, 3, 4],
                        defaultLevel: 3
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                //   image: {
                //     class: ImageTool,
                //     config: {
                //       endpoints: {
                //         byFile: 'http://localhost:3000/uploadFile', // Your backend file uploader endpoint
                //         byUrl: 'http://localhost:3000/fetchUrl', // Your endpoint that provides uploading by Url
                //       }
                //     }
                //   },
                code: editorjsCodeflask,
                quote: Quote,
                raw: RawTool,
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },

                aiText: {
                    // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
                    // type ToolConstructable imported from @editorjs/editorjs package
                    class: AIText as unknown as ToolConstructable,
                    config: {
                        // here you need to provide your own suggestion provider (e.g., request to your backend)
                        // this callback function must accept a string and return a Promise<string>
                        callback: (text: string) => {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve('AI: ' + text)
                                }, 1000)
                            })
                        },
                    }
                },

            },
            holder: 'editorjs',
            data: fileData?.document?JSON.parse(fileData.document):rawDocument,
        });
        ref.current=editor;

    }

const onSaveDocument=()=>{
if(ref.current){
    ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData)
        updateDocument({
            _id:fileId,
            document:JSON.stringify(outputData)
        }).then(res=>{

                toast('Document Updated')

        })
      }).catch((error) => {
        toast('Saving failed')
      });
    }

}

    return (
        <div >


            <div id='editorjs' className='text-black bg-white h-screen p-2' ></div>


        </div>
    )
}

export default Editor

