// eslint-disable-next-line no-undef
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    display: {
      type: Boolean,
      value: '',
      observer(newVal) {
        this.setData({
          displayTag: newVal,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayTag: false,
    scoreList: [1, 2, 3, 4, 5],
    score: 5,
    comment: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('close', {
        key: '2',
      });
    },
    handleScore(e) {
      let { score } = e.currentTarget.dataset;
      if (score === this.data.score) {
        score = 0;
      }
      this.setData({
        score,
      });
    },
    bindTextAreaInput(e) {
      this.setData({
        comment: e.detail.value,
      });
    },
    sendMessage() {
      this.triggerEvent('sendCustomMessage', {
        payload: {
          // data 字段作为表示，可以自定义
          data: 'evaluation',
          description: '对本次服务的评价', // 获取骰子点数
          extension: JSON.stringify({
            score: this.data.score,
            comment: this.data.comment,
          }),
        },
      });

      this.setData({
        score: this.data.score,
        comment: this.data.comment,
      });
      console.log('服务评价data',this.data)

    // 结束咨询提示
    wx.showToast({
        title: '咨询结束！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 800
        });

    this.handleClose();

    // 结束咨询 跳转至首页
    wx.switchTab({
        // url: '../../../../pages/TUI-Index/index',
        url: '/pages/index/mine',
      });
    },
  },

  pageLifetimes: {
    show() {
      this.setData({
        score: 0,
        comment: '',
      });
    },
  },
});
