<template slot-scope="scope">
  <div class="register">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
<!--    <p>Copyright © 2018 Design and Development By codercao</p>-->
<!--    <p>-->
<!--      Contact Me by github :-->
<!--      <a-->
<!--        href="https://github.com/HongqingCao"-->
<!--        target="_blank"-->
<!--        title="HongqingCao"-->
<!--      >HongqingCao</a>-->
<!--    </p>-->
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style lang="scss" scoped>
.register {
  position: relative;
  font-size: 18px;
  bottom: -780px;
  left: 0;
  color: white;
  text-align: center;
  width: 100%;
  z-index: 1001;
  p {
    a {
      color: #e6e6fa;
      cursor: pointer;
    }
  }
}
</style>
