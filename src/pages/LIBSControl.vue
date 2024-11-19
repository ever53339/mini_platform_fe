<template>
    <div class="config panel">
        <input type="text" @change="updateDesktopID"></input>
    </div>
    
</template>

<script setup lang="ts" name="MultipleSamples">
    import { useLIBSStore } from '@/store/LIBS';
    const LIBSStore = useLIBSStore()

    function updateDesktopID (event: Event) {
        const et = event.target as HTMLInputElement

        if (et.value) {
            console.log('new value', et.value)
            LIBSStore.LIBSSocket.emit('set_desktop_id', parseInt(et.value))
        }
    }


</script>

<style>
    .panel {
        width: 500px;
        height: 500px;
        background-color: rgb(0, 150, 255);
        border-radius: 15px;
        text-align: center;
    }
    

</style>