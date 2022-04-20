<template>
  <div class="list-container">
    <div class="header-bar">
      <button title="刷新列表" @click="handleRefresh">
        <i class="tim-icon-refresh"></i>
      </button>
      <button v-if="helpVisible && role==1" title="求助督导"  @click="handleAddButtonClick">
        <i class="el-icon-notebook-1"></i>
      </button>
      <button v-if="!helpVisible && role==1" title="结束求助"  @click="handleEndButtonClick">
        <i class="el-icon-notebook-1"></i>
      </button>
    </div>
    <div class="scroll-container">
      <conversation-item
          :conversation="item"
          v-for="item in conversationList"
          :key="item.conversationID"
      />
    </div>
    <el-dialog title="选择求助的督导" :visible.sync="showDialog" width="30%">
      <el-select v-model="userID" placeholder="请选择求助督导">
        <el-option
            v-for="item in helper_list"
            :key="item.id"
            :label="item.trueName"
            :value="item.username">
        </el-option>
      </el-select>
      <!--      <el-input placeholder="请输入用户ID" v-model="userID" @keydown.enter.native="handleConfirm"/>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认结束督导求助？" :visible.sync="endDialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="endDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEnd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ConversationItem from './conversation-item'
import { mapState } from 'vuex'
import {getDate, getFullTime} from '@/utils/date'
export default {
  name: 'ConversationList',
  components: { ConversationItem },
  data() {
    return {
      showDialog: false,
      userID: '',
      isCheckouting: false, // 是否正在切换会话
      timeout: null,
      helper_list: null,
      consultantTrueName: '',
      helperID: '',
      helperTrueName: '',
      startTime: '',
      endTime:'',
      date:'',
      helpVisible: this.$store2.state.helpVisible,
      role: this.$store1.state.role,
      endDialogVisible: false
    }
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation
    })
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
    this.getHelperList()
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleRefresh() {
      this.refreshConversation()()
    },
    refreshConversation() {
      let that = this
      return function () {
        if (!that.timeout) {
          that.timeout = setTimeout(() =>{
            that.timeout = null
            that.tim.getConversationList().then(() => {
              that.$store.commit('showMessage', {
                message: '刷新成功',
                type: 'success'
              })
            })
          }, 1000)
        }
      }
    },
    handleAddButtonClick() {
      this.showDialog = true
    },
    handleEndButtonClick() {
      this.endDialogVisible = true
    },
    getEndTime() {
      var date = new Date()
      this.endTime = getFullTime(date)
    },
    // getConsultantData() {
    //   this.$http({
    //     url: '/admin/getWorkerList',
    //     method: 'post',
    //     crossdomain: true,
    //     body:JSON.stringify({
    //       'username': this.$store1.state.username,
    //     })
    //   }).then(res => {
    //     // console.log(res.data.data[0].trueName)
    //     this.consultantTrueName = res.data.data[0].trueName
    //     this.$store2.commit('setConsultantTrueName',this.consultantTrueName)
    //     // this.$store2.commit('setConsultantTrueName',res.data.data[0].trueName)
    //     // console.log(this.$store2.state.consultantTrueName)
    //   })
    // },
    getHelperData() {
      this.$http({
        url: '/admin/getWorkerList',
        method: 'post',
        crossdomain: true,
        body:JSON.stringify({
          'username': this.$store2.state.helperUserName,
        })
      }).then(res => {
        // console.log(res.data.data[0].trueName)
        this.helperID=res.data.data[0].id
        this.helperTrueName=res.data.data[0].trueName
        this.$store2.commit('setHelperID',this.helperID)
        this.$store2.commit('setHelperTrueName',this.helperTrueName)
        // console.log(this.$store2.state.helperTrueName)
        console.log('getHelperInfo')
      })
    },
    handleConfirm() {
      if (this.userID !== '@TIM#SYSTEM') {
        this.helpVisible = false
        this.$store2.commit('setHelpVisible', false)
        console.log('visible!')
        // console.log(this.$store2.state.helpVisible)
        this.$store2.commit('setHelperUserName',this.userID)//helper1
        console.log(this.$store2.state.helperUserName)
        this.$store
            .dispatch('checkoutConversation', `C2C${this.userID}`)
            .then(() => {
              this.getTime()
              // console.log(this.startTime)
              // console.log(this.$store2.state.helperUserName)
              // this.getConsultantData()
              // this.$store2.commit('setConsultantTrueName',this.consultantTrueName)
              this.getHelperData()
              // this.$store2.commit('setHelperID',this.helperID)
              // this.$store2.commit('setHelperTrueName',this.helperTrueName)
              this.showDialog = false
            }).catch(() => {
          this.$store.commit('showMessage', {
            message: '没有找到该用户',
            type: 'warning'
          })
        })
      } else {
        this.$store.commit('showMessage', {
          message: '没有找到该用户',
          type: 'warning'
        })
      }
      this.userID = ''
    },
    handleEnd() {
      // console.log('getstartTime success')
      // console.log(this.$store2.state.date)
      this.getEndTime()
      this.$store2.commit('setEndTime',this.endTime)

      console.log(this.endTime)
      console.log(this.$store1.state.userid)
      console.log('handleENd')
      console.log(this.$store2.state.helperID)
      this.$http({
        url: '/record/saveRecord',
        method: 'post',
        crossdomain: true,
        headers: {'Content-Type': 'application/json'},
        body: {
          'consultantID': this.$store1.state.userid,
          'helperID': this.$store2.state.helperID,
          'customerTrueName': '',
          'consultantTrueName': this.$store1.state.trueName,
          'helperTrueName': this.$store2.state.helperTrueName,
          'date': this.$store2.state.date+ ' 00:00:00.000000',
          'startTime': this.$store2.state.startTime,
          'endTime': this.$store2.state.endTime,
          'comment': '',
          'historyURL': 'url'
        }
      }).catch(err => {
        console.log(err.data)
      })
      this.endDialogVisible = false
      this.helpVisible = true
      this.$store2.state.helperID=''
      this.$store2.state.customerTrueName=''
      this.$store2.state.helperTrueName=''
      this.$store2.state.startTime=''
      this.$store2.state.endTime=''
      this.$store2.state.helpVisible=true
      // this.$router.push({
      //   path: '/consultant/frontpage'
      // })
    },
    getHelperList() {
      this.$http({
        url: '/admin/getBindWorkerList',
        method: 'post',
        crossdomain: true,
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          'username': this.$store1.state.username
        })
      }).then(res => {
        // console.log(res)
        console.log('helperlist')
        this.helper_list=res.data.data
        console.log(this.helper_list)
      }).catch(err => {
        console.log(err.data)
      })
    },
    handleKeydown(event) {
      if (event.keyCode !== 38 && event.keyCode !== 40 || this.isCheckouting) {
        return
      }
      const currentIndex = this.conversationList.findIndex(
          item => item.conversationID === this.currentConversation.conversationID
      )
      if (event.keyCode === 38 && currentIndex - 1 >= 0) {
        this.checkoutPrev(currentIndex)
      }
      if (
          event.keyCode === 40 &&
          currentIndex + 1 < this.conversationList.length
      ) {
        this.checkoutNext(currentIndex)
      }
    },
    checkoutPrev(currentIndex) {
      this.isCheckouting = true
      this.$store
          .dispatch(
              'checkoutConversation',
              this.conversationList[currentIndex - 1].conversationID
          )
          .then(() => {
            this.isCheckouting = false
          })
          .catch(() => {
            this.isCheckouting = false
          })
    },
    checkoutNext(currentIndex) {
      this.isCheckouting = true
      this.$store
          .dispatch(
              'checkoutConversation',
              this.conversationList[currentIndex + 1].conversationID
          )
          .then(() => {
            this.isCheckouting = false
          })
          .catch(() => {
            this.isCheckouting = false
          })
    },
    getTime() {
      var adate = new Date()
      this.startTime = getFullTime(adate)
      this.date = getDate(adate)
      this.$store2.commit('setStartTime',this.startTime)
      this.$store2.commit('setDate',this.date)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-container
  height 100%
  width 100%
  display flex
  flex-direction column // -reverse
  .header-bar
    flex-shrink 0
    height 50px
    border-bottom 1px solid $background-deep-dark
    padding 10px 10px 10px 20px
    button
      float right
      display: inline-block;
      cursor: pointer;
      background $background-deep-dark
      border: none
      color: $font-dark;
      box-sizing: border-box;
      transition: .3s;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      margin: 0 10px 0 0
      padding 0
      width 30px
      height 30px
      line-height 34px
      font-size: 24px;
      text-align: center;
      white-space: nowrap;
      border-radius: 50%
      outline 0
      &:hover
        // background $light-primary
        // color $white
        //transform: rotate(360deg);
        color $light-primary
  .scroll-container
    overflow-y scroll
    flex 1
.bottom-circle-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.refresh {
  bottom: 70px;
}
</style>
