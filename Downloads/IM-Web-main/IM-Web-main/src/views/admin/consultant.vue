<template>
  <div class="page">
    <div class="search">
      搜索名字
      <div class="item">
        <input type="text" style="position: absolute" placeholder="输入名字进行搜索" @change="onChange">
        <el-button type="primary" class="button" @click="add_consultant('form_add')">新添咨询师</el-button>
        <el-dialog title="" :visible.sync="dialogFormVisible">
          <div style="font-size: 2em;margin-left: 20px;color: black">添加咨询师<div style="color: #6a6f77;font-size: 15px">添加咨询师账号并添加其个人信息</div></div>
          <el-form label-position="top" label-width="80px" size="medium "  ref="form_add" :model="form_add" :rules="rules_add" inline="true"  style="text-align: center;margin: 20px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="个人信息" name="first">
                <el-form-item label="" prop="true_name"><div style="text-align: left">姓名</div>
                  <el-input v-model="form_add.true_name" style="width: 300px" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="" prop="gender"><div style="text-align: left">性别</div>
                  <el-radio-group v-model="form_add.gender" style="width: 300px;text-align: left">
                    <el-radio label="男" />
                    <el-radio label="女" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="age"><div style="text-align: left">年龄</div>
                  <el-input v-model="form_add.age" style="width: 300px" placeholder="请输入年龄" />
                </el-form-item>
                <el-form-item label="" prop="id_number"><div style="text-align: left">身份证号码</div>
                  <el-input v-model="form_add.id_number" style="width: 300px" placeholder="请输入身份证号" />
                </el-form-item>
                <el-form-item label="" prop="phone"><div style="text-align: left">电话</div>
                  <el-input v-model="form_add.phone" style="width: 300px" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item label="" prop="email"><div style="text-align: left">邮箱</div>
                  <el-input v-model="form_add.email" style="width: 300px" placeholder="请输入邮箱地址" />
                </el-form-item>
                <el-form-item label="" prop="helper"><div style="text-align: left">绑定督导</div>
                  <el-select v-model="form_add.helper" style="width: 620px" placeholder="请选择督导" multiple>
                    <el-option v-for="(item, index) in helper_select" :key="index" :label="item.username" :value="item.username"></el-option>
                  </el-select>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="工作信息" name="second">
                <el-form-item label="" prop="username"><div style="text-align: left">用户名</div>
                  <el-input v-model="form_add.username" style="width: 300px" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="" prop="password"><div style="text-align: left">密码</div>
                  <el-input v-model="form_add.password" type="password" style="width: 300px" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="" prop="work"><div style="text-align: left">工作单位</div>
                  <el-input v-model="form_add.work" style="width: 300px" placeholder="请输入工作单位" />
                </el-form-item>
                <el-form-item label="" prop="title"><div style="text-align: left">职称</div>
                  <el-input v-model="form_add.title" style="width: 300px" placeholder="请输入个人职称" />
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel_add('form_add')">取 消</el-button>
            <el-button type="primary" @click="submit_add('form_add')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormVisible1">
          <div style="font-size: 2em;margin-left: 20px;color: black">修改咨询师<div style="color: #6a6f77;font-size: 15px">修改咨询师个人信息</div></div>
          <el-form label-position="top" label-width="80px" size="medium "  ref="form_change" :model="form_change" :rules="rules_change" inline="true"  style="text-align: center;margin: 20px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="个人信息" name="first">
                <el-form-item label="" prop="true_name"><div style="text-align: left">姓名</div>
                  <el-input v-model="form_change.trueName" style="width: 300px" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="" prop="gender"><div style="text-align: left">性别</div>
                  <el-radio-group v-model="form_change.gender" style="width: 300px;text-align: left">
                    <el-radio label="男" />
                    <el-radio label="女" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="age"><div style="text-align: left">年龄</div>
                  <el-input v-model="form_change.age" style="width: 300px" placeholder="请输入年龄" />
                </el-form-item>
                <el-form-item label="" prop="id_number"  ><div style="text-align: left">身份证号码</div>
                  <el-input v-model="form_change.idNumber" style="width: 300px" placeholder="请输入身份证号" />
                </el-form-item>
                <el-form-item label="" prop="phone" ><div style="text-align: left">电话</div>
                  <el-input v-model="form_change.phone" style="width: 300px" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item label="" prop="email" ><div style="text-align: left">邮箱</div>
                  <el-input v-model="form_change.email" style="width: 300px" placeholder="请输入邮箱地址" disabled="true"/>
                </el-form-item>
                <el-form-item label="" prop="helper"><div style="text-align: left">绑定督导</div>
                  <el-select v-model="form_change.bindID" style="width: 620px" placeholder="请选择督导" multiple  @change="applicantTypes">
                    <el-option v-for="(item, index) in helper_select" :key="index" :label="item.username" :value="item.username"></el-option>
                  </el-select>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="工作信息" name="second">
                <el-form-item label="" prop="username"><div style="text-align: left">用户名</div>
                  <el-input v-model="form_change.username" style="width: 300px" placeholder="请输入用户名" disabled="true"/>
                </el-form-item>
                <el-form-item label="" prop="password"><div style="text-align: left">密码</div>
                  <el-input v-model="form_change.password" type="password" style="width: 300px" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="" prop="work"><div style="text-align: left">工作单位</div>
                  <el-input v-model="form_change.work" style="width: 300px" placeholder="请输入工作单位" />
                </el-form-item>
                <el-form-item label="" prop="title"><div style="text-align: left">职称</div>
                  <el-input v-model="form_change.title" style="width: 300px" placeholder="请输入个人职称" />
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1=false">取 消</el-button>
            <el-button type="primary" @click="submit_change('form_change')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormVisible2">
          <div style="font-size: 2em;margin-left: 20px;color: black">详情信息</div>
          <div style="margin-top: 20px;margin-left: 20px;font-size: 1.5em;line-height: 2em">
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">姓名:    {{form_detail.trueName}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">性别: {{form_detail.gender}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">年龄: {{form_detail.age}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">身份证号码: {{form_detail.idNumber}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">手机号码: {{form_detail.phone}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">邮箱: {{form_detail.email}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">用户名: {{form_detail.username}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">密码: {{form_detail.password}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">工作单位: {{form_detail.work}}</div>
            <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">职称: {{form_detail.title}}</div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible2=false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormVisible3">
          <div style="font-size: 2em;margin-left: 20px;color: black">修改排班表</div>
          <div>
            <div style="margin-left: 20px;font-size: 15px;margin: 30px">请选择排班日期</div>
            <el-checkbox-group v-model="schedule_week">
              <el-checkbox-button style="margin-left: 20px;border: 0.1px solid grey"  v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3=false">取 消</el-button>
            <el-button type="primary" @click="update_schedule">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData.slice((dictCurrentPage-1)*dictPageSize,dictCurrentPage*dictPageSize)" style="overflow:auto;width:100%;" height="90%" :header-cell-style="headClass">
        <!--      <el-table-column prop="id" label="编号" width="100px" />-->
        <el-table-column prop="trueName" label="姓名" width="120px" fixed />
        <el-table-column prop="gender" label="性别" width="50px"/>
        <el-table-column prop="bindID" label="绑定督导"  align="center" />
        <el-table-column prop="workingTimes" label="总咨询数" width="120px" align="center"/>
        <el-table-column prop="totalTime" label="咨询时长" width="100px"/>
        <el-table-column prop="level" label="平均咨询等级" :formatter="stateFormat" width="120px"/>
        <el-table-column prop="schedule" label="周值班安排" align="center"/>
        <el-table-column header-align="center" align="center" prop="operate" label="操作" width="330px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="small"
              style="background-color: #b1c0d0"
              @click="detail(scope.row)"
            >查看详情
            </el-button>
            <el-button
              size="small"
              style="background-color: #b1c0d0"
              @click="change_consultant(scope.row)"
            >修改
            </el-button>
            <el-button
              size="small"
              style="background-color: #b1c0d0"
              @click="change_schedule(scope.row)"
            >修改排班
            </el-button>
            <el-button
              size="small"
              style="background-color: #b1c0d0"
              @click="delete_consultant(scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        layout="sizes, prev, pager, next, total"
        :current-page.sync="dictCurrentPage"
        :total="dictTotal"
        background
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="dictPageSize"
      />
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data() {
    var validateTrue_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }else{
        if(value.length<2||value.length>32){
          callback(new Error("长度限制为2~32个字符"))
        }else {
          if (!this.checkSpecialKey(value)) {
            callback(new Error("不能含有特殊字符！！"));
          } else {
            callback();
          }
        }
      }
    };
    let validateGender = (rule, value, callback) => {
      if(!value){
        callback(new Error("请选择性别"))
      }else {
          callback();
      }
    }
    let validateAge = (rule, value, callback) => {
      if(!value){
        callback(new Error("年龄不能为空"))
      }else {
        let regular = /^[+]{0,1}(\d+)$/
        if (regular.test(value)) {
          callback();
        } else {
          callback(new Error("请输入大于等于0的正整数"));
        }
      }
    }
    let validateHelper = (rule, value, callback) => {
      if(!value){
        callback(new Error("请选择绑定的督导"))
      }else {
        callback();
      }
    }
    let validatePhone = (rule, value, callback) => {
      if(!value){
        callback(new Error("手机号不能为空"))
      }else {
        if (/^1[34578]\d{9}$/.test(value) == false) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    }
    let validateIDnumber = (rule, value, callback) => {
      if(!value){
        callback(new Error("身份证不能为空"))
      }else {
        let regular = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/;
        if (regular.test(value)) {
          callback();
        } else {
          callback(new Error('请填写正确的身份证号码'));
        }
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'));
      } else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }else{
        let regular =  /^[a-zA-Z0-9_]/
        if (regular.test(value)) {
          callback();
        } else {
          callback(new Error("用户名只包含英文字母和下划线"));
        }
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }else{
        if (value.length < 6) {
          return callback(new Error('输入密码不小于6位'));
        }else {
            callback();
          }
      }
    };
    var validateWork = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工作单位不能为空'));
      }else{
        callback();
      }
    };
    var validateTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职称不能为空'));
      }else{
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form_add: {
        true_name: '',
        gender:'',
        age:'',
        id_number:'',
        phone:'',
        email:'',
        helper:'',
        username:'',
        password:'',
        work:'',
        title:''
      },
      form_change: {
        trueName: '',
        gender:'',
        age:'',
        idNumber:'',
        phone:'',
        email:'',
        username:'',
        password:'',
        work:'',
        title:'',
        qualification:'',
        qualificationId:'',
        bindID:'',
        available:'',
        id:'',
        state:'',
        level:'',
        schedule:'',
        role:'',
        workingTimes:'',
        totalTime:''
      },
      form_schedule: {
        trueName: '',
        gender:'',
        age:'',
        idNumber:'',
        phone:'',
        email:'',
        username:'',
        password:'',
        work:'',
        title:'',
        qualification:'',
        qualificationId:'',
        bindID:'',
        available:'',
        id:'',
        state:'',
        level:'',
        schedule:'',
        role:'',
        workingTimes:'',
        totalTime:''
      },
      schedule_week:[],
      weeks:['周一','周二','周三','周四','周五','周六','周日'],
      form_detail: {
        trueName: '',
        gender:'',
        age:'',
        idNumber:'',
        phone:'',
        email:'',
        helper:'',
        username:'',
        password:'',
        work:'',
        title:''
      },
      rules_add: {
        true_name: [
          {validator: validateTrue_name, trigger:'blur'}
        ],
        gender: [
          {validator: validateGender, trigger:'blur'}
        ],
        age: [
          {validator: validateAge, trigger:'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger:'blur'}
        ],
        id_number: [
          {validator: validateIDnumber, trigger:'blur'}
        ],
        email: [
          {validator: validateEmail, trigger:'blur'}
        ],
        helper: [
          {validator: validateHelper, trigger:'blur'}
        ],
        username: [
          {validator: validateUsername, trigger:'blur'}
        ],
        password: [
          {validator: validatePassword, trigger:'blur'}
        ],
        work: [
          {validator: validateWork, trigger:'blur'}
        ],
        title: [
          {validator: validateTitle, trigger:'blur'}
        ]
      },
      rules_change: {
        trueName: [
          {validator: validateTrue_name, trigger:'blur'}
        ],
        gender: [
          {validator: validateGender, trigger:'blur'}
        ],
        age: [
          {validator: validateAge, trigger:'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger:'blur'}
        ],
        idNumber: [
          {validator: validateIDnumber, trigger:'blur'}
        ],
        email: [
          {validator: validateEmail, trigger:'blur'}
        ],
        bindID: [
          {validator: validateHelper, trigger:'blur'}
        ],
        username: [
          {validator: validateUsername, trigger:'blur'}
        ],
        password: [
          {validator: validatePassword, trigger:'blur'}
        ],
        work: [
          {validator: validateWork, trigger:'blur'}
        ],
        title: [
          {validator: validateTitle, trigger:'blur'}
        ]
      },
      activeName: 'first',
      dictTotal: 0,
      dictCurrentPage: 1,
      dictPageSize: 10,
      tableData: [],
      helper_select:[]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    checkSpecialKey(str) {
      var specialKey = "\\;!@#$%^&*()";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    },
    initData() {
      // this.dictTotal = this.tableData.length
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "role": 1,
        })
      }).then(res => {
        // console.log(res.data.data);
        this.dictTotal = res.data.data.length;
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
    },
    add_consultant(formName){
      this.dialogFormVisible=true
      this.getValues()
      this.$refs[formName].resetFields()
    },
    change_consultant(row){
      this.dialogFormVisible1=true
      this.form_change=row
      // console.log(row)
      this.getValues();
      var temp=this.form_change.bindID
      if(temp===' '||temp===null||temp===''){
        this.form_change.bindID=[]
      }else{
        this.form_change.bindID = temp.split(",")
      }
      console.log(this.form_change)
    },
    //获取督导列表
    getValues(){
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "role": 2,
        })
      }).then(res => {
        // console.log("c")
        console.log(res.data.data);
        this.helper_select= res.data.data
      }).catch(err => {
        console.log(err.data)
      });
    },
    //添加咨询师
    submit_add(formName) {
      // console.log("c")
      console.log(this.form_add)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: "/admin/saveWorker",
            method: "post",
            crossdomain: true,
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
              "username": this.form_add.username,
              "role": 1,
              "trueName": this.form_add.true_name,
              "gender":this.form_add.gender,
              "age":this.form_add.age,
              "idNumber":this.form_add.id_number,
              "phone":this.form_add.phone,
              "email":this.form_add.email,
              "bindID":this.form_add.helper.toString(),
              "password":this.form_add.password,
              "work":this.form_add.work,
              "title":this.form_add.title,
              "available":2
            })
          }).then(res => {
            console.log(res);
            alert("添加成功")
            this.dialogFormVisible=false
            this.initData();
          }).catch(err => {
            console.log(err.data)
          });
        } else {
          alert('请输入完整的信息')
          return false
        }
      })
    },
    change_schedule(row) {
      this.dialogFormVisible3=true
      this.form_schedule=row
      var temp=this.form_schedule.schedule
      if(temp===' '||temp===null||temp===''){
        this.schedule_week=[]
      }else{
        this.schedule_week = temp.split(",")
      }
      console.log(this.schedule_week)
      console.log(row)
    },
    update_schedule() {
      // var formName=row
      console.log(this.form_schedule)
      console.log(this.schedule_week.toString())
      this.$http({
        url: "/admin/updateWorker",
        method: "post",
        crossdomain: true,
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          "username": this.form_schedule.username,
          "role": this.form_schedule.role,
          "trueName": this.form_schedule.trueName,
          "gender":this.form_schedule.gender,
          "age":this.form_schedule.age,
          "idNumber":this.form_schedule.idNumber,
          "phone":this.form_schedule.phone,
          "email":this.form_schedule.email,
          "password":this.form_schedule.password,
          "work":this.form_schedule.work,
          "title":this.form_schedule.title,
          "qualification":this.form_schedule.qualification,
          "qualificationId":this.form_schedule.qualificationId,
          "bindID":this.form_schedule.bindID,
          "available":this.form_schedule.available,
          "id":this.form_schedule.id,
          "state":this.form_schedule.state,
          "level":this.form_schedule.level,
          "schedule":this.schedule_week.toString(","),
          "workingTimes":this.form_schedule.workingTimes,
          "totalTime":this.form_schedule.totalTime
        })
      }).then(res => {
        this.dialogFormVisible3=false
        alert("修改成功")
        this.initData();
      }).catch(err => {
        console.log(err.data)
      });
    },
    //修改咨询师
    submit_change(formName) {
      console.log(this.form_change)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: "/admin/updateWorker",
            method: "post",
            crossdomain: true,
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
              "username": this.form_change.username,
              "role": this.form_change.role,
              "trueName": this.form_change.trueName,
              "gender":this.form_change.gender,
              "age":this.form_change.age,
              "idNumber":this.form_change.idNumber,
              "phone":this.form_change.phone,
              "email":this.form_change.email,
              "password":this.form_change.password,
              "work":this.form_change.work,
              "title":this.form_change.title,
              "qualification":this.form_change.qualification,
              "qualificationId":this.form_change.qualificationId,
              "bindID":this.form_change.bindID.toString(),
              "available":this.form_change.available,
              "id":this.form_change.id,
              "state":this.form_change.state,
              "level":this.form_change.level,
              "schedule":this.form_change.schedule,
              "workingTimes":this.form_change.workingTimes,
              "totalTime":this.form_change.totalTime
            })
          }).then(res => {
            console.log(res);
            alert("修改成功")
            this.dialogFormVisible1=false
            this.initData();
          }).catch(err => {
            console.log(err.data)
          });
        } else {
          alert('请输入完整的信息')
          return false
        }
      })
    },

    //取消添加咨询师
    cancel_add(formName) {
      this.dialogFormVisible=false
      this.$refs[formName].resetFields()
    },
    detail(row) {
      this.dialogFormVisible2=true
      this.form_detail=row
    },
    //删除咨询师
    delete_consultant(row) {
      console.log(row)
        this.$http({
          url: "/admin/deleteWorker",
          method: "post",
          crossdomain: true,
          body:JSON.stringify({
            "id": row.id,
          })
        }).then(res => {
          this.initData()
        }).catch(err => {
          console.log(err.data)
        });
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    stateFormat(row, column) {
      if (row.level === 0) {
        return ''
      } else if (row.level === 1) {
        return '⭐'
      }else if (row.level === 2) {
        return '⭐⭐'
      } else if (row.level === 3) {
        return '⭐⭐⭐'
      }else if (row.level === 4) {
        return '⭐⭐⭐⭐'
      } else {
        return '⭐⭐⭐⭐⭐'
      }
    },
    async getTrueID(id){
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body: JSON.stringify({
          "id": id
        })
      }).then(res => {
        console.log("c")
        console.log(res.data.data[0].trueName);
        return  res.data.data[0].trueName
      }).catch(err => {
        console.log(err.data)
      });
    },
    // 设置表头颜色
    headClass() {
      return 'background:#e1e9f4;'
    },
    // 实时监听查询内容，更新列表
    onChange(e) {
      const { value } = e.target
      console.log('检测到变化' + value)
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "trueName": value,
          "role":1
        })
      }).then(res => {
        console.log(res.data.data);
        this.dictTotal = res.data.data.length;
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
    },
    applicantTypes(value){
      console.log(this.helper_select)
      this.helper_select.forEach(item => {
        if(item.id===value){
          console.log(item)
          this.form_change.bindID = item.label
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="text"],#btn1,#btn2{
  box-sizing: border-box;
  text-align:left;
  font-size:1em;
  height:2.5em;
  border-radius:4px;
  border:1px solid #c8cccf;
  color:#6a6f77;
  -web-kit-appearance:none;
  -moz-appearance: none;
  display:block;
  outline:0;
  padding:0 1em;
  text-decoration:none;
  width:20%;
}
input[type="text"]:focus{
  border:1px solid #5498e5;
}
.page {
  height: 95%;
  position: relative;
  margin-top: 20px;
  .search{
    margin-left: 1%;
    text-align: left;
    .item{
      position: relative;
      margin-top: 10px;
      margin-bottom: 10px;
      .button{
        position: relative;
        left: 91%
      }
    }
  }
  .table{
    width: 98%;
    margin: 0 auto;
    height: 88%;
    .fy {
      height: 10%;
      position: absolute;
      margin-top: 20px;
      right: 10px;
    }
  }
}
</style>
