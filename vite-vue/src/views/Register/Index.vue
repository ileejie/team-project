<template>
    <div class="register-wrap">
        <el-form
        ref="registerRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        class="form-view">
            <el-form-item class="form-title">用户注册</el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input v-model="formData.password" show-password prefix-icon="Lock"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmpd">
                <el-input v-model="formData.confirmpd" show-password prefix-icon="Key"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="formData.phone" prefix-icon="Phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="text" @click="login">有账号? 去登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="submitRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
export default {
    name: 'register',
    setup() {
        const router = useRouter()
        const validateConfirmPd = (rule, value, callback) => {
            if (!value){
                callback(new Error('请输入确认密码'))
            }else if (value !== registerForm.data.password){
                callback(new Error('输入的两次密码不一致'))
            }else {
                callback()
            }
        }
        const validatePhone = (rule, value, callback) => {
            const reg = new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/)
            if (!value){
                callback(new Error('请输入手机号'))
            }else if (!reg.test(value)){
                callback(new Error('输入的手机号不规范'))
            }else {
                callback()
            }
        }
        const rules = {
            username: [
                {
                    required: true,
                    message: 'Please input username',
                    trigger: 'blur'
                }
            ],
            password: [
                {
                    required: true,
                    message: 'Please input password',
                    trigger: 'blur'
                }
            ],
            confirmpd: [
                {
                    required: true,
                    validator: validateConfirmPd,
                    trigger: 'blur'
                }
            ],
            phone: [
                {
                    required: true,
                    validator: validatePhone,
                    trigger: 'blur'
                }
            ],
            code: [
                {
                    required: true,
                    message: 'Please input code',
                    trigger: 'blur'
                }
            ]
        }
        const data = reactive({
            formData: {
                username: '',
                password: '',
                confirmpd: '',
                phone: '',
                code: ''
            },
            registerRef: null
        })
        const login = () => {
            router.replace({ path: '/login' })
        }
        const submitRegister = () => {
            data.registerRef.validate(valid => {
                if (valid){
                    ElNotification({
                        title: '成功',
                        message: '账号注册成功',
                        type: 'success',
                    })
                    router.replace({ path: '/login' })
                }else {
                    return false
                }
            })
        }
        return {
            rules,
            ...toRefs(data),
            submitRegister,
            login
        }
    },
}

</script>

<style scoped lang='scss'>
.register-wrap {
    width: 100%;
    height: 100vh;
    background: url('../../assets/login_images/login-bg.jpg') 0 0 no-repeat;
    background-size: cover;
    padding-top: 10%;
    .form-view {
        width: 500px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 15px;
        margin: 0 auto;
        padding: 50px 100px 30px 0;
        box-sizing: border-box;
        .form-title {
            :deep(.el-form-item__content) {
                text-align: center;
                font-size: 24px;
                font-weight: 500;
            }
        }
    }
}
</style>