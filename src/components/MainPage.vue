<template>
    <div class="header-container">
        <TopHeader></TopHeader>
    </div>
    <div class="left-right-flex">
        <div class="navigation-container">
            <SideMenu></SideMenu>
        </div>
        <div class="up-down-flex">
            <!-- <span>{{ configStore.mappingConfig.x_gap }}</span>
            <span>{{ configStore.mappingConfig.y_gap }}</span>
            <span>{{ configStore.mappingConfig.x_points }}</span>
            <span>{{ configStore.mappingConfig.y_points }}</span>
            <span>{{ configStore.multipleSampleConfig.num_samples }}</span>
            <span>{{ configStore.multipleSampleConfig.sample_locations }}</span> -->
            <div class="content-container">
                <RouterView></RouterView>
            </div>
            <div class="foot-container">
                <span class='status-text'>
                    <el-switch class="switch"
                        style="--el-switch-on-color: #13ce66"
                        size="large"
                        v-model="generalSwitch" />&emsp;Robot status: Running
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MainPage">
    import { reactive, ref, watch } from "vue"
    import ROSLIB  from "roslib"
    import SideMenu from "./SideMenu.vue"
    import TopHeader from "./TopHeader.vue"
    import { RouterView, RouterLink, onBeforeRouteUpdate, useRouter} from "vue-router"
    import { useRosStore } from '@/store/ros'
    import { useConfigStore } from "@/store/config"
    // import Password from "primevue/password"

    const generalSwitch = ref(false)
    
    // deal with different routes to determine current operation mode
    const opMode = ref('')
    const router = useRouter()

    watch(
      () => router.currentRoute.value, 
      (newRoute, oldRoute) => {
        opMode.value = newRoute.path
      }
    );

    // prevent navigating to another page when general switch is on

    router.beforeEach ( (to, from) => {
        if (generalSwitch.value) {
            alert('Can not go to other pages when the robot is running')
            return false
        }
    })

    const status = ref('')

    const rosStore = useRosStore()
    const configStore = useConfigStore()

    const request = {
                    cmd: '', 
                    package: '',
                    file_name: '',
                    args: ''
                };

    function runRobot () {
        if (opMode.value == '/gantryControl') {
            console.log('in gantrycontrol model')
        } else {
            if (opMode.value == '/mappingOp') {
                request.cmd = 'run'
                request.package = 'bt'
                request.file_name = 'single_sample_mapping'
                request.args = '--ros-args -p x_gap:=' + parseFloat(configStore.mappingConfig.x_gap) + '.0' + ' -p y_gap:=' + parseFloat(configStore.mappingConfig.y_gap) + '.0' + ' -p x_points:=' + parseInt(configStore.mappingConfig.x_points) + ' -p y_points:=' + parseInt(configStore.mappingConfig.y_points)
            } else {
                request.cmd = 'run'
                request.package = 'bt'
                request.file_name = 'multipleSamples'
                request.args = '--ros-args -p'
            }
            
            console.log('start robot', request)
            rosStore.rosLauncher.callService(request, function(response) {
                console.log(response.message)
                if (response.is_launched){
                    status.value = 'success'
                } else {
                    status.value = 'primary'
                }
            })
        }
    }

    function stopRobot () {
        if (opMode.value == '/mappingOp') {
            request.cmd = 'kill'
            request.package = 'bt'
            request.file_name = 'single_sample_mapping'
            request.args = ''
        } else if (opMode.value == '/multipleSamples') {
            request.cmd = 'kill'
            request.package = 'bt'
            request.file_name = 'multipleSamples'
            request.args = ''
        }
        console.log('stop robot', request)
        rosStore.rosLauncher.callService(request, function(response) {
            console.log(response.message)
            if (response.is_launched){
                status.value = 'success'
            } else {
                status.value = 'primary'
            }
        })
    }

    watch( generalSwitch, (newValue) => {
        console.log('switch watcher', newValue)
        if (newValue) {
            runRobot()
        } else {
            stopRobot()
        }
    })


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
</style>