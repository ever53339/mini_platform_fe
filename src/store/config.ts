import { defineStore } from "pinia";
import { reactive } from "vue";

const mappingConfig = reactive({
    x_gap: '0.1',
    y_gap: '0.1',
    x_points: '10',
    y_points: '10'
})

const multipleSampleConfig = reactive({
    sample_locations: '',
    num_samples: ''
})

export const useConfigStore = defineStore('config', {
    state() {
        return {
            mappingConfig: mappingConfig,
            multipleSampleConfig: multipleSampleConfig
        }
    }
})