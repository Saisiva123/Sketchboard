import { LiveList, LiveMap, createClient } from "@liveblocks/client";
import { createLiveblocksContext, createRoomContext } from "@liveblocks/react";

const client = createClient({
    // throttle: 16,
    publicApiKey: "pk_dev_iW1_bU_shY5D_P20XwvmVH51qTekVqJ11_Rtxl97d4u-t3eJEXwj-PVMKjrtdaao",
    
});

type Presence = {
    cursor: { x: number; y: number } | null;
    message: string;
};

type DrawingState = string; 

type Storage = {
    shapes: LiveMap<any, any>;
    bindings: LiveMap<any, any>;
    version: string;
    doc: string
};

export const { RoomProvider,useEventListener, useBroadcastEvent, useStorage, useOthers, useMyPresence, useRedo, useUndo, useRoom, useUpdateMyPresence } = createRoomContext<
    Presence,
    Storage
>(client);