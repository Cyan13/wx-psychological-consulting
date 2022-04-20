<template>
  <div class="page" style="height: 100%">
    <div class="top">
      <div class="div-1" >
        <div style="display: inline-block;width: 30%;margin-top: 20px;padding-left:10px;">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div style="width: 70%;display: inline-block;line-height: 10px;color: white;padding-left: 10px">欢迎你！<br></br>咨询师</div>
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
          <router-link to="/consultant/frontpage">
            <el-menu-item index="1">
              <i class="el-icon-s-home" />
              <span style="margin-left: 15px">首页</span>
            </el-menu-item>
          </router-link>
          <router-link to="/consultant/record">
            <el-menu-item index="2">
              <i class="el-icon-s-management" />
              <span style="margin-left: 15px">咨询记录</span>
            </el-menu-item>
          </router-link>
          <router-link to="/consultant/connect">
            <el-menu-item index="3" @click="IMProfile">
              <i class="el-icon-chat-round" />
              <span style="margin-left: 15px">处理会话</span>
            </el-menu-item>
          </router-link>
<!--          <router-link to="/login">-->
            <el-menu-item index="4" @click="logout">
              <i class="el-icon-turn-off" />
              <span style="margin-left: 15px" >退出</span>
            </el-menu-item>
<!--          </router-link>-->
        </el-menu>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import tim from '@/tim'

export default {
  data() {
    return {
      navList: [
        {name: '/user/contribution', navItem: '投稿'},
        {name: '/user/table', navItem: '历史稿件'},
        {name: '/user/information', navItem: '个人信息'}
      ],
      logoutValidate: true,
      form: { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', nick: '', gender: '',allowType: '' }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    logout() {
      this.logoutValidate = this.$store2.state.helpVisible
      console.log(this.logoutValidate)
      if(this.logoutValidate == false) {
        alert('请先结束督导求助！')
        this.$router.push({
          path: '/consultant/connect'
        })
      }
      else{
        console.log('退出')
        this.$http({
          url: '/admin/getWorkerList',
          method: 'post',
          crossdomain: true,
          body: JSON.stringify({
            'id': this.$store1.state.userid
          })
        }).then(res => {
          console.log(res.data)
          var temp=res.data.data[0]
          temp.available=2
          console.log(temp)
          this.$http({
            url: '/admin/updateWorker',
            method: 'post',
            crossdomain: true,
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(temp)
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err.data)
          })
        }).catch(err => {
          console.log(err.data)
        })
        this.IMLogout()
        this.$store1.state.username=''
        this.$store1.state.userid=''
        this.$store1.state.schedule=''
        this.$store1.state.role=0
        this.$store1.state.tureName=''
        this.$router.push({
          path: '/login'
        })
      }
    },
    IMLogout() {
      // 若有当前会话，在退出登录时已读上报
      // if (context.rootState.conversation.currentConversation.conversationID) {
      //   tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
      // }
      tim.logout().then(() => {
        this.$store.commit('toggleIsLogin')
        this.$store.commit('stopComputeCurrent')
        this.$store.commit('reset')
      })
    },
    IMProfile() {
      // const options = {}
      // // 过滤空串
      // Object.keys(this.form).forEach(key => {
      //   if (this.form[key]) {
      //     options[key] = this.form[key]
      //   }
      // })
      // this.tim
      //     .updateMyProfile({ avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', nick: '', gender: '',allowType: '' })
      //     .then(() => {
      //       this.$store.commit('showMessage', {
      //         message: '修改成功'
      //       })
      //       this.showEditMyProfile = false
      //     })
      //     .catch(imError => {
      //       this.$store.commit('showMessage', {
      //         message: imError.message,
      //         type: 'error'
      //       })
      //     })
      let promise = tim.updateMyProfile({
        nick: this.$store1.state.trueName,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        gender: 'Gender_Type_Male',
        selfSignature: '',
        allowType: 'AllowType_Type_AllowAny'
      });
      promise.then(function(imResponse) {
        console.log(imResponse.data); // 更新资料成功
      }).catch(function(imError) {
        console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
      });
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
