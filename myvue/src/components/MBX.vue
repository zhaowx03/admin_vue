<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ one }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ two }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  mounted() {},
  methods: {},
  props: {
    one: {
      type: String,
      default: '一级页面'
    },
    two: {
      type: String,
      default: '一级页面'
    }
  }
}
</script>

<style scoped></style>
