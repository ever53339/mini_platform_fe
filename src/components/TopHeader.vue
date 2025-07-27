<template>
    <div class='header'>
        <div class="header-container">
            <h1 class="header-text">
                <img src="/lml.png" alt="Living Minerals Lab logo">Robotic Mineral & Material Sample Characterization Platform
            </h1>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>

    .header {
        height: 150px;
        background-color: skyblue;
    }

    .header-container {
        width: 1400px;
        background-color: skyblue;
        margin: 0 auto;
        text-align: center;
        line-height: 150px;
        font-size: 0;
    }

    .header-text {
        /* width: 250px; */
        color: black;
        /* height: 150px; */
        font-size: 40px;
        vertical-align: middle;
        margin-top: 0;
        margin-bottom: 0;
        /* position: relative;
        top: 10px;
        left: 18px; */
    }

    .header-container img {
        width: 100px;
        height: 100px;
        vertical-align: middle;
        margin-right: 30px;
        /* float: left; */
    }

</style>