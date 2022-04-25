<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="mt16">
      <!-- 搜索框 -->
      <el-input v-model="keyword" style="width: 300px">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
      <!-- 添加用户模态框控制按钮 -->
      <el-button
        type="primary"
        style="margin-left: 30px"
        @click="dialogFormVisible = true"
        >添加用户</el-button
      >
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="mt16">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="editZt({ id: scope.row.id, type: scope.row.mg_state })"
              >
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <!-- 按钮组 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row.id)"
            ></el-button>
            <el-button type="warning" icon="el-icon-share"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="mt16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加模态框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改模态框 -->
      <el-dialog title="修改用户" :visible.sync="FormVisible">
        <el-form
          :model="editForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="FormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getUsersApi,
  delApi,
  addUsersApi,
  editUsersApi,
  editZtApi
} from '@/http/api'
export default {
  data() {
    return {
      keyword: '',
      tableData: [],
      // 渲染表格
      pageInfo: {
        pagesize: 4,
        pagenum: 1,
        query: ''
      },
      total: 0,
      dialogFormVisible: false,
      // 添加的表单
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 正则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mobile: [
          {
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ]
      },
      FormVisible: false,
      // 修改模态框
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      editId: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 请求用户表格数据
    async getList() {
      const res = await getUsersApi(this.pageInfo)
      console.log(111)
      this.tableData = res.users
      this.total = res.total
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.pageInfo.pagesize = val
      this.getList()
    },
    // 改变当前页码
    handleCurrentChange(val) {
      this.pageInfo.pagenum = val
      this.getList()
    },
    // 搜索
    search() {
      this.pageInfo.query = this.keyword
      this.getList()
    },
    // 删除
    remove(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delApi(id)
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加用户
    add() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false
        addUsersApi(this.form)
        // 关闭模态框
        this.dialogFormVisible = false
        // 清空模态框
        this.form = {
          username: '',
          password: '',
          email: '',
          mobile: ''
        }
        this.getList()
      })
    },
    // 编辑
    edit(obj) {
      this.FormVisible = true
      console.log(obj)
      // 数据回填
      this.editForm = {
        id: obj.id,
        mobile: obj.mobile,
        username: obj.username,
        email: obj.email
      }
    },
    // 修改状态
    editZt(obj) {
      editZtApi(obj)
    },
    // 确认修改
    async editUser() {
      await editUsersApi(this.editForm)
      this.FormVisible = false
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  text-align: left;
}
</style>
