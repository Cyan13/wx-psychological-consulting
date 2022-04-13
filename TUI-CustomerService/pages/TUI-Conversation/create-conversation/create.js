import { genTestUserSig } from '../../../../debug/GenerateTestUserSig'
// eslint-disable-next-line no-undef
const app = getApp();
// eslint-disable-next-line no-undef
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: '',
    searchUser: [],
    chosenUserID: '',
    userInfo: {
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      userInfo:app.globalData.wxUserInfo,
    });
    // const userID = app.globalData.wxUserInfo.nickName;
    // const userSig = genTestUserSig(userID).userSig;
    // app.globalData.userInfo = {
    //     userSig,
    //     userID,
    // };
    // 获取咨询师列表
    const _this = this;
    // 请求url
    const url = 'http://101.35.223.56:8080/admin/getWorkerList';
    // 请求数据
    wx.request({
      url: url,
      method: 'POST',
      data:{
          role: 1
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          searchUser:res.data.data,
        })
        console.log(res.data.data);
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  // 回退
//   goBack() {
//     wx.navigateBack({
//       delta: 1,
//     });
//   },
  // 获取输入的 UserID
//   userIDInput(e) {
//     this.setData({
//       userID: e.detail.value,
//       searchUser: {},
//     });
//   },
  // 获取该 UserID 对应的个人资料
//   getuserProfile() {
//     wx.$TUIKit.getUserProfile({
//       userIDList: [this.data.userID],
//     }).then((imRes) => {
//       if (imRes.data.length > 0) {
//         this.setData({
//           searchUser: imRes.data[0],
//         });
//       } else {
//         wx.showToast({
//           title: '用户不存在',
//           icon: 'error',
//         });
//         this.setData({
//           userID: '',
//         });
//       }
//     });
//   },

radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
        chosenUserID: e.detail.value
    })
  },
  // 选择发起会话
//   handleChoose() {
//     this.data.chosenUserID.isChoose = !this.data.searchUser.isChoose;
//     this.setData({
//       searchUser: this.data.searchUser,
//     });
//   },
  // 确认邀请
  bindConfirmInvite() {
    if (this.data.chosenUserID) {
      const payloadData = {
        conversationID: `C2C${this.data.chosenUserID}`,
      };
      wx.navigateTo({
        url: `../../TUI-Chat/chat?conversationInfomation=${JSON.stringify(payloadData)}`,
      });
    } else {
      wx.showToast({
        title: '请选择相关用户',
        icon: 'none',
      });
    }
  },
});
