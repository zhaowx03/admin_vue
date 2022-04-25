<template>
  <div id="app">
    <el-container>
      <el-header>
        <h2>电商后台管理系统</h2>
        <el-button type="info" @click="remLogin">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <h3 style="text-align: center" @click="isCollapse = !isCollapse">
            |||
          </h3>
          <el-menu
            :default-active="$route.name"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isCollapse"
          >
            <el-submenu
              :index="index + '1'"
              v-for="(item, index) in list"
              :key="index"
            >
              <template slot="title">
                <i :class="icons[index]"></i>
                <span>{{ item.authName }}</span>
              </template>

              <el-menu-item
                :index="ite.path"
                v-for="(ite, ind) in item.children"
                :key="ind"
              >
                <i class="el-icon-menu"></i>
                <span slot="title">{{ ite.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { gitLeftLift } from '@/http/api'
// import { log } from 'util'
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      icons: [
        'el-icon-user-solid',
        'el-icon-s-tools',
        'el-icon-s-shop',
        'el-icon-s-order',
        'el-icon-s-marketing'
      ]
    }
  },
  created() {
    this.gitList()
  },
  methods: {
    // 退出登录
    remLogin() {
      this.$confirm('你确定要退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(11)
          // localStorage.removeItem(token)
          sessionStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          this.$router.replace('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    // 左侧菜单栏
    async gitList() {
      const res = await gitLeftLift()
      console.log(res)
      this.list = res
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #373d41;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #333744;
  color: #fff;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
}
.el-menu {
  border-right: 0;
}
.el-container {
  height: 100%;
}
</style>
