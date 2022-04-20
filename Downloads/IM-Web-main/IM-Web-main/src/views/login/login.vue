<template>
  <div class="login-container">
    <div class="register">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="register-form">
        <div class="title-container">
          <p class="title">登录</p>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item class="button">
          <el-button style="margin-left: 30px;background-color: #6b705c" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button style="margin-left: 80px;background-color: #b7b7a4" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="linked">
        <router-link to="/register"> 还没有账号？注册一个</router-link>
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
import Foot from '@/components/loginpage/footer'
import  genTestUserSig  from '../../../public/debug/GenerateTestUserSig'

export default {
  components: {
    Foot
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/worker/login',
            method: 'get',
            crossdomain: true,
            params: {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            }
          }).then(res => {
            console.log(res.data)
            if(res.data.msg==='请求成功')
            {
              alert('登录成功!')
              this.$store1.commit('setUsername', res.data.data.username)
              this.$store1.commit('setUserID', res.data.data.id)
              this.$store1.commit('setSchedule', res.data.data.schedule)
              this.$store1.commit('setRole', res.data.data.role)
              this.$store1.commit('setTrueName', res.data.data.trueName)
              var temp=res.data.data
              temp.available=1
              // console.log(res.data.data)
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
              if(res.data.data.role==3) {
                this.$router.replace('/admin')
              }else if(res.data.data.role==2) {
                this.$router.replace('/helper')
              }else if(res.data.data.role==1) {
                this.$router.replace('/consultant')
              }
              this.login_tim()
            }
            else {
              alert('用户名密码错误')
            }
          }).catch(err => {
                console.log('==',err.data)
              })
        } else {
          console.log('登录失败，请输入正确的用户名和密码')
          return false
        }
      })
    },
    login_tim() {
      // this.loading = true
      console.log('t1')
      console.log(window.genTestUserSig(this.$store1.state.username).userSig)
      console.log(this.$store1.state.username)
      console.log(this.$store1.state.userid)
      this.tim
          .login({
            userID: this.$store1.state.username,
            userSig: window.genTestUserSig(this.$store1.state.username).userSig
          })
          .then(() => {
            this.loading = false
            console.log('t1_inter')
            this.$store.commit('toggleIsLogin', true)
            this.$store.commit('startComputeCurrent')
            this.$store.commit('showMessage', { type: 'success', message: '登录成功' })
            this.$store.commit({
              type: 'GET_USER_INFO',
              userID: this.$store.state.username,
              userSig: window.genTestUserSig(this.$store1.state.username).userSig,
              sdkAppID: window.genTestUserSig('').SDKAppID
            })
            this.$store.commit('showMessage', {
              type: 'success',
              message: '登录成功'
            })
          })
          .catch(error => {
            this.loading = false
            this.$store.commit('showMessage', {
              message: '登录失败：' + error.message,
              type: 'error'
            })
          })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>
.login-container{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/bg-4.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .register{
    background-color: rgb(107, 112, 92,0.4);
    width: 30%;
    margin: 250px auto;
    height: 40%;
    .register-form{
      margin-right: 40px;
      margin-bottom: 40px;
      .title-container {
        //position: relative;
        .title {
          font-size: 26px;
          color: #606266;
          margin: 0px auto 20px auto;
          padding-top: 20px;
          text-align: center;
        }
      }
    }
    .linked{
      //text-align: center;
      position: relative;
      top: 20px;
      left: 45px;
      height: 40px;
      width: 100%;
      margin: 0 auto;
      color: white;
    }
  }
}
</style>
