<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="mt16">
      <!-- 搜索框 -->
      <el-input v-model="keyword" style="width: 35%" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" style="margin-left: 30px">添加商品</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      tableData: [],
      pageInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-card {
  text-align: left;
}
</style>
