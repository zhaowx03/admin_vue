<template>
  <div>
    <el-container>
      <el-header>
        <h2>电商后台管理系统</h2>
        <el-button type="danger" @click="remLogin">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="lock ? '200px' : '50px'">
          <h3 @click="lock = !lock">|||</h3>
          111
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lock: true
    }
  },
  mounted() {},
  methods: {
    remLogin() {
      this.$confirm('你确定要退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(11)
          // localStorage.removeItem(token)
          localStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
