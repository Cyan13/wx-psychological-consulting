Page({

    /**
     * 页面的初始数据
     */
    data: {
        second:5,
        click:false
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
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
        this.timer()
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
  
    //这里要加跳到选择咨询师页面的url
    accept:function(){
        if(this.data.click==false){
            return
        }
        wx.navigateTo({  url: '../consult/startConsult' }) 
  
    },
    timer: function () {
        let promise = new Promise((resolve, reject) => {
          let setTimer = setInterval(
            () => {
              this.setData({
                second: this.data.second - 1
              })
              if (this.data.second <= 0) {
                this.setData({
                    click: true
                })
                resolve(setTimer)
              }
            }
            , 1000)
        })
        promise.then((setTimer) => {
          clearInterval(setTimer)
        })
      }
  })