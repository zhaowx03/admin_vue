<template>
  <div class="login">
    <div class="login_box">
      <h1>电商后台管理系统</h1>
      <el-form :model="login_form" :rules="rules" ref="ruleForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="login_form.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="login_form.password"
            prefix-icon="el-icon-s-goods"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="login_box_btn">
          <el-button type="primary" @click="goLogin">登录</el-button>
          <el-button type="error">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LoginApi } from '@/http/api'
export default {
  data() {
    return {
      login_form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    goLogin() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false
        const res = await LoginApi(this.login_form)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    width: 30%;
    height: 300px;
    min-width: 400px;
    border: 1px solid #eee;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    .el-form {
      position: relative;

      .login_box_btn {
        position: absolute;
        right: 20px;
      }
    }
  }
}
</style>
