<template>
  <div>
    <MBX one="商品管理" two="添加商品"></MBX>
    <!-- 消息提示 -->
    <el-card class="mt16">
      <el-alert
        title="添加商品信息"
        type="info"
        center
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps :active="active * 1" align-center class="mt16">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 左侧菜单 -->
      <!-- 表单 -->
      <el-form :model="addForm" class="mt16">
        <el-tabs
          tab-position="left"
          v-model="active"
          :before-leave="beforeLave"
          @tab-click="handleClick"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-cascader
              v-model="rid"
              :options="options"
              :props="expand"
              @change="handleChange"
            ></el-cascader>
          </el-tab-pane>
          <el-tab-pane label="商品参数"
            ><el-form-item
              :label="item1.attr_name"
              v-for="item1 in manyParams"
              :key="item1.id"
            >
              <el-checkbox-group v-model="item1.attr_vals">
                <el-checkbox
                  :label="item2"
                  v-for="(item2, index) in item1.attr_vals"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group> </el-form-item
          ></el-tab-pane>
          <el-tab-pane label="商品属性"
            ><el-form-item
              :label="item.attr_name"
              v-for="item in onlyParams"
              :key="item.id"
            >
              <el-input>{{ item.attr_vals }}</el-input>
            </el-form-item></el-tab-pane
          >
          <el-tab-pane label="商品图片"
            ><el-upload
              action="http://www.ysqorz.top:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
                <el-button size="small" type="primary">点击上传</el-button>  
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload></el-tab-pane
          >
          <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
          <el-tab-pane label="完成">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '0',
      addForm: {
        goods_name: '',
        goods_price: '0',
        goods_number: '0',
        goods_weight: '0',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      options: [],
      expand: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      rid: [],
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      manyParams: [], //动态数据
      onlyParams: [] //静态数据
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$API.categoriesApi()``
      console.log(res)
      this.options = res
    },
    handleChange() {},
    async handleClick() {
      if (this.active === '1') {
        const res = await this.$API.getGoodsparams(this.ridEnd)
        console.log(res)
        res.forEach((item) => {
          item.attr_vals = item.attr_vals > 0 ? item.attr_vals.split(',') : []
        })
        this.manyParams = res
      } else if (this.active === '2') {
        //   调取静态参数
        this.onlyParams = await this.$API.getGoodsparams(this.ridEnd, 'only')
      }
    },
    //切换前判断是不是非空
    beforeLave(newActive, oldActive) {
      console.log(newActive, oldActive)
      if (oldActive === '0' && this.rid.length !== 3) {
        this.$message({
          type: 'error',
          message: '请选择三级联动'
        })
        return false
      }
    },
    handleSuccess(res) {
      console.log('上传成功', res)
      this.addForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    // 删除上传
    handleRemove(res) {
      console.log('删除上传', res)
      const index = this.addForm.pics.findIndex((item) => {
        return item.pic === res.response.data.tmp_path
      })
      this.addForm.pics.splice(index, 1)
    },
    handlePreview() {}
  },
  computed: {
    ridEnd() {
      return this.rid[this.rid.length - 1]
    }
  }
}
</script>
<style>
.el-cascader-panel {
  height: 200px;
}
.el-steps {
  font-size: 18px;
}
</style>

<style lang="scss" scoped>
.el-card {
  text-align: left;
}
</style>
