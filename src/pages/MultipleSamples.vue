<template>
    <div class="config panel">
        <h2>Configuration</h2>
        <table>
            <tr>
                <th>Parameter</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>#Samples</td>
                <td><input type="float" v-model="configStore.multipleSampleConfig.num_samples"></input></td>
            </tr>
            <tr>
                <td>Sample Locations</td>
                <td><input type="float" v-model="configStore.multipleSampleConfig.sample_locations"></input></td>
            </tr>
        </table>
    </div>
    <div class="preview panel">
        <h2>Sample Locations Preview</h2>
        <img src="../tiip.png" alt="sample locations preview">
    </div>
</template>

<script setup lang="ts" name="MultipleSamples">
    import { useConfigStore } from '@/store/config';
    const configStore = useConfigStore()
</script>

<style>
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