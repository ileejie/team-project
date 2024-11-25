<template>
    <div>
        person info
    </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    name: '',
    setup() {
        const store = useStore()
        store.dispatch('getActiveRoute', '')
        return {
        
        }
    },
}

</script>

<style scoped lang='scss'>
</style>