//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

      menuitems: [
        // text标题，hint介绍，url跳转页面，icon图标，tips备注，tap点击事件(与url二选一)
        { text: '会话UI test', hint: '', url: '../../TUI-CustomerService/pages/TUI-Chat/chat', tips: '', tap: '' }
      ],
      showConcatModal: false
  },
  onLoad: function () {
    
    
  },
  showConcatModal: function(e) {
    this.setData({
      showConcatModal: true,
    }) 
  },
  dismissConcatModal: function (e) {
    this.setData({
      showConcatModal: false,
    })
  }
})
