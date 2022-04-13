import { genTestUserSig } from '../../debug/GenerateTestUserSig'
// pages/index/mine.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    canIUseOpenData:false,
    menuitems: [
      { text: '信息完善', url: '', icon: '../../images/icon-user.png', tips: '', tap: 'bindTapUserInfo' },
      { text: '立即咨询', url: '', icon: '../../images/icon-name.png', tips: '', tap: 'bindTapConsult' }
    ],
    
    list: [], // 数据列表
    loading: true // 显示等待框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取用户信息
    if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    
    // wx.getUserProfile({
    //     success: res => {
    //         that.setUserInfo(res.userInfo);
    //         console.log('ming.js userinfo',res.userInfo)
    //     }
    //     })

    //   if (app.globalData.wxUserInfo) {
    //   that.setUserInfo(app.globalData.wxUserInfo);
    // } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     that.setUserInfo(res.userInfo);
    //     console.log('---mine.js elseif - res.userInfo-----',res.userInfo)
    //   }
    // } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       that.setUserInfo(res.userInfo);
    //     }
    //   })
    // };
       

    // 请求咨询师数据
    const _this = this;
      // 请求url
      const url = 'http://101.35.223.56:8080/admin/getWorkerList';
      // 请求数据
      wx.request({
        url: url,
        method: 'POST',
        data:{
            "role": "1"
        },
        success: function(res) {
          console.log(res.data);
          _this.setData({
            list: res.data.data,
            loading: false // 关闭等待框
          })
        }
      })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        const userID = res.userInfo.nickName;
        const userSig = genTestUserSig(userID).userSig;
        app.globalData.userInfo = {
            userSig,
            userID,
        };
         // TUIK login
         wx.$TUIKit.login({userID: userID, userSig: userSig})
         .then(()=> {
             wx.aegis.reportEvent({
                 name: 'login',
                 ext1: 'login-success',
                 ext2: 'imTuikitExternal',
                 ext3: app.globalData.SDKAppID,
             })
             }).catch((error)=> {
             wx.aegis.reportEvent({
                 name: 'login',
                 ext1: `login-failed#error:${error}`,
                 ext2: 'imTuikitxEternal',
                 ext3: app.globalData.SDKAppID,
             })
         });
        console.log('mine.js userInfo',app.globalData.userInfo);

      }
    })
  },

//   getUserInfo: function (e) {
//     this.setUserInfo(e.detail.userInfo);
//   },

  setUserInfo: function (userInfo) {
    console.log(userInfo)
    if (userInfo != null) {
        app.globalData.wxUserInfo = userInfo
        this.setData({
        userInfo: userInfo,
        hasUserInfo: true
        })
        const userID = app.globalData.wxUserInfo.nickName;
        const userSig = genTestUserSig(userID).userSig;
        app.globalData.userInfo = {
            userSig,
            userID,
        };
         // TUIK login
         wx.$TUIKit.login({userID: userID, userSig: userSig})
         .then(()=> {
             wx.aegis.reportEvent({
                 name: 'login',
                 ext1: 'login-success',
                 ext2: 'imTuikitExternal',
                 ext3: app.globalData.SDKAppID,
             })
             }).catch((error)=> {
             wx.aegis.reportEvent({
                 name: 'login',
                 ext1: `login-failed#error:${error}`,
                 ext2: 'imTuikitxEternal',
                 ext3: app.globalData.SDKAppID,
             })
         });
        console.log('ming.js userInfo',app.globalData.userInfo);
    }
  },
  
  //用户信息按钮点击事件
  bindTapUserInfo() {
    if (app.globalData.isBindUser) {
      // 如果已经绑定用户，则跳到用户信息
      wx.navigateTo({url: '../user/userInfo'})
    } else {
      // 未绑定，则跳到用户绑定
      wx.navigateTo({url: '../user/bindUser'})
    }
  },

  bindTapConsult() {
      wx.navigateTo({url: '../consult/confirm'})
  }
})