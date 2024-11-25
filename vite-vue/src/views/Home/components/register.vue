<!--
  *@description Vue Files Modules
  *@fileName register.vue
  *@author leejie
  *@date 2024/09/02 09:02:02
!-->
<template>
  <el-dialog title="注册" :visible.sync="dialogVisible" width="600px">
    <el-form :model="formData">
      <el-form-item>
        <el-input v-model="formData.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入邮箱" v-model="formData.email">
          <template slot="append">@estun.com</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.confirmPwd" type="password" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-cascader
          v-model="formData.department"
          :options="deptOptions"
          placeholder="请选择部门"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'Register',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'));
      } else {
        const reg = /^[a-zA-Z0-9_-]$/;
        if (reg.test(value)) {
          callback(new Error('您输入的邮箱名称不规范'));
        }
        callback();
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (reg.test(value)) {
          callback(new Error('密码至少八个字符，至少包含一个字母和一个数字'));
        }
        callback();
      }
    };
    const confiemPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPwd: '',
        department: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'change' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'change' },
        ],
        confirmPwd: [
          { required: true, validator: confiemPass, trigger: 'change' },
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ]
      },
      deptOptions: [
        {
          value: 'asd',
          label: '埃斯顿',
          children: [
            {
              value: 'tec',
              label: '技术部',
            },
            {
              value: 'busi',
              label: '业务部',
            },
            {
              value: 'market',
              label: '市场部',
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  // 方法实现
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang='scss' scoped>

</style>
