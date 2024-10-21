<template>
    <div class="scan">
        <h1>Sample Scan</h1>
        Sample Length: <input></input>
        <br>
        Sample Width: <input></input>
        
        <br>
        #Points in Length: <input type="integer" v-bind:value="45"></input>
        <br>

        #Points in Width: <input type="integer" v-bind:value="4"></input>
        
        <br>
        Grid Preview
    </div>
</template>

<script setup lang="ts" name="Scan">
    // import ROSLIB from "roslib"
    // import { ref } from "vue"

    // const ros = new ROSLIB.Ros({});

    // ros.on('error', function(error: any) {
    //     console.log(error);
    // });

    // // Find out exactly when we made a connection.
    // ros.on('connection', function() {
    //     console.log('Connection made!');

    // });

    // ros.on('close', function() {
    //     console.log('Connection closed.');

    // });

    // // Create a connection to the rosbridge WebSocket server.
    // ros.connect('ws://localhost:9090');

//     const x_points = new ROSLIB.Param( {
//         ros: ros,
//         name: "/foo_node:x_points"
//     });

//     x_points.set('first', function(response){
//         console.log('set param to first')
//     })

//     const x_value = ref('not initialized')

//     x_value.value = 'fist v'
//     // x_points.get( function(value){
//     //     console.log(value)
//     // });
//     x_points.get(function(value) {
//     console.log('The value of use_sim_time after setting is ' + value);
//     x_value.value = value;
//   });

</script>

<style>
    .scan {
        background-color: #3cdfd7;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px;
    }

</style>