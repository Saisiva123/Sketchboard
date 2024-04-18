import React from 'react'
import Image from "next/image";
import BoardThumbnailImg from "@/public/BoardThumnail.png";

type ThumbnailProps = {
    _id?: string
    name?: string
    state?: any
    isShared?: boolean
}

const BoardThumbnail: React.FC<any> = ({ boardDetails, openBoard }: { boardDetails: ThumbnailProps, openBoard: (boardId: string) => {} }) => {

    return (
        <div className='thumbnail' onClick={() => openBoard(boardDetails._id || '')}>
            <Image src={BoardThumbnailImg} alt="Whiteboard Thumbnail" className='h-[79%]' />
            <div className='h-[30%] text-white text-sm text-center description'> {!boardDetails.isShared ? "Shared Board" : "Personal Board"} </div>
        </div>
    )
}

export default BoardThumbnail