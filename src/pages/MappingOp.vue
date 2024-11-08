<template>
    <div class="config panel">
        <h2>Configuration</h2>
        <table>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gap in X-scale (mm)</td>
                    <td><input type="float" v-model="configStore.mappingConfig.x_gap"></input></td>
                </tr>
                <tr>
                    <td>Gap in Y-scale (mm)</td>
                    <td><input type="float" v-model="configStore.mappingConfig.y_gap"></input></td>
                </tr>
                <tr>
                    <td>#Points in X-sacle</td>
                    <td><input type="float" v-model="configStore.mappingConfig.x_points"></input></td>
                </tr>
                <tr>
                    <td>#Points in Y-sacle</td>
                    <td><input type="float" v-model="configStore.mappingConfig.y_points"></input></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="preview panel">
        <h2>Grid Preview</h2>
        <img src="../tiip.png" alt="grid preview">
    </div>
</template>

<script setup lang="ts" name="MappingOp">
    import { useConfigStore } from '@/store/config';
    const configStore = useConfigStore()
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