<template>
  <div class="page">
    <div class="search">
      <div style="display: inline-block;width: 250px">
        搜索名字
        <div class="item">
          <el-input v-model="name" placeholder="请输入内容" @input="seachRecord" />
        </div>
      </div>
      <div style="display: inline-block;margin-left: 30px">
        选择日期
        <div class="item">
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            value-format="“yyyy-MM-dd”"
            @change="seachRecord"
          />
        </div>
      </div>

    </div>
    <el-dialog title="" :visible.sync="dialogFormVisible2">
      <div style="font-size: 2em;margin-left: 20px;color: black">详情信息</div>
      <div style="margin-top: 20px;margin-left: 20px;font-size: 1.5em;line-height: 2em">
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">访客:    {{form_detail.customerTrueName}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">咨询师: {{form_detail.consultantTrueName}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">求助督导: {{form_detail.helperTrueName}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">评分: {{form_detail.level}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">评语: {{form_detail.comment}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">日期: {{form_detail.date}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">开始时间: {{form_detail.startTime}}</div>
        <div style="display: inline-block;width: 50%;border-bottom: 1px solid grey">结束时间: {{form_detail.endTime}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2=false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="table">
      <el-table :data="tableData.slice((dictCurrentPage-1)*dictPageSize,dictCurrentPage*dictPageSize)" style="overflow:auto;width:100%;" height="90%" :header-cell-style="headClass">
        <el-table-column prop="customerTrueName" label="访客" fixed />
        <el-table-column prop="consultantTrueName" label="咨询师" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column prop="helperTrueName" label="求助督导" />
        <el-table-column prop="level" label="平均咨询等级" :formatter="stateFormat" width="120px"/>
        <el-table-column header-align="center" align="center" prop="operate" label="操作" width="200px" fixed="right">
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
              @click="ban(scope.row)"
            >导出记录
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
      dialogFormVisible2:false,
      dictTotal: 0,
      dictCurrentPage: 1,
      dictPageSize: 10,
      name: '',
      time: '',
      tableData: [],
      form_detail: {
        comment: '',
        consultantTrueName:'',
        customerTrueName:'',
        date:'',
        endTime:'',
        helperTrueName:'',
        level:'',
        startTime:''
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // this.dictTotal = this.tableData.length
      this.$http({
        url: "/record/getRecordList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          // "role": 0,
        })
      }).then(res => {
        console.log(res.data.data);
        this.dictTotal = res.data.data.length;
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
    },
    ban(row) {
      // this.$router.push({
      //   path: '/admin/des',
      //   // name: 'mallList',
      //   query: {
      //     parms: row
      //   }
      // })
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
    detail(row) {
      this.dialogFormVisible2=true
      this.form_detail=row
    },
    // 设置表头颜色
    headClass() {
      return 'background:#e1e9f4;'
    },
    // 实时监听查询内容，更新列表
    seachRecord() {
      console.log('检测到变化' + this.name + this.time)
      if(this.time==''||this.time==null){
      this.$http({
        url: "/record/getRecordList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "customerTrueName": this.name,
        })
      }).then(res => {
        console.log(res.data.data);
        this.dictTotal = res.data.data.length;
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
      }else {
        var time_temp=this.time.slice(1,this.time.length-1)+" 00:00:00"
        this.$http({
          url: "/record/getRecordList",
          method: "post",
          crossdomain: true,
          body:JSON.stringify({
            "customerTrueName": this.name,
            "date":time_temp
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
      width: 250px;
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
