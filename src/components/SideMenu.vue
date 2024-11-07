<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="gray"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#000"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span class="class1-menu">Operation Mode</span>
          </template>
            <el-menu-item index="1-1">
              <RouterLink class="class2-menu router-link"
              replace 
              :to="{
                name: 'mappingOp'
              }"
              active-class="">Mapping</RouterLink>
            </el-menu-item>
            <el-menu-item index="1-2">
              <RouterLink class="class2-menu router-link"
              replace 
              to='/multipleSamples'>Multiple Samples</RouterLink>
            </el-menu-item>               
        </el-sub-menu>
        <el-menu-item index="2">
          <!-- <el-icon><icon-menu /></el-icon> -->
          <RouterLink class="class1-menu router-link" 
          replace  to="/gantryControl">Gantry Control</RouterLink>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <!-- <el-icon><document /></el-icon> -->
          <span class="class1-menu">Analytical Device Control</span>
        </el-menu-item>
      </el-menu>
  </template>
  
<script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,  
  } from '@element-plus/icons-vue'
  import ROSLIB from 'roslib';
  import { toRefs } from 'vue';
  import { RouterLink } from 'vue-router'
  
  // const props = defineProps(['ros', 'b'])
  // // console.log('***', props)

  // let ros = props.ros
  // console.log('***', ros)
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

</script>

<style scoped>
  .el-menu-vertical-demo {
    border: 0;
    font-size: 20px !important;
  }
  
  el-menu {
    color : red;
    text-decoration: none;
  }

  el-menu-item {
    font-size: 80px;
    text-decoration: none;
  }
  .class1-menu {

    font-size: 20px;
    font-weight: bold;
  }

  .class2-menu {

    font-size: 18px;
    font-weight: bold;
  }

  .router-link {
    /* color: black; */
    text-decoration: none;
  }
  /* .router-link:active {
    color: "#ffd04b";
  } */
  /* unvisited link */
  /* a:link {
    color: black; 
  } */

  /* visited link */
  a:visited {
    color: rgb(0, 0, 0);
  }

  /* mouse over link */
  a:hover {
    color: red;
  }

  /* selected link */
  a:active {
    color: yellow;
  }
</style>