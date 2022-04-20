<template>
  <div class="page">
    <div class="search">
      搜索名字
      <div class="item">
        <input type="text" style="" placeholder="输入名字进行搜索" @change="onChange"></div>
    </div>
    <div class="table">
      <el-table :data="tableData.slice((dictCurrentPage-1)*dictPageSize,dictCurrentPage*dictPageSize)" style="overflow:auto;width:100%;" height="90%" :header-cell-style="headClass">
        <!--      <el-table-column prop="id" label="编号" width="100px" />-->
        <el-table-column prop="trueName" label="姓名" width="120px" fixed />
        <el-table-column prop="gender" label="性别" width="50px"/>
        <el-table-column prop="registerTime" label="更新时间" width="200px" align="center"/>
        <el-table-column prop="phone" label="手机号码" width="200px"/>
        <el-table-column prop="emergencyName" label="紧急联系人" width="220px"/>
        <el-table-column prop="emergencyNumber" label="紧急联系人电话" align="center"/>
        <el-table-column header-align="center" align="center" prop="operate" label="操作" width="100px" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.available==1||scope.row.available==''"
              size="medium"
              style="background-color: #b1c0d0"
              @click="ban(scope.row)"
            >禁用
            </el-button>
            <el-button
              v-if="scope.row.available==2"
              size="medium"
              style="background-color: #b1c0d0"
              @click="ban(scope.row)"
            >启用
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
export default {
  data() {
    return {
      dictTotal: 0,
      dictCurrentPage: 1,
      dictPageSize: 10,
      tableData: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // this.dictTotal = this.tableData.length
      this.$http({
        url: "/customer/getCustomerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({

        })
      }).then(res => {
        // console.log(res.data.data);
        this.dictTotal = res.data.data.length;
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
    },
    ban(row) {
      var formName=row
      if(formName.available==1||formName.available=='') {
        formName.available = 2
        console.log(formName)
        console.log(formName)
        this.$http({
          url: "/customer/updateCustomer",
          method: "post",
          crossdomain: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formName)
        }).then(res => {
          alert("禁用成功")
          this.initData();
        }).catch(err => {
          console.log(err.data)
        });
      }else if(formName.available==2){
        formName.available = 1
        console.log(formName)
        console.log(formName)
        this.$http({
          url: "/customer/updateCustomer",
          method: "post",
          crossdomain: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formName)
        }).then(res => {
          alert("启用成功")
          this.initData();
        }).catch(err => {
          console.log(err.data)
        });
      }
    },
    stateFormat(row, column) {
      // console.log('ces')
      // if (row.actor === 1) {
      //   return '投稿人'
      // } else if (row.actor === 2) {
      //   return '审稿人'
      // } else {
      //   return '管理员'
      // }
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
        url: "/customer/getCustomerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "trueName": value,
        })
      }).then(res => {
        console.log(res.data.data);
        this.dictTotal = res.data.data.length;
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
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
        margin-top: 10px;
        margin-bottom: 10px;
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
