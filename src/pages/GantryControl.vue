<template>
    <div class="gantry-panel">
        <table class="gantry-table">
            <thead>
                <tr>
                    <th>Axis</th>
                    <th>Set Zero</th>
                    <th>Position (mm)</th>
                    <th colspan='3'>Jogging</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>X</td>
                    <td><button class="reset-button" @click="setZeroX()">set zero X</button></td>
                    <td><input type="text" v-model="xPos"></input></td>
                    <td><button class="jog-plus" @click="xPlus()">+</button></td>
                    <td><button class="jog-minus" @click="xMinus()">-</button></td>
                    <td><select class="jog-select" v-model="xJog">
                        <option value=".1">0.1 mm</option>
                        <option value="1">1 mm</option>
                        <option value="10">10 mm</option>
                        <option value="100">100 mm</option>
                    </select></td>
                </tr>
                <tr>
                    <td>Y</td>
                    <td><button class="reset-button" @click="setZeroY()">set zero Y</button></td>
                    <td><input type="text" v-model="yPos"></input></td>
                    <td><button class="jog-plus" @click="yPlus()">+</button></td>
                    <td><button class="jog-minus" @click="yMinus()">-</button></td>
                    <td><select class="jog-select" v-model="yJog">
                        <option value=".1">0.1 mm</option>
                        <option value="1">1 mm</option>
                        <option value="10">10 mm</option>
                        <option value="100">100 mm</option>
                    </select></td>
                </tr>
                <tr>
                    <td>Z</td>
                    <td><button class="reset-button" @click="setZeroZ()">set zero Z</button></td>
                    <td><input type="text" v-model="zPos"></input></td>
                    <td><button class="jog-plus" @click="zPlus()">+</button></td>
                    <td><button class="jog-minus" @click="zMinus()">-</button></td>
                    <td><select class="jog-select" v-model="zJog">
                        <option value=".1">0.1 mm</option>
                        <option value="1">1 mm</option>
                        <option value="10">10 mm</option>
                        <option value="100">100 mm</option>
                    </select></td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <button @click="myfunction()"></button> -->
</template>



<script setup lang="ts" name="GantryControl">
    import { useRosStore } from '@/store/ros';
    import ROSLIB from 'roslib';
    import { ref } from 'vue';

    const xPos = ref('');
    const yPos = ref('');
    const zPos = ref('');
    const yJog = ref('');
    const zJog = ref('');
    const xJog = ref('');

    const rosStore = useRosStore();

    


    function setZeroX() {
        // this is only a demo for sending goals to move gantry
        const request = {
            cmd: 'cli',
            package: 'ros2 action send_goal',
            file_name: '/move_gantry custom_interfaces/action/MoveGantry',
            args: '"{cmd: G00 X10}"'
        };
        
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        });
    }

    function setZeroY() {
        console.log('zero y')
    }

    function setZeroZ() {
        console.log('zero z')
    }
    
    function xPlus () {
        console.log('+ x')
    }

    function yPlus () {
        console.log('+ y')
    }

    function zPlus () {
        console.log('+ z')
    }

    function xMinus () {
        console.log('- x')
    }

    function yMinus () {
        console.log('- y')
    }

    function zMinus () {
        console.log('- z')
    }

    function myfunction() {

        console.log('xpos', xPos.value)
        console.log('ypos', yPos.value)
        console.log('zpos', zPos.value)
        console.log('xjog', xJog.value)
        console.log('xjog', yJog.value)
        console.log('xjog', zJog.value)
    }
</script>

<style scoped>
    .gantry-panel {
        width: 800px;
        height: 300px;
        background-color: rgb(0, 150, 255);
        border-radius: 15px;
    }
  
    .gantry-table {
        margin-top: 10px;
        margin-left: 10px;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
    }
    .gantry-table th {
        height: 40px;
    }
    .gantry-table td {
        height: 30px;
        font-size: 20px;
    }
    .gantry-table button {
        font-size: 20px;
        height: 35px;
    }
    .gantry-table input {
        height: 35px;
        box-sizing: border-box;
    }

    .jog-plus {
        width: 50px;
    }
    .jog-minus {
        width: 50px;
    }
    .jog-select {
        height: 35px;
        text-align: center;
        font-size: 20px;
    }
</style>