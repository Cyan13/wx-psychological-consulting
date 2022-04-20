<template>
  <div class="login-container">
    <div class="register">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="register-form">
        <div class="title-container">
          <p class="title">注 册</p>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确定密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" />
        </el-form-item>
        <el-form-item class="button">
          <el-button style="margin-left: 30px;background-color: #6b705c" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button style="margin-left: 80px;background-color: #b7b7a4" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Foot />
  </div>
</template>

<script>
import Indexbg from '@/components/loginpage/bg'
import Foot from '@/components/loginpage/footer'

export default {
  components: {
    Indexbg,
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
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        checkPass: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {

  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          // alert('登录成功!');
          this.$http
            .get('/worker/register', { params:
                {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  role: 3
                }}, { emulateJSON: true })
            .then((response) => {
              console.log(response.data)
              this.$router.push({
                path: '/login'
              })
            }).catch(err => {
              console.log(err.data)
            })
        } else {
          alert('注册失败')
          return false
        }
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
    margin: 200px auto;
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
  }
;
}
</style>
