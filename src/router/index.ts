import MappingOp from "@/pages/MappingOp.vue";
import MultipleSamples from "@/pages/MultipleSamples.vue";
import GantryControl from "@/pages/GantryControl.vue";
import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes : [
        {   
            name: 'mappingOp', 
            path: '/mappingOp',
            component: MappingOp,
        },
        {   
            name: 'multipleSamples',
            path: '/multipleSamples',
            component: MultipleSamples
        }, 
        {   
            name: 'gantryControl',
            path: '/gantryControl',
            component: GantryControl
        }
    ]
})

export default router