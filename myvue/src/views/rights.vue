<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="mt16">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <!-- 等级插槽 -->
          <template slot-scope="scope">
            <div>
              <el-tag v-show="scope.row.level == 0">一级</el-tag>
              <el-tag type="success" v-show="scope.row.level == 1">二级</el-tag>
              <el-tag type="warning" v-show="scope.row.level == 2">三级</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table></el-card
    >
  </div>
</template>

<script>
import { typeApi } from '@/http/api'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await typeApi('list')
      console.log(res)
      this.tableData = res
    }
  }
}
</script>

<style lang="scss" scoped></style>
