<template>
    <div v-if="total > 10" class="pagination-wrap">
        <el-pagination background layout="prev, pager, next" :total="total" :hide-on-single-page="true" :page-size="10"
            v-model:currentPage="current" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    props: {
        total: Number,
        current: Number
    },
    setup(props, { emit }) {
        // console.log(props)
        // const total = props.total
        // watch(total, (oldVal, newVal) => {
        //   total = newVal
        // })
        const handleCurrentChange = (val) => {
            emit('currentPage', val)
        }
        return { handleCurrentChange }
    }
}

</script>

<style scoped lang='scss'>
.pagination-wrap {
    padding: 10px 0;
}
</style>