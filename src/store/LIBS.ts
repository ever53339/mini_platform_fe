import { defineStore } from "pinia";
import { io } from "socket.io-client";

const socket = io('http://192.168.50.2:1234',  {transports: ['websocket']})

socket.on("connect", () => {
    console.log('socket io connected to LIBS')
});

socket.on("disconnect", () => {
    console.log('socket io disconnected from LIBS')
});

socket.connect()

export const useLIBSStore = defineStore('LIBS', {
    state() {
        return {
            LIBSSocket: socket
        }
    }
})