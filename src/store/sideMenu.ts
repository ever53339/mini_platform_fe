import { defineStore } from "pinia";
import ROSLIB from "roslib";

const ros = new ROSLIB.Ros( {

})

console.log('@@@', ros)
// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function(error: any) {
    console.log(error);
});

// Find out exactly when we made a connection.
ros.on('connection', function() {
    console.log('Connection made!');
});

ros.on('close', function() {
    console.log('Connection closed.');
});

// Create a connection to the rosbridge WebSocket server.
ros.connect('ws://localhost:9090');

export const useSideMenuStore = defineStore('sideMenu', {
    state() {
        return {
            ros: ros
        }
    } 
})