"use client"

import { Tldraw, Editor, TLEventMapHandler } from "tldraw";
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from "react";
import { useOthers, useMyPresence } from "../config/liveblock";
import Cursor from "./Cursor";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import useSnackbar from "@/utils/useSnackbar";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon
} from "@heroicons/react/24/outline";
import { API } from "@/utils/api.service";
import { isReadable } from "stream";


enum CursorMode {
    Hidden,
    Chat,
    ReactionSelector,
    Reaction,
}

type CursorState =
    | {
        mode: CursorMode.Hidden;
    }
    | {
        mode: CursorMode.Chat;
        message: string;
        previousMessage: string | null;
    }


const TldrawBoard: React.FC<any> = ({ id, state, shapesToAdd, setEditorInstance, readOnly, isShared, isReadOnly, setBoardSnapshot }: { id: string, state: any, shapesToAdd: any, setEditorInstance: any, readOnly: boolean, isShared: boolean, isReadOnly: boolean, setBoardSnapshot: any }) => {

    // Editor Details
    const [editor, setEditor] = useState<Editor>();
    const [realTimeBoardState, setRealTimeBoardState] = useState<any>(null);
    const [snapshot, setSnapshot] = useState<any>(state ? JSON.parse(state) : null);

    // Real time user presence
    const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden });
    const [{ cursor }, updateMyPresence] = useMyPresence();
    const others = useOthers();
    const ref = useRef(null);

    // socket details
    const SERVER_URL = "wss://sketchAI.saimannem.com";
    const username = Cookies.get('email') || ''
    const [socket, setSocket] = useState<any>();

    const router = useRouter();

    const addSnackbar = useSnackbar();

    // Set Editor State
    const setAppToState = useCallback((editor: Editor) => {
        isShared && editor.updateInstanceState({ isReadonly: isReadOnly })
        setEditor(editor)
        setEditorInstance(editor)
    }, [])

    // Set socket connection
    useEffect(() => {
        console.log("editor change invoked which has socket connection", editor, socket)
        function connectTOSocket() {
            const socket = io(SERVER_URL, {
                transports : ['websocket'],
                path: '/api/socket.io',
                query: {
                    roomId: id,
                    username: Cookies.get('email')
                },
                autoConnect: true,  // Prevent automatic connection upon instantiation
                reconnection: false,  // Enable automatic reconnection
                reconnectionAttempts: Infinity,  // Maximum number of reconnection attempts
                reconnectionDelayMax: 10000,
            });

            socket.on("disconnect", () => {
                console.log("------Socket disconnected----"); // false
                router.push('/home')
            });

            socket.on('connect', () => {
                console.log('------Socket Connected------');
                setSocket(socket);
            });

            socket.on('state', (state: any) => {
                console.log('Received a state:', state);
                setRealTimeBoardState(state);
            });

            socket.on('room_events', (data: any) => {
                addSnackbar({
                    key: "info",
                    text: data + ". Please refresh the page.",
                    variant: "info",
                    icon: InformationCircleIcon
                })
            });


            socket.on('joined', (username: any) => {
                console.log(username, " joined")
                addSnackbar({
                    key: "info",
                    text: `${username} has joined the room`,
                    variant: "info",
                    icon: InformationCircleIcon
                })
            })

            socket.on('left', (username: any) => {
                addSnackbar({
                    key: "info",
                    text: `${username} has left the room`,
                    variant: "info",
                    icon: InformationCircleIcon
                })
                console.log(`${username} left`)
            })

        }

        if (editor && !socket) {
            console.log("called")
            connectTOSocket()
        }

    }, [editor]);

    useEffect(() => {
        !isShared && API.post('/board/' + id, { isReadOnly: readOnly }).then((res: any) => {
           socket && socket?.connected && socket.emit("room_events", { roomId: id, message: `Read mode ${readOnly ? 'enabled' : 'disabled'}`})
        })
    }, [readOnly])

    // Disconnect Socket on page close
    useEffect(() => {
        return () => {
            if (socket && socket?.connected) {
                socket?.emit("disconnect_socket", { roomId: id, username })
                setSocket(null)
            }
        }
    }, [socket])

    // Real-time state updation
    useEffect(() => {
        editor && realTimeBoardState && setSnapshot(realTimeBoardState)
    }, [realTimeBoardState])

    // Real-time state emit using sockets
    useEffect(() => {
        if (socket && socket.connected && editor) {
            // editor.updateInstanceState({ canMoveCamera: false })
            editor.on('event', (event: any) => event.name && emitSocket(editor.store.getSnapshot()))
        }

    }, [editor, socket])

    const emitSocket = useCallback((data: any) => {
        socket && socket.connected && editor && socket.emit("board_changes", { roomId: id, state: data })
    }, [socket])

    // Create shapes that received from AI
    useEffect(() => {
        if (shapesToAdd && editor) {
            editor.createShapes([...shapesToAdd])
            emitSocket(editor.store.getSnapshot())
        }
    }, [shapesToAdd])

    // Real-time User chat
    useEffect(() => {
        function onKeyUp(e: KeyboardEvent) {
            if (e.key === "/") {
                setCursorState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
            } else if (e.key === "Escape") {
                updateMyPresence({ message: "" });
                setCursorState({ mode: CursorMode.Hidden });
            }
        }

        window.addEventListener("keyup", onKeyUp);

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "/") {
                e.preventDefault();
            }
        }

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [updateMyPresence]);


    const closeWhiteBoard = () => {
        API.post("/board/" + id, { state: JSON.stringify(editor?.store?.getSnapshot()) }).then((res: any) => {
            console.log(res.data.message);
            if (res.data.message == "Saved Successfully") {
                addSnackbar({
                    key: "success",
                    text: `Board Saved Successfully`,
                    variant: "success",
                    icon: InformationCircleIcon
                })
                socket?.connected && socket?.emit("disconnect_socket", { roomId: id, username })
                router.push('/home')
            }
            else {
                addSnackbar({
                    key: "error",
                    text: `Something went wrong`,
                    variant: "error",
                    icon: InformationCircleIcon
                })
            }
        })
    }


    return (
        <div ref={ref}
            style={{
                zIndex: 0,
                cursor:
                    cursorState.mode === CursorMode.Chat
                        ? "none"
                        : "url(cursor.svg) 0 0, auto",
            }}
            onPointerMove={(event) => {
                event.preventDefault();
                updateMyPresence({
                    cursor: {
                        x: Math.round(event.clientX),
                        y: Math.round(event.clientY),
                    },
                });
            }}
            onPointerLeave={() => {
                setCursorState({
                    mode: CursorMode.Hidden,
                });
                updateMyPresence({
                    cursor: null,
                });
            }}
            onPointerDown={(event) => {
                updateMyPresence({
                    cursor: {
                        x: Math.round(event.clientX),
                        y: Math.round(event.clientY),
                    },
                });
            }}
        >
            <Tldraw className="w-[100%] board"
                snapshot={snapshot}
                onMount={setAppToState}
            />

            {others.map(({ connectionId, presence }, index) => {
                if (presence == null || !presence.cursor) {
                    return null;
                }

                return (
                    <Cursor
                        key={connectionId}
                        color={COLORS[index]}
                        x={presence.cursor.x}
                        y={presence.cursor.y - 61}
                        message={presence.message}
                    />
                );
            })}


            {cursor && (
                <div
                    className="absolute top-0 left-0"
                    style={{
                        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
                    }}
                >
                    {cursorState.mode === CursorMode.Chat && (
                        <>

                            <div
                                className="absolute top-0 left-0 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white"
                                onKeyUp={(e) => e.stopPropagation()}
                                style={{
                                    borderRadius: 20,
                                }}
                            >
                                {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
                                <input
                                    className="w-60 border-none	bg-transparent text-white placeholder-blue-300 outline-none"
                                    autoFocus={true}
                                    onChange={(e) => {
                                        updateMyPresence({ message: e.target.value });
                                        setCursorState({
                                            mode: CursorMode.Chat,
                                            previousMessage: null,
                                            message: e.target.value,
                                        });
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setCursorState({
                                                mode: CursorMode.Chat,
                                                previousMessage: state.message,
                                                message: "",
                                            });
                                        } else if (e.key === "Escape") {
                                            setCursorState({
                                                mode: CursorMode.Hidden,
                                            });
                                        }
                                    }}
                                    placeholder={cursorState.previousMessage ? "" : "Say something…"}
                                    value={cursorState.message}
                                    maxLength={50}
                                />
                            </div>
                        </>
                    )}

                </div>
            )}
            {!isShared ? <div className="flex justify-between items-center gap-3 btns mt-3">
                <Button variant="outlined" className="w-[100%] text-black border-black hover:text-white" onClick={closeWhiteBoard} >Close</Button>
                <Button variant="contained" className="w-[100%] py-1 bg-black border-black text-white" onClick={closeWhiteBoard} >Save</Button>
            </div>: <></>}


        </div>
    )
}

export default TldrawBoard

const COLORS = [
    "#E57373",
    "#9575CD",
    "#4FC3F7",
    "#81C784",
    "#FF8A65",
    "#F06292",
    "#7986CB",
];