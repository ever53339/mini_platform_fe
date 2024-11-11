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
                    <td><input ref="xInput" type="text" v-model="pos.x" @change="xGoto"></input></td>
                    <td><button class="jog-plus" @click="xPlus()">+</button></td>
                    <td><button class="jog-minus" @click="xMinus()">-</button></td>
                    <td><select class="jog-select" v-model="jog.x">
                        <option value=".1">0.1 mm</option>
                        <option value="1">1 mm</option>
                        <option value="10">10 mm</option>
                        <option value="100">100 mm</option>
                    </select></td>
                </tr>
                <tr>
                    <td>Y</td>
                    <td><button class="reset-button" @click="setZeroY()">set zero Y</button></td>
                    <td><input ref="yInput" type="text" v-model="pos.y" @change="yGoto"></input></td>
                    <td><button class="jog-plus" @click="yPlus()">+</button></td>
                    <td><button class="jog-minus" @click="yMinus()">-</button></td>
                    <td><select class="jog-select" v-model="jog.y">
                        <option value=".1">0.1 mm</option>
                        <option value="1">1 mm</option>
                        <option value="10">10 mm</option>
                        <option value="100">100 mm</option>
                    </select></td>
                </tr>
                <tr>
                    <td>Z</td>
                    <td><button class="reset-button" @click="setZeroZ()">set zero Z</button></td>
                    <td><input ref="zInput" type="text" v-model="pos.z" @change="zGoto"></input></td>
                    <td><button class="jog-plus" @click="zPlus()">+</button></td>
                    <td><button class="jog-minus" @click="zMinus()">-</button></td>
                    <td><select class="jog-select" v-model="jog.z">
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
    import { reactive, ref, watch } from 'vue';
    import { useFocus } from '@vueuse/core';

    const goto = reactive({
        x: '',
        y: '',
        z: ''
    });
    const jog = reactive({
        x: '',
        y: '',
        z: ''
    });
  
    // todo: implement set zero

    const pos = reactive({
        x: '',
        y: '',
        z: ''
    })

    const xInput = ref(null)
    const yInput = ref(null)
    const zInput = ref(null)
    const { focused: xInputFocused } = useFocus(xInput)
    const { focused: yInputFocused } = useFocus(yInput)
    const { focused: zInputFocused } = useFocus(zInput)

    const rosStore = useRosStore();
    const request = {
        cmd: 'cli',
        package: 'ros2 action send_goal',
        file_name: '/move_gantry custom_interfaces/action/MoveGantry',
        args: '"{cmd: G00 X10}"'
    };

    rosStore.gantry_listener.subscribe(function(message : {work: string, x: Number, y: Number, z: Number}) {
        // console.log('Received message on ' + rosStore.gantry_listener.name + ': ' + message.z);
        // if (useFocus(xInput).focused.value) {
        if (!xInputFocused.value) {
            pos.x = message.x.toString()
        }
        if (!yInputFocused.value) {
            pos.y = message.y.toString()
        }
        if (!zInputFocused.value) {
            pos.z = message.z.toString()
        } 
    });

    function setZeroX() {
        
    }

    function setZeroY() {
        pos.x += 1;
        console.log('zero y')
    }

    function setZeroZ() {
        console.log('zero z')
    }
    // todo: set x, y, z goto value to previous value if new value is invalid
    // possiblely use focus event to store the old value
    function xGoto(event: Event) {
        const et = event.target as HTMLInputElement
        if (et.value) { 
            request.args = `"{cmd: G00 X${et.value}}"`
            console.log(request.args)
            rosStore.rosLauncher.callService(request, function(response) {
                console.log(response.message)
                if (response.is_launched){
                    
                } else {
                    
                }
            })
        }
    }
    
    function yGoto(event: Event) {
        const et = event.target as HTMLInputElement
        if (et.value) { 
            request.args = `"{cmd: G00 Y${et.value}}"`
            console.log(request.args)
            rosStore.rosLauncher.callService(request, function(response) {
                console.log(response.message)
                if (response.is_launched){
                    
                } else {
                    
                }
            })
        }
    }

    function zGoto(event: Event) {
        const et = event.target as HTMLInputElement
        if (et.value) { 
            request.args = `"{cmd: G00 Y${et.value}}"`
            console.log(request.args)
            rosStore.rosLauncher.callService(request, function(response) {
                console.log(response.message)
                if (response.is_launched){
                    
                } else {
                    
                }
            })
        }
    }
    function xPlus () {
        request.args = `"{cmd: G00 X${parseFloat(pos.x) + parseFloat(jog.x)}}"`
        console.log(request.args)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        })
    }

    function yPlus () {
        request.args = `"{cmd: G00 Y${parseFloat(pos.y) + parseFloat(jog.y)}}"`
        console.log(request.args)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        })
    }

    function zPlus () {
        request.args = `"{cmd: G00 Z${parseFloat(pos.z) + parseFloat(jog.z)}}"`
        console.log(request.args)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        })
    }

    function xMinus () {
        request.args = `"{cmd: G00 X${parseFloat(pos.x) - parseFloat(jog.x)}}"`
        console.log(request.args)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        })
    }

    function yMinus () {
        request.args = `"{cmd: G00 Y${parseFloat(pos.y) - parseFloat(jog.y)}}"`
        console.log(request.args)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        })
    }

    function zMinus () {
        request.args = `"{cmd: G00 Z${parseFloat(pos.z) - parseFloat(jog.z)}}"`
        console.log(request.args)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                
            } else {
                
            }
        })
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