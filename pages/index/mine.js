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
    if (app.globalData.wxUserInfo) {
      that.setUserInfo(app.globalData.wxUserInfo);
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.setUserInfo(res.userInfo);
        }
      })
    }

    const _this = this;
      // 请求url
      const url = 'http://101.35.223.56:8080/admin/getWorkerList';
      // 请求数据
      wx.request({
        url: url,
        method: 'POST',
        data:{
            "role": "0"
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

  getUserInfo: function (e) {
    this.setUserInfo(e.detail.userInfo);
  },

  setUserInfo: function (userInfo) {
    console.log(userInfo)
    if (userInfo != null) {
      app.globalData.wxUserInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
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