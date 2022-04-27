<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="mt16">
      <!-- 添加角色按钮 -->
      <el-button type="primary" @click="dialogFormVisible = true"
        >添加角色</el-button
      >
      <el-table :data="tableData" border style="width: 100%" class="mt16">
        <el-table-column type="expand"
          ><template slot-scope="scope">
            <div v-if="scope.row.children.length > 0" class="pad">
              <el-row v-for="item in scope.row.children" :key="item.id">
                <el-col :span="6">
                  <el-tag
                    effect="dark"
                    closable
                    @close="closeTag(scope.row, item.id)"
                    >{{ item.authName }}</el-tag
                  >
                </el-col>
                <el-col :span="18">
                  <el-row
                    v-for="item1 in item.children"
                    :key="item1.id"
                    style="margin: 8px"
                  >
                    <el-col :span="6">
                      <el-tag
                        type="success"
                        effect="dark"
                        closable
                        @close="closeTag(scope.row, item1.id)"
                        >{{ item1.authName }}
                      </el-tag>
                    </el-col>
                    <el-col :span="18">
                      <el-row>
                        <el-col :span="24">
                          <el-tag
                            v-for="item2 in item1.children"
                            :key="item2.id"
                            type="warning"
                            effect="dark"
                            class="le"
                            closable
                            @close="closeTag(scope.row, item2.id)"
                            >{{ item2.authName }}</el-tag
                          >
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-else class="pad">暂无权限</div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column fixed="right" label="角色操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row.id)"
                >删除</el-button
              >
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                @click="gxType(scope.row)"
                >分配权限</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色模态框 -->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="form.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改角色模态框 -->
      <el-dialog title="修改角色" :visible.sync="FormVisible">
        <el-form
          :model="editForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="FormVisible = false">取 消</el-button>
          <el-button type="primary" @click="qr">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 权限模态框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-tree
          :data="list"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkArr"
          :props="defaultProps"
          :default-expand-all="true"
          ref="rightTreeRef"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCheck">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getRolesApi,
  RolesUserApi,
  delRolesApi,
  editRolesApi
} from '@/http/api'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      FormVisible: false,
      dialogVisible: false,
      form: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      list: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      typeId: 0,
      checkArr: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //   请求数据
    async getList() {
      const res = await getRolesApi()
      this.tableData = res
    },
    // 添加角色
    add() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false
        await RolesUserApi(this.form)
        // 关闭模态框
        this.dialogFormVisible = false
        // 清空模态框
        this.form = {
          roleName: '',
          roleDesc: ''
        }
        this.getList()
      })
    },
    // 删除角色
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delRolesApi(id)
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑角色
    edit(obj) {
      console.log(obj)
      this.FormVisible = true
      this.editForm = obj
      console.log(this.editForm)
    },
    // 编辑确认
    async qr() {
      await editRolesApi(this.editForm)
      // 关闭模态框
      this.FormVisible = false
      this.getList()
    },
    // 权限
    async gxType(row) {
      const res = await this.$API.typeApi('tree')
      this.list = res
      this.typeId = row.id
      this.getCheckedIdsArr(row, this.checkArr)
      this.dialogVisible = true
    },
    // 递归函数
    getCheckedIdsArr(row, checkArr) {
      if (!row.children) {
        return checkArr.push(row.id)
      }
      row.children.forEach((item) => {
        this.getCheckedIdsArr(item, checkArr)
      })
    },
    handleClose() {
      // this.checkArr = []
      this.dialogVisible = false
    },
    async updateCheck() {
      // 全选
      const allCheck = this.$refs.rightTreeRef.getCheckedKeys()
      // 半选
      const halfCheck = this.$refs.rightTreeRef.getHalfCheckedKeys()
      // 合并

      this.checkArr = [...allCheck, ...halfCheck]
      // 转字符串
      const arr = this.checkArr.join(',')
      console.log(this.typeId, arr)
      await this.$API.getRolesTypeApi(this.typeId, arr)
      this.dialogVisible = false
      this.getList()
    },
    async closeTag(row, rid) {
      row.children = await this.$API.removeTypeApi(row.id, rid)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  text-align: left;
}
</style>
