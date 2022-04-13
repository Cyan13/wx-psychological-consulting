import TIM from './static/tim-wx'
import Aegis from './static/aegis'
import TIMUploadPlugin from './static/tim-upload-plugin'
import logger from './utils/logger'
import { SDKAPPID } from './debug/GenerateTestUserSig'
//app.js
App({
    globalData: {
        wxUserInfo: null,
        isBindUser: false,
        // userInfo: userID userSig token phone
        userInfo: null,
        isTUIKit: true,
        // 个人信息
        userProfile: null,
        // headerHeight: 0,
        // statusBarHeight: 0,
        SDKAppID: SDKAPPID,
      },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    console.log('---------login app.js-----')
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wxUserInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 设置登录全局变量userInfo
    // const userID = this.globalData.wxUserInfo.nickName;
    // const userSig = genTestUserSig(userID).userSig;
    // this.globalData.userInfo = {
    //     userSig,
    //     userID,
    // }
    // console.log('global app.js', this.globalData.userInfo)

    // TUIK app.js
    this.aegisInit()
    wx.aegis.reportEvent({
        name: 'time',
        ext1: 'first-run-time',
        ext2: 'imTuikitExternal',
        ext3: this.globalData.SDKAppID,
    })

    // wx.setStorageSync('islogin', false)
    wx.setStorageSync('islogin', true)
    const SDKAppID = this.globalData.SDKAppID
    wx.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true)
    wx.$TUIKit = TIM.create({ SDKAppID: this.globalData.SDKAppID })
    wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
    wx.$TUIKitTIM = TIM
    wx.$TUIKitEvent = TIM.EVENT
    wx.$TUIKitVersion = TIM.VERSION
    wx.$TUIKitTypes = TIM.TYPES
    // 监听系统级事件
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady)
    wx.$TUIKit.on(wx.$TUIKitEvent.KICKED_OUT, this.onKickedOut)
    wx.$TUIKit.on(wx.$TUIKitEvent.ERROR, this.onTIMError)
    wx.$TUIKit.on(wx.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange)
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_RELOAD, this.onSDKReload)
    wx.$TUIKit.on(wx.$TUIKitEvent.SDK_READY, this.onSDKReady)

    // TUIK login
    // wx.$TUIKit.login({userID: userID, userSig: userSig})
    // .then(()=> {
    //     wx.aegis.reportEvent({
    //         name: 'login',
    //         ext1: 'login-success',
    //         ext2: 'imTuikitExternal',
    //         ext3: app.globalData.SDKAppID,
    //     })
    //     }).catch((error)=> {
    //     wx.aegis.reportEvent({
    //         name: 'login',
    //         ext1: `login-failed#error:${error}`,
    //         ext2: 'imTuikitxEternal',
    //         ext3: app.globalData.SDKAppID,
    //     })
    // })

  },

onShow() {
    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },
  aegisInit() {
    wx.aegis = new Aegis({
      id: 'iHWefAYquFxvklBblC', // 项目key
      reportApiSpeed: true, // 接口测速
      reportAssetSpeed: true, // 静态资源测速
      pagePerformance: true, // 开启页面测速
    });
  },
  // TODO:
  resetLoginData() {
    this.globalData.expiresIn = ''
    this.globalData.sessionID = ''
    this.globalData.userInfo = {
      userID: '',
      userSig: '',
      token: '',
      phone: '',
    }
    this.globalData.userProfile = null
    logger.log(`| app |  resetLoginData | globalData: ${this.globalData}`)
  },
  onSDKReady() {

},
onSdkNotReady() {

},

onKickedOut() {
  wx.showToast({
    title: '您被踢下线',
    icon: 'error',
  })
  wx.navigateTo({
    url: './pages/TUI-Login/login',
  })
},

onTIMError() {
},

onNetStateChange() {

},

onSDKReload() {

},
})