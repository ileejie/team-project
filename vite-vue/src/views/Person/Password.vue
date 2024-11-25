<template>
    <div class="content-container">
        <el-page-header icon="ArrowLeft" content="修改密码" @back="onBack" />
    </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name: 'password',
    setup() {
        const data = reactive({})
        const router = useRouter()
        const onBack = () => {
            router.go(-1)
        }
        return {
            ...toRefs(data),
            onBack
        }
    },
}

</script>

<style scoped lang='scss'>
</style>