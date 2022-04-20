<template>
  <div class="page">
    <div class="left">
      <el-calendar v-model="value" class="calender"
                   :first-day-of-week="7"
      >
        <template slot="dateCell" slot-scope="{date, data}">
          <div @click="allcalendar(data)">
            <p style="text-align: left;margin: 0px">{{ data.day.split('-').slice(2).join('-') }}</p>
            <p style="font-size: 10px;margin: 0px;line-height: 20px">
              {{my_date_consultant(data.day)}}<br>
              {{my_date_helper(data.day)}}
            </p>
          </div>
        </template>
      </el-calendar>
    </div>
    <div class="right">
      <div class="time_now">
        {{ this.yearMD }}
      </div>
      <div class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="咨询师" name="first">
            <div class="table-1">
                <el-table
                  :data="tableConsultant"
                  :row-style="{height:'50px'}"
                  :cell-style="{padding:'0px'}"
                  :show-header="false"
                >
                  <el-table-column
                    prop="trueName"
                    width=""
                    align="center"
                  />
                  <el-table-column
                    prop="gender"
                    width=""
                    align="center"
                  />
                </el-table>
            </div>

          </el-tab-pane>
          <el-tab-pane label="督导" name="second">
            <div class="table-2">
              <el-table
                :data="tableHelper"
                :row-style="{height:'50px'}"
                :cell-style="{padding:'0px'}"
                :show-header="false"
              >
                <el-table-column
                  prop="trueName"
                  width=""
                  align="center"
                />
                <el-table-column
                  prop="gender"
                  width=""
                  align="center"
                />
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Schedule',
  components: {
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      value: new Date(),
      yearMD: '',
      scheduleData: [
        {"date":"周一","consultant":"","helper":"","consultant_list":[],"helper_list":[]},
        {"date":"周二","consultant":"","helper":"","consultant_list":[],"helper_list":[]},
        {"date":"周三","consultant":"","helper":"","consultant_list":[],"helper_list":[]},
        {"date":"周四","consultant":"","helper":"","consultant_list":[],"helper_list":[]},
        {"date":"周五","consultant":"","helper":"","consultant_list":[],"helper_list":[]},
        {"date":"周六","consultant":"","helper":"","consultant_list":[],"helper_list":[]},
        {"date":"周日","consultant":"","helper":"","consultant_list":[],"helper_list":[]},],
      activeName: 'first',
      tableConsultant: [
      ],
      tableHelper: [
      ],
      consultant_select:[],
      helper_select:[],
      consultant:'',
      helper:'',
      week_naw:''
    }
  },
  mounted() {
    this.getDateFunc()
  },
  methods: {
    my_date_consultant(v) {
      var week=new Date(v).getDay();
      var weekString=''
      switch (week){
        case 0:
          weekString="周日"
          break
        case 1:
          weekString="周一"
          break
        case 2:
          weekString="周二"
          break
        case 3:
          weekString="周三"
          break
        case 4:
          weekString="周四"
          break
        case 5:
          weekString="周五"
          break
        case 6:
          weekString="周六"
          break
        default:
          break
      }
      let len = this.scheduleData.length
      let res = ""
      for(let i=0; i<len; i++){
        if(this.scheduleData[i].date == weekString) {
          this.$http({
            url: "/admin/getWorkerList",
            method: "post",
            crossdomain: true,
            body:JSON.stringify({
              "schedule": weekString,
              "role":1
            })
          }).then(res => {
            // console.log(res.data);
            this.scheduleData[i].consultant_list = res.data.data;
            this.scheduleData[i].consultant="咨询师："+res.data.data.length;
            // console.log(this.scheduleData)
          }).catch(err => {
            console.log(err.data)
          });
          res = this.scheduleData[i].consultant
          break
        }
      }
      return res
    },
    my_date_helper(v) {
      var week=new Date(v).getDay();
      var weekString=''
      switch (week){
        case 0:
          weekString="周日"
          break
        case 1:
          weekString="周一"
          break
        case 2:
          weekString="周二"
          break
        case 3:
          weekString="周三"
          break
        case 4:
          weekString="周四"
          break
        case 5:
          weekString="周五"
          break
        case 6:
          weekString="周六"
          break
        default:
          break
      }
      let len = this.scheduleData.length
      let res = ""
      for(let i=0; i<len; i++){
        if(this.scheduleData[i].date == weekString) {
          this.$http({
            url: "/admin/getWorkerList",
            method: "post",
            crossdomain: true,
            body:JSON.stringify({
              "schedule": weekString,
              "role":2
            })
          }).then(res => {
            // console.log(res.data);
            this.scheduleData[i].helper_list = res.data.data;
            this.scheduleData[i].helper="督导："+res.data.data.length;
            // console.log(this.scheduleData)
          }).catch(err => {
            console.log(err.data)
          });
          res = this.scheduleData[i].helper
          break
        }
      }
      return res
    },
    getDateFunc() {
      // const year = new Date().getFullYear()
      var month = new Date().getMonth() + 1
      var day = new Date().getDate()
      var week = new Date().getDay()
      var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      // console.log(week)
      this.yearMD =
        (month >= 10 ? month : '0' + month) +
        '月' +
        (day >= 10 ? day : '0' + day) +
        '日' +
        weeks[week]
      var weekes = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let len = this.scheduleData.length
      this.week_naw=weekes[week]
      for(let i=0; i<len; i++){
        if(this.scheduleData[i].date == weekes[week]) {
          this.$http({
            url: "/admin/getWorkerList",
            method: "post",
            crossdomain: true,
            body:JSON.stringify({
              "schedule": weekes[week],
              "role":1
            })
          }).then(res => {
            // console.log(res.data);
            this.tableConsultant=res.data.data
          }).catch(err => {
            console.log(err.data)
          });
          this.$http({
            url: "/admin/getWorkerList",
            method: "post",
            crossdomain: true,
            body:JSON.stringify({
              "schedule": weekes[week],
              "role":2
            })
          }).then(res => {
            // console.log(res.data);
            this.tableHelper=res.data.data
          }).catch(err => {
            console.log(err.data)
          });
          // console.log("d")
          // console.log(this.tableHelper)
        }
      }
    },
    getDateFunc_upDate(data) {
      // const year = new Date(data).getFullYear()
      var month = new Date(data).getMonth() + 1
      var day = new Date(data).getDate()
      var week = new Date(data).getDay()
      var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      // console.log(week)
      this.yearMD =
        (month >= 10 ? month : '0' + month) +
        '月' +
        (day >= 10 ? day : '0' + day) +
        '日' +
        weeks[week]
      var weekes = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let len = this.scheduleData.length
      for(let i=0; i<len; i++){
        if(this.scheduleData[i].date == weekes[week]) {
          this.tableConsultant=this.scheduleData[i].consultant_list
          this.tableHelper=this.scheduleData[i].helper_list
        }
      }
    },
    allcalendar(data) {
      // this.dialogFormVisible=true
      this.getDateFunc_upDate(data.day)
      var week = new Date(data.day).getDay()
      var weekes = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      this.week_naw=weekes[week]
      console.log(this.week_naw)

    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    move(row){
        console.log(row)
    },
    add_consultant() {
      console.log("d1")
      console.log(this.week_naw)
      this.dialogFormVisible1=true;
      this.$http({
        url: "/admin/getNotTodayWorker",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "schedule": this.week_naw,
          "role":"0"
        })
      }).then(res => {
        console.log(res.data.data)
        this.consultant_select=res.data.data
      }).catch(err => {
        console.log(err.data)
      });
    },
    commit_consultant(){
      console.log(this.consultant)
      this.$http({
        url: "/admin/getWorker",
        method: "post",
        crossdomain: true,
        body:JSON.stringify({
          "id":this.consultant
        })
      }).then(res => {
        console.log(res.data.data)
        var temp=res.data.data
        this.$http({
          url: "/admin/updateWorker",
          method: "post",
          crossdomain: true,
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({
            "username": temp.username,
            "role": temp.role,
            "trueName": temp.trueName,
            "gender":temp.gender,
            "age":temp.age,
            "idNumber":temp.idNumber,
            "phone":temp.phone,
            "email":temp.email,
            "password":temp.password,
            "work":temp.work,
            "title":temp.title,
            "qualification":temp.qualification,
            "qualificationId":temp.qualificationId,
            // "consultant":this.form_change.consultant,
            "bindID":temp.bindID,
            "available":temp.available,
            "id":temp.id,
            "state":temp.state,
            "level":temp.level,
            "schedule":temp.schedule+","+this.week_naw
          })
        }).then(res => {
          this.dialogFormVisible3=false
          alert("修改成功")
          this.initData();
        }).catch(err => {
          console.log(err.data)
        });
      }).catch(err => {
        console.log(err.data)
      });
    }

  },

}
</script>

<style lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
.page{
  position: relative;
  width: 100%;
  height: 96%;
  text-align: center;
  .left{
    width: 76%;
    position: absolute;
    left: 20px;
    top: 20px;
    height: 97%;
    overflow: auto;
    .calender{
      width: 100%;
      height: 100%;
      font-size: 20px;
    }
  }
  .right{
    position: absolute;
    background-color: white;
    width: 20%;
    right: 0px;
    top: 20px;
    height: 97%;
    overflow: auto;
    .time_now{
      width: 100%;
      font-size: 1.5em;
      padding: 20px;
      border-bottom: rgba(0,0,0,0.2) 1px solid;
    }
    .table{
      overflow: auto;
      text-align: center;
      .el-tabs__item{
        font-size:20px !important;
        padding: 10px;
        padding-left: 60px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }
}

</style>
