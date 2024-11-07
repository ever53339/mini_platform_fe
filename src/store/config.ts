import { defineStore } from "pinia";
import { reactive } from "vue";

const mappingConfig = reactive({
    x_gap: '',
    y_gap: '',
    x_points: '',
    y_points: ''
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