<template>
    <el-row class="tac">
        <el-col>
            <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            :default-active="activeRoute"
            text-color="#fff"
            :router="true">
                <el-sub-menu index="/home">
                    <template #title>
                        <el-icon><House /></el-icon>
                        <span>首页概况</span>
                    </template>
                    <el-menu-item index="/home/homeIndex">首页</el-menu-item>
                    <el-menu-item index="/home/homeInfo">信息</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/goods/list">
                    <el-icon><Goods /></el-icon>
                    <span>网上购物</span>
                </el-menu-item>
                <el-menu-item index="/order/orderIndex">
                    <el-icon><Document /></el-icon>
                    <span>订单管理</span>
                </el-menu-item>
                <el-menu-item index="/data/dataIndex">
                    <el-icon><Coin /></el-icon>
                    <span>数据管理</span>
                </el-menu-item>
                <el-menu-item index="/user/userIndex">
                    <el-icon><User /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>
                <el-menu-item index="/permission/permissionIndex">
                    <el-icon><Lock /></el-icon>
                    <span>权限配置</span>
                </el-menu-item>
                <el-menu-item index="/contact/contactIndex">
                    <el-icon><ChatDotSquare /></el-icon>
                    <span>在线客服</span>
                </el-menu-item>
                <el-menu-item index="/about/aboutIndex">
                    <el-icon><Service /></el-icon>
                    <span>关于我们</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let activeRoute = ref(router.currentRoute.value.fullPath)
watch(() => router.currentRoute.value.fullPath, (val, old) => {
  activeRoute.value = val
})
</script>

<style lang="scss" scoped>
.tac {
    position: fixed;
    width: 150px;
    height: 100vh;
    left: 0;
    z-index: 5;
    :deep(.el-menu) {
        height: 100%;
        border-right: none;
        .el-sub-menu .el-menu-item {
            padding: 0;
            padding-left: 60px !important;
            min-width: 150px;
        }
    }
}
</style>
