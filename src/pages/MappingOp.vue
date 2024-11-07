<template>
    <div class="config panel">
        <h2>Configuration</h2>
        <table>
            <tr>
                <th>Parameter</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Gap in X-scale (mm)</td>
                <td><input type="float" v-model="x_gap"></input></td>
            </tr>
            <tr>
                <td>Gap in Y-scale (mm)</td>
                <td><input type="float" v-model="y_gap"></input></td>
            </tr>
            <tr>
                <td>#Points in X-sacle</td>
                <td><input type="float" v-model="x_points"></input></td>
            </tr>
            <tr>
                <td>#Points in Y-sacle</td>
                <td><input type="float" v-model="y_points"></input></td>
            </tr>
        </table>
    </div>
    <div class="preview panel">
        <h2>Grid Preview</h2>
        <img src="../tiip.png" alt="grid preview">
    </div>
</template>
<script setup lang="ts" name="MappingOp">
    import { defineProps, ref } from 'vue'
    import ROSLIB, { Ros }  from "roslib"
    import { Vue3StatusIndicator } from 'vue3-status-indicator'
    import { useRoute } from 'vue-router';

    import { useRosStore } from '@/store/ros'

    const rosStore = useRosStore()
    console.log('***', rosStore.ros)
   

    // create a service for launching files or running nodes
    const launcher = new ROSLIB.Service({
        ros : rosStore.ros,
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

<style scoped>
    .panel {
        width: 500px;
        height: 500px;
        background-color: rgb(0, 150, 255);
        border-radius: 15px;
        text-align: center;
    }
    .preview {
        background-color: #fff;
    }

    .panel h2 {
        font-size: 30px;
    }

    .config table{
        margin-top: 10px;
        margin-left: 10px;
        width: 100%;
        text-align: left;
        vertical-align: middle;
        font-size: 20px;
    }

    .config td input {
        width: 100px;
        height: 30px;
    }


</style>