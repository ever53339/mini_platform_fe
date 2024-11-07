<template>
    <div class="header-container">
        <TopHeader></TopHeader>
    </div>
    <div class="left-right-flex">
        <div class="navigation-container">
            <SideMenu></SideMenu>
        </div>
        <div class="up-down-flex">
            <div class="content-container">
                <RouterView></RouterView>
            </div>
            <div class="foot-container">
                <span class='status-text'>
                    <el-switch class="switch"
                        style="--el-switch-on-color: #13ce66"
                        size="large"
                        v-model="value1" />&emsp;Robot status: Running
                </span>
                
                <!-- <div class="switch-box"> -->
                    <!-- <label class="switch">
                        <input type="checkbox">
                        <span class="slider round">slider</span>
                    </label> -->
                <!-- </div> -->
                <!-- <input type="checkbox"> -->
                

                <!-- primary: <Vue3StatusIndicator :type="status" :pause="true"/>
    
                <el-button type="success" @click="runRobot">Start</el-button>        
                <el-button type="danger" @click="stopRobot">Stop</el-button> -->
            </div>
        </div>
    </div>
    
    
    <!-- <div class="main-page">
        <el-container>
            <el-header style="font-size: 36px">
                <TopHeader/>
            </el-header>
            <el-container>
                <el-aside>
                    <SideMenu></SideMenu>
                </el-aside>
                <el-container>
                    <el-main>
                        <RouterView>
                        </RouterView>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div> -->
</template>

<script setup lang="ts" name="MainPage">
    import { ref } from "vue"
    import ROSLIB  from "roslib"
    import 'vue3-status-indicator/dist/style.css'
    import SideMenu from "./SideMenu.vue"
    import { Setting } from "@element-plus/icons-vue"
    import TopHeader from "./TopHeader.vue"
    import { RouterView, RouterLink } from "vue-router"
    import { Vue3StatusIndicator } from 'vue3-status-indicator'

    const value1 = ref(false)
</script>

<style scoped>
    .header-container {
        height: 150px;
        background-color: skyblue;
    }
    .left-right-flex {
        display: flex;
    }
    .navigation-container {
        width: 260px;
        background-color: gray;
    }
    .up-down-flex {
        /* width: 100%; */
        flex-direction: column;
        display: flex;
    }
    .content-container {
        width: calc(100vw - 260px);
        height: calc(100vh - 100px - 150px);
        background-color: rgb(125, 85, 85);

        padding: 40px 40px;
        box-sizing: border-box;

        display: flex;
        justify-content: space-around;
    }
    .foot-container {
        height: 100px;
        background-color: skyblue;
        text-align: right;
        line-height: 100px;
        font-size: 0;
        display: flex;
        flex-direction: row-reverse;
    }

    .status-text {
        font-size: 20px;
        vertical-align: middle;
        margin-right: 2em
    }

    .switch {
        vertical-align: middle;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        vertical-align: middle;
    }

    /* The slider */
    .slider {
        /* position: absolute; */
        cursor: pointer;
        /* top: 0;
        left: 0;
        right: 0;
        bottom: 0; */
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        vertical-align: middle;
        font-size: 20px;
    }

    .slider:before {
        position: absolute;
        /* position: static; */
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        vertical-align: middle;
    }

    input:checked + .slider {
        background-color: rgb(0, 200, 0);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px rgb(0,200,0);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .switch-box {
        vertical-align: center;
        
    }

</style>