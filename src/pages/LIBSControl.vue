<template>
    <div class="container">
        
        <div class="response">
            <div>Balance Response</div>
            <input class="custom-input" placeholder="Balance Response Will Show Here" type="text"v-model="balanceResponse" disabled="true"></input>
        </div>
        <div class="operation">
                       
            <div class="div1"><button class="original-button" @click="measure">Measure</button> </div>
            <div class="div2"><button class="original-button" @click="export_spectrum">Export</button> </div>
            <div class="div3"><button class="original-button" @click="analyze">Analyze</button> </div>
            <div class="div4"><button class="original-button" @click="find_buttons">Find Buttons</button> </div>
            <div class="div5"><button class="original-button" @click="checkDoors">TBD</button> </div>
            <div class="div6">
                <div class="div61"><button class="rec-button" @click="closeAll"></button></div>
                <div class="div62"><button class="rec-button" @click="openAll"></button></div>
                <div class="div63"><button class="rec-button" @click="openLeft"></button></div>
                <div class="div64"><button class="rec-button" @click="openRight"></button></div>
                <div class="div65"><button class="rec-button" @click="openTop"></button></div>
                <div class="div66"><button class="rec-button" @click="openLR"></button></div>
                <div class="div67"><button class="rec-button" @click="openLT"></button></div>
                <div class="div68"><button class="rec-button" @click="openRT"></button></div>
            </div>
       
        </div>
        <div class="communication">
            <div class="button"> 
                <button class="original-button" @click="switchConnection" >{{ isConnected ? "Connected" : "Connect" }}</button>
            </div>
            <div class="ip-port">
                <div class="ip-text">
                    IP&nbspAddress
                </div>
                <div class="ip-input">
                    <input type="text" class="custom-input"  placeholder="Input IP Address Here" v-model="ip" :disabled="isConnected"></input>
                </div>
                <div class="port-text">
                    Port
                </div>
                <div class="port-input">
                    <input type="text" class="custom-input" placeholder="Input Port Number Here" v-model="port" :disabled="isConnected"></input>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts" name="GantryControl">
    import { ref } from 'vue';
    import { io } from "socket.io-client";

    const port = ref('')
    const ip = ref('')
    const connectOp = ref('Connect')
    const balanceResponse = ref('')
    // balanceResponse.value = 'something'  

    const isConnected = ref(false)
    var socket: any

    function switchConnection() {
        

        if (isConnected.value) {
            socket.on('disconnect', () => {
                isConnected.value = false;
                console.log('socket io disconnected from balance')
            })
            socket.disconnect();
        } else {
            socket = io('http://' + ip.value + ':' + port.value, {transports: ['websocket'], autoConnect: false, reconnection: false})
            socket.on('connect', () => {
                console.log('socket io connected to balance')
                isConnected.value = true
            });
            socket.on('status', (data: any) => {
                balanceResponse.value = data
            });
            socket.connect();
        }
        
    }
    

    function measure() {
        socket.emit("measure", 'data', (val: string) => {
            balanceResponse.value = val
        });
    }

    function export_spectrum() {
        socket.emit("export", 'data', (val: string) => {
            balanceResponse.value = val
        });
    }

    function analyze() {
        socket.emit("analyze", 'data', (val: string) => {
            balanceResponse.value = val
            console.log(val)
        });
    }

    function find_buttons() {
        socket.emit("find_buttons", 'data', (val: string) => {
            balanceResponse.value = val
            console.log(val)
        });
    }

    function weigh() {
        socket.emit("weigh", 'y', (val: string) => {
            balanceResponse.value = val
        });
    }

    function checkDoors() {
        socket.emit("check_doors", 'y', (val: string) => {
            balanceResponse.value = val
        });
    }

    
    function draftDoors(draftedDoors: number) {
        socket.emit("draft_doors", draftedDoors, (val: string) => {
            balanceResponse.value = val
        });
    }

    function closeAll() {
        draftDoors(0)
    }

    function openAll() {
        draftDoors(5)
    }

    function openLeft() {
        draftDoors(2)
    }

    function openRight() {
        draftDoors(1)
    }

    function openTop() {
        draftDoors(3)
    }

    function openLR() {
        draftDoors(4)
    }

    function openLT() {
        draftDoors(7)
    }

    function openRT() {
        draftDoors(6)
    }
    
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        /* margin: 10% 10% 10% 10%; */
        /* background-color: #5A7EC7; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .response {
        width: 700px;
        height: 100px;
        margin-bottom: 30px;
        background-color: #f3ecb8;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: top;
        border-radius: 10px;
        padding: 2px 2px;
    }
    .response div {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        /* vertical-align: ; */
        /* align-items: center; */
        /* vertical-align: bottom; */
        /* position: absolute; */
        /* top: 50%; */
        /* left: 50%; */
        align-items: center;
        /* margin-top: 10px; */
        margin-bottom: 0;
    }
    .response input {
        height: 60px;
    }

    .communication {
        width: 700px;
        height: 200px;
        border-radius: 20px;
        background-color: #f3ecb8;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        place-items: center;
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }

    
    .communication .button { grid-area: 1 / 1 / 2 / 2; }
    .communication .ip-port { 
        grid-area: 1 / 2 / 2 / 4; 
        width: 100%;
        height: 100%;
        display: grid;
        /* background-color: black; */
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        place-items: center;
    }

    .ip-text {
        grid-area: 1 / 1 / 2 / 2;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .ip-input {
        grid-area: 1 / 2 / 2 / 4;
    }

    .port-text {
        grid-area: 2 / 1 / 3 / 2;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .port-input {
        grid-area: 2 / 2 / 3 / 4;
    }


    .communication span {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .operation {
        display: grid;
        width: 700px;
        height: 600px;
        border-radius: 20px;
        background-color: #f3ecb8;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        place-items: center;
    }

    .div1 { grid-area: 1 / 1 / 2 / 2;

    }
    .div2 { grid-area: 1 / 2 / 2 / 3;
    }
    .div3 { grid-area: 1 / 3 / 2 / 4; }
    .div4 { grid-area: 2 / 1 / 3 / 2; }
    .div5 { grid-area: 2 / 2 / 3 / 3; }
    .div6 { grid-area: 2 / 3 / 3 / 4;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 5px;
        grid-row-gap: 5px;
    }
    
    
    /* .div7 { grid-area: 2 / 3 / 3 / 4; } */

    .div61{
        grid-area: 1 / 1 / 2 / 2;
    }
    .div62{
        grid-area: 1 / 2 / 2 / 3;
    }
    .div63{
        grid-area: 2 / 1 / 3 / 2;
    }
    .div64{
        grid-area: 2 / 2 / 3 / 3;
    }
    .div65{
        grid-area: 3 / 1 / 4 / 2;
    }
    .div66{
        grid-area: 3 / 2 / 4 / 3;
    }
    .div67{
        grid-area: 4 / 1 / 5 / 2;
    }
    .div68{
        grid-area: 4 / 2 / 5 / 3;
    }

    .original-button {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        text-decoration: none;
        color: #303030;
        font-size: 24px;
        border-radius: 65px;
        width: 130px;
        height: 130px;
        font-weight: bold;
        transition: 0.3s;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        background-color: [object object];
        background-image: linear-gradient(180deg, rgba(245, 245, 245, 1), rgba(204, 204, 204, 1));
    }

    .original-button:hover {
        transform: translateY(2px);
        box-shadow: 0 0 rgba(0, 0, 0, 0);
    }

    .rec-button {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        text-decoration: none;
        color: #303030;
        font-size: 16px;
        border-radius: 10px;
        width: 65px;
        height: 40px;
        font-weight: bold;
        transition: 0.3s;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        background-color: [object object];
        background-image: linear-gradient(180deg, rgba(245, 245, 245, 1), rgba(204, 204, 204, 1));
    }

    .rec-button:hover {
        transform: translateY(2px);
        box-shadow: 0 0 rgba(0, 0, 0, 0);
    }

    .custom-input {
        font-size: 18px;
        font-weight: bold;
        padding: 5px 10px;
        width: 100%;
        outline: none;
        background: #FFFFFF;
        color: #000000;
        border: 0px solid gray;
        border-radius: 10px;
        /* box-shadow: 3px 3px 2px 0px #E2E2E2; */
        /* transition: .3s ease; */
    }

    .custom-input:focus {
        background: #F2F2F2;
        border: 1px solid gray;
        border-radius: 10px;
    }

    .custom-input:disabled {
        background: rgb(216, 216, 216);
    }

    .custom-input::placeholder {
        color: #4e4e4e;
    }

</style>