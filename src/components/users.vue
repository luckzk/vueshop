<template>
<div>
<!--  面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>


<!--  卡片视图-->
  <el-card>

    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <!--用户列表区域-->
    <el-table :data="userlist" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" prop="mg_state">
        <!--        作用域插槽-->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
<!--          修改按钮-->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
<!--          删除按钮-->
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
<!--          分配角色-->
          <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
            <el-button type="warring" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
<!--    分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
export default {
  data(){
    return{
    //  获取用户列表的参数对象
      queryInfo:{
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    async getUserList(){
      const { data: res} = await this.$http.get('users',{ params: this.queryInfo})
      if (res.meta.status !== 200){
        return this.$message.error('获取数据失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>

</style>
