<template>
  <el-container class="home-container">
<!--    // 头部文件-->
    <el-header >
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商平台后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>

<!--      // 侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||
<!--          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--            <el-radio-button :label="false">展开</el-radio-button>-->
<!--            <el-radio-button :label="true">收起</el-radio-button>-->
<!--          </el-radio-group>-->

        </div>
        <el-menu
          :collapse="isCollapse"
          :unique-opened="false"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="red">
          <!-- 一级菜单-->
          <el-submenu :index="item.id + ''"  v-for="item in menulist" :key="item.id">
            <!--一级菜单模板-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
<!--      // 右侧主题区域-->
      <el-main>
<!--        路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //左侧菜单数据
  data() {
    return{
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      //菜单是否折叠
      isCollapse: false,
    //  被激活的连接地址
      activePath: ''
    }
  },
  //生命周期函数
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有菜单
    async getMenuList(){
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    //点击菜单，实现折叠与展开
    toggleCollapse(){
      this.isCollapse =! this.isCollapse
    },
    //保存连接的激活状态
    saveNavState(activePath){
      // 创建一个新的key（‘activePath’） 用来存储路径
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  }
}

</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header{
  background-color: #333744;
  display: flex;
  justify-content: space-between;  // 左右贴边对齐
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: ghostwhite;
}
.iconfont {
  margin-right: 10px;
}
//.el-menu-vertical-demo:not(.el-menu--collapse) {
//  width: 200px;
//  min-height: 400px;
//}
.toggle-button{
  background-color: #333744;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: white;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
