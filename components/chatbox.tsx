"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import logo from "@/public/logo.png";
import Image from 'next/image';
import Loading from '@/public/loading.gif';
import useSnackbar from '@/utils/useSnackbar';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Chatbox: React.FC<any> = (props: any) => {
    const chatRef = useRef<null | HTMLDivElement>(null);
    const chatInputRef = useRef<any>();
    const [chatSearchValue, setChatSearchValue] = useState('');
    const addSnackbar = useSnackbar();
    const [chatMessages, setChatMessage] = useState<any>([
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        chatRef.current && (chatRef.current.scrollTop = chatRef.current?.scrollHeight)
    }, [chatMessages])

    const trackUserInputs = (e: any) => {
        if (e.key == 'Enter' && e.target.value) {
            setChatMessage((prev: any) => ([...prev, {
                from: 'user',
                message: chatSearchValue
            }]))
            sendToAI(chatSearchValue)
            setChatSearchValue("")
        }
    }

    const sendToAI = async (message: string, code?: any) => {
        setLoading(true)
        const response = await fetch("/ai", {
            method: "POST",
            body: (!message && code) ? JSON.stringify({ message: "Task - 1: Analyze these drawings" + JSON.stringify(code) }) : JSON.stringify({ message: "Task - 2:" + message })
        })
        setLoading(false)
        const data = await response.json();
        const result = (!message && code) ? data.message : JSON.parse(data.message.trim());
        console.log('Completion response:', result);
        if (typeof (result) != "string" && result?.shapes) {
            result.shapes?.length ? setChatMessage((prev: any) => ([...prev, {
                from: 'bot',
                message: result?.message
            }])) :
                setChatMessage((prev: any) => ([...prev, {
                    from: 'bot',
                    message: "Sorry, something went wrong!"
                }]))
            props.setShape(result.shapes)
        }
        else {
            setChatMessage((prev: any) => ([...prev, {
                from: 'bot',
                type: 'suggestion',
                message: result
            }]))
        }

    }

    const getAiSuggestions = useCallback(() => {
        if (props.editor) {
            let editor = props.editor;
            let storeState = editor?.store?.getSnapshot().store;
            if (storeState) {
                let filteredOutKeys = Object.keys(storeState).slice(0, 2);
                let requiredKeys = Object.keys(storeState).filter((key: any) => !filteredOutKeys.includes(key))
                let newState = requiredKeys.map((key: any) => storeState[key])
                newState?.length ? sendToAI("", newState) : addSnackbar({
                    key: "warning",
                    text: "Please add some drawings!",
                    variant: "warning",
                    icon: CheckCircleIcon
                })
            }
        }

    }, [props.editor])

    return (
        <div className='chatbox h-[100%] pt-2'>
            <div className='mainChat relative' ref={chatRef}>
                {
                    !chatMessages?.length ?
                        <div className='botlandingPage absolute w-full'>
                            <div className="p-2 botTips w-[100%] mb-3">
                                <h3 className='mb-2'>Create some shapes</h3>
                                <p>Could you create a rectangle</p>
                            </div>
                            <div className="p-2 botTips w-[100%]">
                                <h3 className='mb-2'>Draw some flowchart</h3>
                                <p>Create a flowchart of 3 steps</p>
                            </div>
                        </div> :
                        <></>
                }
                {chatMessages.map((item: any, index: number) =>

                (<div key={index} className={`flex justify-start items-start gap-2 mb-3 ${item.type === 'suggestion' ? "aiSuggestion" : "aiResponse"} ${item.from === 'bot' ? 'float-left' : 'fromUser'}`}>
                    {item.type === 'suggestion' && <TipsAndUpdatesIcon sx={{ fontSize: 17, top: '2px', left: '0px', position: 'relative', color: '#eaab1a' }} />}
                    <p className='text-sm'>{item.message}</p>
                </div>)

                )}
                {loading && <Image src={Loading} alt="Loading" className='loading' />}
            </div>

            <div className='chatInput flex justify-between items-center gap-2'>
                <input type="text" placeholder="Ask me anything to create..." value={chatSearchValue} ref={chatInputRef} onChange={(e) => setChatSearchValue(e.target.value)} onKeyDown={trackUserInputs} />
                <div className='generateWithAI cursor-pointer' onClick={getAiSuggestions}></div>
            </div>
        </div>
    )
}

export default Chatbox