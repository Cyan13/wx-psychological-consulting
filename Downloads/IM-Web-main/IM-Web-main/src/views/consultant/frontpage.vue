<template>
  <div class="page">
    <div class="div-1">
      <div class="left">
        <div class="des">
          <div style="width: 28%;height: 49%;position: absolute;left: 0;text-align: center;color: grey">
            <div style="width: 100%;height: 100%;background-color: white">
              <el-avatar style="width: 80px;height: 80px;margin-top: 5px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <div style="margin-top: 5px">咨询师</div>
              <div style="margin-top: 5px">{{ information.trueName }}</div>
              <div style="margin-top: 5px">{{ information.age }}岁</div>
              <div v-if="information.level<0" style="margin-top: 5px"></div>
              <div v-if="information.level<1||information.level==1" style="margin-top: 5px">⭐</div>
              <div v-if="information.level>1&&information.level<2||information.level==2" style="margin-top: 5px">⭐⭐</div>
              <div v-if="information.level>2&&information.level<3||information.level==3" style="margin-top: 5px">⭐⭐⭐</div>
              <div v-if="information.level>3&&information.level<4||information.level==4" style="margin-top: 5px">⭐⭐⭐⭐</div>
              <div v-if="information.level>4&&information.level<5||information.level==5" style="margin-top: 5px">⭐⭐⭐⭐⭐</div>

            </div>
          </div>
          <div style="width: 25%;height: 49%;position: absolute;left: 30%;text-align: center;color: grey;background-color: white">
            <div style="margin-top: 60px">总咨询数<div style="font-size: 3em;margin-top: 20px;color: #445974;">{{ information.workingTimes }}</div>
            </div>
          </div>
          <div style="width: 45%;height: 49%;position: absolute;right: 0;text-align: center;color: grey;background-color: white">
            <div style="margin-top: 60px">总咨询时长<div style="font-size: 3em;margin-top: 20px;color: #445974;border-left: 1px solid grey">{{ information.totalTime }}</div>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="left" style="width: 68%;position: absolute">
            <div style="float:left;width: 30%;font-size: 17px;height: 30px;margin-top: 10px;margin-left: 10px;color: #2b2f3a">咨询师</div>
            <div style="text-align: right;font-size: 30px;margin-top: 5px">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentpage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
            <div>
              <el-row :gutter="24">
                <el-col :span="8" v-for="(item, index) in pageTicket" :key="item" style="border:1px solid #c8cccf;">
                  <div style="height:33px;display: inline-block;width: 100%;margin-top: 10px;font-size: 18px;line-height: 34px;">
                    <div style="display: inline-block;width: 60%;margin-left: 10px;color: grey">{{ item.trueName }}</div>
                    <div v-if="item.available==1" style="display: inline-block;width: 30%;height:80%;background-color: #a3e0a3;text-align: center;color: white">在线</div>
                    <div v-if="item.available==2" style="display: inline-block;width: 30%;height:80%;background-color: #c1bebe;text-align: center;color: white">下线</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="width: 30%;height: 50%;background-color: #404e5e;position: absolute;right: 0px;text-align: center;color: white;padding-top: 10%">
            <div style="font-size: 20px;">在线咨询师</div>
            <div style="font-size: 55px;margin-top: 20px">{{all_consultant_online}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <el-calendar v-model="value" class="calender"
                     :first-day-of-week="7"
        >
          <template slot="dateCell" slot-scope="{date, data}">
            <div>
              <p style="text-align: left;margin: 0px">{{ data.day.split('-').slice(2).join('-') }}</p>
              <p v-if="my_day(data.day)=='班'" style="font-size: 10px;margin-left: 20px;line-height: 20px;color: red">
                班<br>
              </p>
              <p v-if="my_day(data.day)=='休'" style="font-size: 10px;margin-left: 20px;line-height: 20px;color: #6363ea">
                休<br>
              </p>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
    <div class="div-2">
      <div style="border-left: 1px solid grey">
        <div style="position: absolute;left: 0px;margin-left: 15px;margin-top: 10px">咨询记录</div>
        <div style="right: 0px;position: absolute;margin-right: 15px;margin-top: 10px;color: #0086b3;cursor: pointer" @click="goDetail">查看更多</div>
      </div>
      <div class="table" style="position: absolute;margin-top: 30px;width: 100%;height: 90%">
        <el-table :data="tableData.slice((dictCurrentPage-1)*dictPageSize,dictCurrentPage*dictPageSize)" style="overflow:auto;width:100%;" height="90%" :header-cell-style="headClass">
          <el-table-column prop="customerTrueName" label="访客" fixed />
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="startTime" label="开始时间" />
          <el-table-column prop="endTime" label="结束时间" />
          <el-table-column prop="helperTrueName" label="求助督导" />
          <el-table-column prop="level" label="平均咨询等级" :formatter="stateFormat"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      information:{},
      value: new Date(),
      isToday:false,
      all_consultant_online:'',
      consultant_number: '35',
      consultant_time: '60:30:23',
      total:0,  //总数据条数
      currentpage:1,  //当前所在页默认是第一页
      pagesize:12,  //每页显示多少行数据 默认设置为10
      ticket:[],  //这里是从后端获取的所有数据
      pageTicket:[],//分页后的当前页数据
      tableData: [],
      dictTotal: 0,
      dictCurrentPage: 1,
      dictPageSize: 5,
    }
  },
  mounted() {
    this.initData()
    this.getConsultantList()
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$http({
        url: '/admin/getWorkerList',
        method: 'post',
        crossdomain: true,
        body:JSON.stringify({
          'id': this.$store1.state.userid,
        })
      }).then(res => {
        console.log('ces')
        console.log(res.data.data)
        this.information=res.data.data[0]
      }).catch(err => {
        console.log(err.data)
      })
      this.$http({
        url: '/record/getRecordList',
        method: 'post',
        crossdomain: true,
        body:JSON.stringify({
          // "role": 0,
          'consultantID': this.$store1.state.userid,

        })
      }).then(res => {
        console.log(res.data.data)
        this.dictTotal = res.data.data.length
        this.tableData=res.data.data
      }).catch(err => {
        console.log(err.data)
      })
    },
    my_day(v) {
      var week=new Date(v).getDay()
      var weekString=''
      switch (week) {
        case 0:
          weekString='周日'
          break
        case 1:
          weekString='周一'
          break
        case 2:
          weekString='周二'
          break
        case 3:
          weekString='周三'
          break
        case 4:
          weekString='周四'
          break
        case 5:
          weekString='周五'
          break
        case 6:
          weekString='周六'
          break
        default:
          break
      }
      console.log('d')
      var temp=this.$store1.state.schedule
      console.log(temp)
      var reg = new RegExp(weekString)
      //如果字符串中不包含目标字符会返回-1
      if(temp.match(reg)) {
        console.log('zhenggque')
        this.isToday=true
        return '班'
      }else {
        this.isToday=false
        return '休'
      }
    },

    getConsultantList() {
      this.$http({
        url: '/admin/getWorkerList',
        method: 'post',
        crossdomain: true,
        body:JSON.stringify({
          'role': 1,
        })
      }).then(res => {
        console.log(this.$store1.state.userid)
        console.log(res.data.data)
        this.total = res.data.data.length
        this.ticket=res.data.data
        var count=0
        for(let i=0;i<this.total;i++) {
          if(this.ticket[i].available==1) {
            count++
          }
        }
        this.all_consultant_online=count
        this.getPageInfo()
      }).catch(err => {
        console.log(err.data)
      })
    },
    getPageInfo() {
      //清空pageTicket中的数据
      this.pageTicket=[]
      // 获取当前页的数据
      for(let i=(this.currentpage-1)*this.pagesize;i<this.total;i++) {
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.ticket[i])
        //判断是否达到一页的要求
        if(this.pageTicket.length===this.pagesize) break
      }
    },
    goDetail() {
      this.$router.replace('/consultant/record')
    },
    handleSizeChange(size) {
      //修改当前每页的数据行数
      this.pagesize=size
      //数据重新分页
      this.getPageInfo()
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage=pageNumber
      //数据重新分页
      this.getPageInfo()
    },
    stateFormat(row, column) {
      if (row.level == 0) {
        return ''
      } else if (row.level < 1||row.level==1) {
        return '⭐'
      }else if (row.level < 2||row.level==2) {
        return '⭐⭐'
      } else if (row.level < 3||row.level==3) {
        return '⭐⭐⭐'
      }else if (row.level < 4||row.level==4) {
        return '⭐⭐⭐⭐'
      } else if(row.level<5||row.level==5) {
        return '⭐⭐⭐⭐⭐'
      }
    },
  }
}
</script>

<style scoped lang="scss">
.page{
  height: 96%;
  margin: 1%;
  .div-1{
    position: relative;
    width: 100%;
    height: 70%;
    .left{
      position: absolute;
      width: 60%;
      height: 90%;
      margin-top: 0.8%;
      overflow: hidden;
      .des{
        //position: absolute;
        height: 49%;
        width: 100%;
      }
      .list{
        //position: absolute;
        margin-top: 1%;
        width: 100%;
        height: 60%;
        background-color: white;
        overflow: hidden;
      }
    }
    .right{
      position: absolute;
      background-color: white;
      right: 0;
      width: 39%;
      height: 90%;
      margin-top: 0.8%;
      overflow: auto;
      .calender{
        width: 100%;
        height: 100%;
        font-size: 20px;
      }
    }
  }
  .div-2{
    position: relative;
    width: 100%;
    height: 30%;
    background-color: white;
  }
}
</style>
