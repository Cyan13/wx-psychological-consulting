<template>
  <div class="page">
    <div class="div-1">
      <div class="des">
        <div style="width: 45%;height: 100%;position: absolute;left: 0;text-align: center;margin-top: 40px;color: grey">今日咨询数<div style="font-size: 4em;margin-top: 20px;color: #445974;">{{ this.consultant_number }}</div></div>
        <div style="width: 55%;height: 100%;position: absolute;right: 0;text-align: center;margin-top: 40px;color: grey">今日咨询时长<div style="font-size: 4em;margin-top: 20px;color: #445974;border-left: 1px solid grey">{{ this.consultant_time }}</div></div>
      </div>
      <div class="chart">
        <div style="color: grey;margin: 10px">今日咨询数据变化</div>
        <div id="myChart" style="height: 85%;width: 100%;color: grey" />
      </div>
    </div>
    <div class="div-2">
      <div class="left">
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
                <div style="height:34px;display: inline-block;width: 100%;margin-top: 10px;font-size: 18px;line-height: 34px;">
                  <div style="display: inline-block;width: 60%;margin-left: 10px;color: grey">{{ item.trueName }}</div>
                  <div v-if="item.available==1" style="display: inline-block;width: 30%;height:80%;background-color: #a3e0a3;text-align: center;color: white">在线</div>
                  <div v-if="item.available==2" style="display: inline-block;width: 30%;height:80%;background-color: #c1bebe;text-align: center;color: white">下线</div>
                </div>
              </el-col>
            </el-row>
        </div>
      </div>
      <div class="right">
        <div style="width: 35%;height: 100%;background-color: #404e5e;text-align: center;position: absolute;left: 0px;color: white">
          <div style="font-size: 30px;margin-top: 60px">总督导数</div>
          <div style="font-size: 55px;margin-top: 20px">{{all_helper}}</div>
        </div>
        <div style="width: 30%;height: 100%;position: absolute;left: 35%;overflow-y: auto;overflow-x: hidden ">
          <div>
            <el-row :gutter="24">
              <el-col :span="24" v-for="(item, index) in ticket1" :key="item" style="border:1px solid #c8cccf;">
                <div style="height:34px;display: inline-block;width: 100%;margin-top: 10px;font-size: 18px;line-height: 34px;">
                  <div style="display: inline-block;width: 60%;margin-left: 10px;color: grey">{{ item.trueName }}</div>
                  <div v-if="item.available==1" style="display: inline-block;width: 30%;height:80%;background-color: #a3e0a3;text-align: center;color: white">在线</div>
                  <div v-if="item.available==2" style="display: inline-block;width: 30%;height:80%;background-color: #c1bebe;text-align: center;color: white">下线</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div style="width: 35%;height: 100%;background-color: #404e5e;position: absolute;right: 0px;text-align: center;color: white">
          <div style="font-size: 30px;margin-top: 60px">在线督导</div>
          <div style="font-size: 55px;margin-top: 20px">{{all_helper_online}}</div>
        </div>
      </div>
    </div>
    <div class="div-3">
      <div class="chart">
        <div style="color: grey;margin: 10px">七日咨询数量统计</div>
        <div id="myChart2" style="height: 85%;width: 100%;color: grey" />
      </div>
      <div class="table">
        <div class="table-1">
          <div class="des">
            咨询数量排行
          </div>
          <div class="table-content">
            <el-table
              :data="tableConsultantNumberData"
              stripe
              class="table-data"
              :row-style="{height:'50px'}"
              :cell-style="{padding:'0px'}"
              :show-header="false"
            >
              <el-table-column
                prop="rank"
                width="30px"
              >
              </el-table-column>
              <el-table-column
                prop="consultantTrueName"
                width="190px"
              />
              <el-table-column
                prop="number"
                width=""
              />
            </el-table>
          </div>
        </div>
        <div class="table-2">
          <div class="des">
            好评排行
          </div>
          <div class="table-content">
            <el-table
              :data="tableGoodNumberData"
              stripe
              class="table-data"
              :row-style="{height:'50px'}"
              :cell-style="{padding:'0px'}"
              :show-header="false"
            >
              <el-table-column
                prop="rank"
                width="30px"
              />
              <el-table-column
                prop="consultantTrueName"
                width="110px"
              />
              <el-table-column
                prop="grade"
                width="200px"
                :formatter="stateFormat"
              />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      consultant_number: '',
      consultant_time: '',
      consultant_day_data: [5, 30, 24, 8, 13, 14, 20, 4, 3, 2, 5, 6, 23, 12, 31, 2, 5, 2, 1, 3, 5, 12],
      consultant_week_data_y: [5, 30, 24, 8, 13, 14, 20],
      consultant_week_data_x: [5, 30, 24, 8, 13, 14, 20],
      tableConsultantNumberData: [],
      tableGoodNumberData: [],
      total:0,  //总数据条数
      currentpage:1,  //当前所在页默认是第一页
      pagesize:12,  //每页显示多少行数据 默认设置为10
      ticket:[],  //这里是从后端获取的所有数据
      pageTicket:[],//分页后的当前页数据
      ticket1:[],  //这里是从后端获取的所有数据
      pageTicket1:[],//分页后的当前页数据
      all_helper:'',
      all_helper_online:''
    }
  },
  mounted() {
    this.initData()
    this.Draw()
    this.Draw2()
  },
  methods: {
    initData(){
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "role": 1,
        })
      }).then(res => {
        console.log(res.data.data);
        this.total = res.data.data.length;
        this.ticket=res.data.data
        this.getPageInfo();
      }).catch(err => {
        console.log(err.data)
      });
      this.$http({
        url: "/admin/getWorkerList",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "role": 2,
        })
      }).then(res => {
        console.log(res.data.data);
        this.all_helper = res.data.data.length;
        this.ticket1=res.data.data
        // this.getPageInfo();
        var count=0;
        for(let i=0;i<this.all_helper;i++){
          if(this.ticket1[i].available==1){
            count++
          }
        }
        this.all_helper_online=count
      }).catch(err => {
        console.log(err.data)
      });
      this.$http({
        url: "/admin/getTopGrade",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({

        })
      }).then(res => {
        console.log(res.data.data);
        this.tableGoodNumberData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
      this.$http({
        url: "/admin/getTopNumber",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({

        })
      }).then(res => {
        console.log("sa")
        console.log(res.data.data);
        this.tableConsultantNumberData=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
      this.$http({
        url: "/record/getTodayRecordInfo",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
        })
      }).then(res => {
        console.log("sa")
        console.log(res.data.data);
        this.consultant_number=res.data.data.number
        this.consultant_time=res.data.data.totalTime
      }).catch(err => {
        console.log(err.data)
      });

    },
    getPageInfo(){
      //清空pageTicket中的数据
      this.pageTicket=[];
      // 获取当前页的数据
      for(let i=(this.currentpage-1)*this.pagesize;i<this.total;i++){
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.ticket[i]);
        //判断是否达到一页的要求
        if(this.pageTicket.length===this.pagesize) break;
      }
    },
    handleSizeChange(size){
      //修改当前每页的数据行数
      this.pagesize=size;
      //数据重新分页
      this.getPageInfo();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.currentpage=pageNumber;
      //数据重新分页
      this.getPageInfo()
    },
    stateFormat(row, column) {
      if (row.grade == 0) {
        return ''
      } else if (row.grade < 1||row.grade==1) {
        return '⭐'
      }else if (row.grade < 2||row.grade==2) {
        return '⭐⭐'
      } else if (row.grade < 3||row.grade==3) {
        return '⭐⭐⭐'
      }else if (row.grade < 4||row.grade==4) {
        return '⭐⭐⭐⭐'
      } else if(row.grade<5||row.grade==5){
        return '⭐⭐⭐⭐⭐'
      }
    },
    Draw() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.clear()
      console.log('s')
      myChart.setOption({
        grid: {
          left: '40px',
          right: '4px',
          bottom: '50px',
          // containLabel: true
          height: '120px',
          width: '90%'
        },
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#dbb14e'
                },
                {
                  offset: 1,
                  color: '#cedfae'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.consultant_day_data
          }
        ]
      })
    },
    Draw2() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart2'))
      myChart.clear()
      console.log('s')
      myChart.setOption({
        color: 'green',
        grid: {
          left: '40px',
          right: '4px',
          bottom: '40px',
          // containLabel: true
          height: '140px',
          width: '90%'
        },
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: this.consultant_week_data_x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: this.consultant_week_data_y
          }
        ]
      })
    }
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
    height: 30%;
    .des{
      position: absolute;
      width: 39%;
      height: 90%;
      background-color: white;
      margin-top: 0.8%;
    }
    .chart{
      position: absolute;
      background-color: white;
      right: 0;
      width: 60%;
      height: 90%;
      margin-top: 0.8%;
    }
  }
  .div-2{
    position: relative;
    width: 100%;
    height: 35%;
    .left{
      position: absolute;
      background-color: white;
      width: 45%;
      height: 90%;
      margin-top: 0.8%;
      overflow: hidden
    }
    .right{
      position: absolute;
      width: 54%;
      height: 90%;
      background-color: white;
      margin-top: 0.8%;
      right: 0;
    }
  }
  .div-3{
    position: relative;
    width: 100%;
    height: 35%;
    .chart{
      position: absolute;
      background-color: white;
      width: 50%;
      height: 90%;
      margin-top: 0.8%;
    }
    .table{
      position: absolute;
      width: 49%;
      height: 90%;
      margin-top: 0.8%;
      right: 0;
      .table-1{
        width: 49%;
        background-color: white;
        height: 100%;
        position: absolute;
        box-shadow: 2px 2px 5px #888888;
        padding: 10px;
        .des{
          width: 100%;
          height: 20px;
          background-color: white;
        }
        .table-content{
          height: 90%;
          width: 100%;
          overflow: hidden;
          .table-data{
          }
        }
      }
      .table-2{
        width: 49%;
        background-color: white;
        height: 100%;
        position: absolute;
        right: 0px;
        box-shadow: 2px 2px 5px #888888;
        padding: 10px;
        .des{
          width: 100%;
          height: 20px;
          background-color: white;
        }
        .table-content{
          height: 90%;
          width: 100%;
          overflow: hidden;
          .table-data{
          }
        }
      }
    }
  }

}
</style>
