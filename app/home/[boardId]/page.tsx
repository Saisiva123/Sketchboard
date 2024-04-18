"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import HomeLayout from '../HomeLayout';
import TldrawBoard from '@/components/Tldraw';
import Chatbox from "@/components/chatbox";
import { RoomProvider } from '@/config/liveblock';
import { API } from '@/utils/api.service';
import { Switch } from '@mui/material';
import Cookies from 'js-cookie';

const Whiteboard: React.FC<any> = () => {
    const [boardDetails, setBoardDetails] = useState<any>();
    const searchParams = useSearchParams();
    const boardId = searchParams.get('id') || ''; // this should be a random string
    const [shape, setShape] = useState();
    const [boardSnapshot, setBoardSnapshot] = useState();
    const [editorInstance, setEditorInstance] = useState();
    const [readOnly, setReadOnly] = React.useState<any>();
    const username = Cookies.get('email') || '';

    useEffect(() => {

        if (boardId && !boardDetails && !boardDetails?.state) {
            API.get("/board/" + boardId).then((res: any) => {
                if (res.data.message) {
                    res.data.message.isShared = res.data.message.createdUser != username
                    setBoardDetails(res.data.message);
                    setReadOnly(res.data.message.isReadOnly)
                }
            }).catch(err => {
            })
        }
    }, [boardId, editorInstance]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReadOnly(event.target.checked);
    };

    return (
        <RoomProvider
            id={boardId}
            initialPresence={{
                cursor: null,
                message: "",
            }}>
            {boardDetails ? <HomeLayout>
                {(boardDetails && !boardDetails?.isShared) ? <div className='readOnly flex justify-between gap-1 items-center'>
                    <Switch
                        checked={readOnly}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <p>Read only mode <b>{readOnly ? 'Enabled' : 'Disabled'}</b> for connected Users.</p>
                </div> : <></>}
                {boardDetails?._id ? <div className='flex justify-between items-center board'
                >
                    <div className='w-[75%] h-[100%]'><TldrawBoard readOnly={readOnly}  setBoardSnapshot={setBoardSnapshot} shapesToAdd={shape} id={boardId} state={boardDetails.state} isShared={boardDetails.isShared} isReadOnly = {boardDetails.isReadOnly} setEditorInstance={setEditorInstance} /></div>
                    <div className='w-[24%] h-[100%]'><Chatbox editor={editorInstance} setShape={setShape} shapes={boardSnapshot} /></div>
                </div> : <></>}
            </HomeLayout> : <></>}
        </RoomProvider>

    )
}

export default Whiteboard