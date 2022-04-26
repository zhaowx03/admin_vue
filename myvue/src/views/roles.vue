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
          ><template slot-scope="props"> </template>
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
              <el-button type="warning" icon="el-icon-share" @click="gxType"
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
      <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%">
        <!-- <el-tree
          :data="list"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        >
        </el-tree> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
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
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //   请求数据
    async getList() {
      const res = await getRolesApi()
      console.log(res)
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
    qr() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false
        await editRolesApi(this.editForm)
        // 关闭模态框
        this.FormVisible = false
        this.getList()
      })
    },
    // 权限
    async gxType() {
      this.dialogVisible = true
      //   const res = await typeApi()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  text-align: left;
}
</style>
