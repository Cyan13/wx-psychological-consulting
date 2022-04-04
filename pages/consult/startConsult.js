// pages/consult/startConsult.js
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      list: [], // 数据列表
      loading: true // 显示等待框
    },
   
    /**s
     * 生命周期函数--监听页面加载
     */
    onLoad: function () { // options 为 board页传来的参数
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
    }
  })