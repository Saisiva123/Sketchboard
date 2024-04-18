"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BoardThumbnail from "@/components/boardThumbnails";
import NewBoardThumbnail from "@/public/newBoardThumbnail.png";
import HomeLayout from "./HomeLayout";
import { API } from "@/utils/api.service";
import Cookies from "js-cookie";
// import { disconnectSocket } from "@/utils/socket";

// Backend Response
type BoardData = {
    _id: string
    name?: string
    state?: any
    isShared?: boolean
}

const Home: React.FC<any> = () => {

    const router = useRouter();
    const [boardData, setBoardData] = useState<Array<BoardData>>([])

    useEffect(() => {
        const email = Cookies.get('email');
        (!boardData?.length && API.get('/board').then((res: any) => {
            let result = res.data.message;
            result = result.map((item: any) => ({...item, isShared: item.createdUser == email}));
            setBoardData(result)
        }).catch(err => {

        }))
    }, [])


    const openNewBoard = () => {
        API.post("/board").then((res: any) => {
            if (res.data.message) {
                const boardId = res.data.message._id
                router.push('/home/board?id=' + boardId)
                console.log(res.data)
            }

        }).catch(err => {

        })
    }

    const openExistedBoard = (boardId: string) => {
        router.push('/home/board?id=' + boardId)
    }

    return (
        <HomeLayout>
            <div className="body px-3">
                <div className="flex justify-start gap-5 items-center my-3">
                    <Image src={NewBoardThumbnail} alt="Picture of the author" className="thumbnail" onClick={openNewBoard} />
                    {boardData.map((item: BoardData, index: number) => {
                        return <BoardThumbnail key={index} boardDetails = {item} openBoard = {openExistedBoard}  />
                    })}
                </div>
            </div>
        </HomeLayout>
    );
};

export default Home;
