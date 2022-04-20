<template>
  <div class="page" style="height: 100%">
    <div class="top">
      <div class="div-1" >
        <div style="display: inline-block;width: 30%;margin-top: 20px;padding-left:10px;">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div style="width: 70%;display: inline-block;line-height: 10px;color: white;padding-left: 10px">欢迎你！<br></br>机构管理员</div>
      </div>
      <div class="div-2" >
      </div>
    </div>
    <div class="content">
      <div class="aside">
        <el-menu
          active-text-color="#86afba"
          background-color="#1f2e41"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          align="left"
        >
          <router-link to="/admin/frontpage">
            <el-menu-item index="1">
              <i class="el-icon-s-home" />
              <span style="margin-left: 15px">首页</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/record">
            <el-menu-item index="2">
              <i class="el-icon-s-management" />
              <span style="margin-left: 15px">咨询记录</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/schedule">
            <el-menu-item index="3">
              <i class="el-icon-date" />
              <span style="margin-left: 15px">排班表</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/consultant">
            <el-menu-item index="4">
              <i class="el-icon-s-custom" />
              <span style="margin-left: 15px">咨询师管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/helper">
            <el-menu-item index="5">
              <i class="el-icon-s-check" />
              <span style="margin-left: 15px">督导管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/visitor">
            <el-menu-item index="6">
              <i class="el-icon-place" />
              <span style="margin-left: 15px">访客管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/login">
            <el-menu-item index="7" @click="logout">
              <i class="el-icon-turn-off" />
              <span style="margin-left: 15px">退出</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    logout(){
      console.log("退出")
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body: JSON.stringify({
          "id": this.$store1.state.userid
        })
      }).then(res => {
        console.log(res.data)
        var temp=res.data.data[0]
        temp.available=2
        console.log(temp)
        this.$http({
          url: "/admin/updateWorker",
          method: "post",
          crossdomain: true,
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(temp)
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err.data)
        });
      }).catch(err => {
        console.log(err.data)
      });
      this.$store1.state.username=''
      this.$store1.state.userid=''
      this.$store1.state.schedule=''
      this.$store1.state.role=''
      this.$router.push({
        path: '/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  height: 9%;
  background-color: white;
  //position: absolute;
  .div-1{
    position: absolute;
    width: 11%;
    height: 100%;
    left: 0px;
    background-color: #1f2e41;
  }
  .div-2{
    position: absolute;
    width: 88%;
    left: 11%;
    height: 100%;
    background-image:url("../../assets/images/logo.jpg");
    background-repeat: no-repeat;

  }

}
.content{
  position: relative;
  height: 91%;
  background-color: #eff2f5;
  .aside{
    position: absolute;
    left: 0px;
    height: 100%;
    width: 11%;
    background-color: #1f2e41;
  }
  .main{
    position: absolute;
    right: 0px;
    width: 89%;
    height: 100%;
  }
}
</style>
