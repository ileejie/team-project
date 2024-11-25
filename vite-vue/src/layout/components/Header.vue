<template>
    <div class="header">
        <img class="web-logo" src="@/assets/images/heaerImg.png" alt="web logo" />
        <p class="web-name">测试自建网站</p>
        <!-- <el-breadcrumb separator-icon="ArrowRight" style="flex: 1;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="right-menu">
            <div class="badge-item" style="margin-right:20px" @click="servicePage">
                <el-badge :value="3" class="item">
                    <el-icon :size="20"><Message /></el-icon>
                </el-badge>
                <div class="">服务支持</div>
            </div>
            <div class="badge-item" style="margin-right:20px" @click="messagePage">
                <el-badge :value="5" class="item">
                    <el-icon :size="20"><ChatDotSquare /></el-icon>
                </el-badge>
                <div class="">消息</div>
            </div>
            <el-dropdown style="margin-left:15px;">
                <span class="el-dropdown-link">
                {{username || 'admin'}}
                    <el-icon class="el-icon--right">
                        <CaretBottom />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="personInfo">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="changePass">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const username = computed(() => store.state.username)
        const personInfo = () => {
            router.push({ path: '/person/userCenter' })
        }
        const changePass = () => {
            router.push({ path: '/person/password' })
        }
        const logout = () => {
            router.replace({ path: '/login' })
        }
        const servicePage = () => {
            router.push({ path: '/service' })
        }
        const messagePage = () => {
            router.push({ path: '/message' })
        }
        return { username, personInfo, changePass, logout, servicePage, messagePage }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    width: calc(100% - 150px);
    height: 60px;
    background: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    z-index: 5;
    box-shadow:rgba(0, 0, 0, 0.1) 1px 1px 5px 1px;
    .web-logo {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .web-name {
        flex: 1;
        font-size: 20px;
        line-height: 30px;
        color: #333;
        margin: 0 30px 0 0;
    }
    .right-menu {
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 10px;
        &:focus {
            outline: none;
        }
        .badge-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            line-height: 18px;
            color: #606266;
            cursor: pointer;
        }
        .el-dropdown-link {
            cursor: pointer;
        }
    }
}
</style>