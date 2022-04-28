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
      <el-button
        type="primary"
        style="margin-left: 30px"
        @click="$router.push('/goodsadd')"
        >添加商品</el-button
      >
      <!-- 商品列表 -->
      <el-table :data="tableData" border style="width: 100%" class="mt16">
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格（元）"
          width="120px"
        >
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="100px">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="200px">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$API.goodsList(this.pageInfo)
      console.log(res)
      this.tableData = res.goods
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  text-align: left;
}
</style>
