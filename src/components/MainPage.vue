<template>
    <div class="main">
        <h1>Basic Control</h1>
        primary: <Vue3StatusIndicator :type="status" :pause="true"/>
        
        <br>

        <button @click="runRobot">Start</button>
        
        <br>
        
        <button @click="stopRobot">Stop</button>
        
        <br>
        Current Status
        <br>
        <h1>Multiple Samples</h1>
        #Samples: <input></input>
        <br>
        #Locations on each sample: <input></input>
        
        <br>
        Preview
        <br>
        <h1>Sample Scan</h1>
        Gap in X-scale (mm): <input type="float" v-model="x_gap"></input>
        <br>
        Gap in Y-scale (mm): <input type="float" v-model="y_gap"></input>
        
        <br>
        #Points in X-sacle: <input type="integer" v-model="x_points"></input>
        <br>

        #Points in Y-scale: <input type="integer" v-model="y_points"></input>
        
        <br>
        Grid Preview
    </div>
</template>

<!-- <script lang="ts">
    export default{
        name: "MainPage"
    }
</script> -->

<script setup lang="ts" name="MainPage">
    import { ref } from "vue"
    import ROSLIB  from "roslib"
    import { Vue3StatusIndicator } from 'vue3-status-indicator'
    import 'vue3-status-indicator/dist/style.css'

    const ros = new ROSLIB.Ros( {

    })

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


    // create a service for launching files or running nodes
    const launcher = new ROSLIB.Service({
        ros : ros,
        name : '/launch',
        serviceType : 'customer_interfaces/LaunchRequest'
    });

    const status = ref('primary')
    const x_gap = ref('')
    const y_gap = ref('')
    const x_points = ref('')
    const y_points = ref('')
    
    function runRobot () {
        // console.log('new code')
        const request = {
            cmd: 'run', 
            package: 'bt',
            file_name: 'single_sample_mapping',
            args: '--ros-args -p x_gap:=' + parseFloat(x_gap.value) + '.0' + ' -p y_gap:=' + parseFloat(y_gap.value) + '.0' + ' -p x_points:=' + parseInt(x_points.value) + ' -p y_points:=' + parseInt(y_points.value)  
        }
        
        launcher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                status.value = 'success'
            } else {
                status.value = 'primary'
            }
        })
        

    }

    function stopRobot () {
        const request = {
            cmd: 'kill', 
            package: 'bt',
            file_name: 'single_sample_mapping'  
        }

        launcher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                status.value = 'success'
            } else {
                status.value = 'primary'
            }
        })
    }

</script>

<style>
    .main {
        background-color: #f8f9fc;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px;
    }

</style>