// pages/user/bindUser.js
var util = require('../../utils/util.js')
var appConfig = require('../../appConfig.js')
var app = getApp()
var _countDownIntervalId = -1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    trueName:'',
    gender: '',
    // age:"",
    phone:'',
    emergencyName:'',
    emergencyNumber:'',
    state:'0',
    role:'4',
    available:'2',
    password:'123456',
    registerTime: util.formatTime(new Date())
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.stopCountDown();
    this.setData({
        username: app.globalData.userInfo.userID
    });
    const username = app.globalData.userInfo.userID

    // 请求url
    const _this = this;
    const url = 'http://101.35.223.56:8080/customer/getCustomerList';
    // 请求数据
    wx.request({
        url: url,
        method: 'POST',
        data:{
            username: username
        },
        success: function(res) {
            const currentUser = res.data.data[0];
            console.log(currentUser);
            _this.setData({
                trueName: currentUser.trueName,
                gender: currentUser.gender,
                phone: currentUser.phone,
                emergencyName: currentUser.emergencyName,
                emergencyNumber: currentUser.emergencyNumber   
            });
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cardNoArrayIndex: e.detail.value
    })
  },
  teleInput: function (e) {
    this.setData({
      phone:e.detail.value
    })
  },
  nameInput: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      trueName: e.detail.value
    })
    console.log(this.data.trueName)
  },
  genderInput: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },
  emgNameInput: function (e) {
    this.setData({
      emergencyName: e.detail.value
    })
  },
  emgPhoneInput: function (e) {
    this.setData({
      emergencyNumber: e.detail.value
    })
  },
  vertifyCodeInput: function (e) {
    this.setData({
      vertifyCode: e.detail.value
    })
  },
  update(){
    // console.log(trueName,gender,emergencyNumber,phone,emergencyName);
    // console.log(this.data.trueName,this.data.gender,this.data.emergencyNumber,this.data.phone,this.data.emergencyName)
    console.log(this.data)
    // 请求url
    const url = 'http://101.35.223.56:8080/customer/updateCustomer';
    // 请求数据
    wx.request({
      url: url,
      method: 'POST',
      data:this.data,
      success: function(res) {
        console.log(res.data);
        wx.showToast({
            title: '修改成功!',
            duration: 800,
            icon: 'success',
          });
      }
    });

      wx.switchTab({
        url: '/pages/index/mine',
      });
  },
  /**
   * 用户绑定（确定）按钮点击事件
   */
  sureTap: function (e) {
    var that = this;
    if (!this.dataVertify()) {
      // 数据有效性验证
      return;
    }
    wx.showLoading({
      title: '请稍候...',
    })
    var name = this.data.userName;
    var credNo = this.data.cardNum;
    var smsCode = this.data.vertifyCode;
    var mobile = this.data.telephoneNum;
    // 登录
    app.globalData.isBindUser = true;
    wx.redirectTo({
      url: 'userInfo',
    })
  },
  /**
   * 绑定提交数据校验
   */
  dataVertify: function() {
    var name = this.data.userName;
    var credNo = this.data.cardNum;
    var smsCode = this.data.vertifyCode;
    var mobile = this.data.telephoneNum;
    if (util.isBlankOrEmpty(name)) {
      this.showToast('请输入姓名...');
      return false;
    }
    var index = this.data.cardNoArrayIndex;
    if (util.isBlankOrEmpty(credNo) || (index == 0 && !util.isCardNum(credNo))) {
      this.showToast('请输入正确的身份证号...');
      return false;
    }
    if (util.isBlankOrEmpty(smsCode)) {
      this.showToast('请输入验证码...');
      return false;
    }
    if (!util.isTelephone(mobile)) {
      this.showToast('请输入正确的手机号...');
      return false;
    }
    return true;
  },
  /**
   * 发送验证码bindTap事件
   */
  tapSendVertifyCode: function (e) {
    var that = this;
    if (util.isTelephone(that.data.telephoneNum)) {
      if (util.isBlankOrEmpty(that.data.picValidCode)) {
        this.showToast('请输入图形验证码...');
        return;
      }
      this.showToast('正在发送...');
      var currentTime = that.data.currentTime;
      that.startCountDown(currentTime);
      var phone = that.data.telephoneNum;
      var picValidCode = that.data.picValidCode
      // 网络请求验证码

    } else {
      that.showToast('请输入正确的手机号');
    }
  },
  stopCountDown: function () {
    var that = this;
    if (_countDownIntervalId >= 0) {
      clearInterval(_countDownIntervalId);
      _countDownIntervalId = -1;
    }
    that.setData({
      time: '获取验证码',
      currentTime: 60,
      disabled: false
    })
  },
  startCountDown: function (currentTime) {
    var that = this;
    that.stopCountDown();
    that.setData({
      time: currentTime + 's后重发',
      disabled: true
    })
    _countDownIntervalId = setInterval(function () {
      if (_countDownIntervalId >= 0) {
        that.setData({
          time: (currentTime - 1) + 's后重发'
        })
        currentTime--;
        if (currentTime <= 0) {
          that.stopCountDown();
        }
      }
    }, 1000)
  },
  tapPicValidCode: function(e) {
    this.refreshPicValidCode();
  },
  refreshPicValidCode: function () {
    this.setData({
      picValidCodeUrl: appConfig.picCodeUrl + '?r=' + Math.random()
    })
  },
  // 获取手机号
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    // if (e.detail.errMsg == "getPhoneNumber:ok") {
    //   wx.request({
        // url: 'http://localhost/index/users/decodePhone',
        // data: {
        //   encryptedData: e.detail.encryptedData,
        //   iv: e.detail.iv,
        //   sessionKey: that.data.session_key,
        //   openid: openid,
        // },
        // method: "post",
        // success: function (res) {
        //   console.log(res);
        // }
    //   })
    // }
  },

  /**
   * 校验通过
   */
  showToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
    })
  }
})