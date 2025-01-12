<template>
<!--	<div class="login-wrap">-->
<!--		<el-form ref="loginRef" :model="formData" :rules="rules" label-width="100px" class="form-view">-->
<!--			<el-form-item class="form-title">用户登录</el-form-item>-->
<!--			<el-form-item label="用户名" prop="username">-->
<!--				<el-input v-model="formData.username" prefix-icon="User"></el-input>-->
<!--			</el-form-item>-->
<!--			<el-form-item label="密码" prop="password">-->
<!--				<el-input v-model="formData.password" show-password prefix-icon="Lock"></el-input>-->
<!--			</el-form-item>-->
<!--			<el-form-item class="between-item">-->
<!--				<el-button type="text" @click="register">用户注册</el-button>-->
<!--				<el-button type="text" @click="forget">忘记密码?</el-button>-->
<!--			</el-form-item>-->
<!--			<el-form-item>-->
<!--				<el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>-->
<!--			</el-form-item>-->
<!--		</el-form>-->
<!--	</div>-->
  <div class="flex h-screen w-screen">
    <div class="flex-1 bg-black">
      <div class="flex items-center justify-center h-full w-full"></div>
    </div>
    <div class="flex-1 bg-white">
      <div class="flex flex-col items-center justify-center h-full w-full animate__animated animate__backInDown">
        <h2 class="animate__animated animate__swing">登录</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import * as api from "@/api/base";
export default {
	name: "login",
	setup() {
		const router = useRouter();
		const rules = {
			username: [
				{
					required: true,
					message: "Please input username",
					trigger: "blur",
				},
			],
			password: [
				{
					required: true,
					message: "Please input password",
					trigger: "blur",
				},
			],
		};
		const data = reactive({
			formData: {
				username: "",
				password: "",
			},
			loginRef: null,
		});
		const register = () => {
			router.replace({ path: "/register" });
		};
		const forget = () => {
			router.replace({ path: "/forget" });
		};
		const submitLogin = () => {
			data.loginRef.validate((valid) => {
				if (valid) {
					if (
						data.formData.username === "admin" &&
						data.formData.password === "123456"
					) {
						api.login(data.formData).then(() => {
							router.replace({ path: "/" });
						});
					} else {
						ElMessage.error("用户名或密码错误");
					}
				} else {
					return false;
				}
			});
		};
		return {
			rules,
			...toRefs(data),
			submitLogin,
			register,
			forget,
		};
	},
};
</script>

<style scoped lang="scss">
.login-wrap {
	width: 100%;
	height: 100vh;
	background: url("../../assets/login_images/login-bg.jpg") 0 0 no-repeat;
	background-size: cover;
	padding-top: 10%;

	.form-view {
		width: 500px;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 15px;
		margin: 0 auto;
		padding: 50px 100px 30px 0;
		box-sizing: border-box;

		.between-item {
			:deep(.el-form-item__content) {
				display: flex;
				justify-content: space-between;
			}
		}

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
