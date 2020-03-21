// pages/dormMaster/sendNotice.js
const app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    newNotice: '',
    noticeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/wxbuildingNotice/noticeList',
      method: "GET",
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync('serverSeesion'),
        'Content-Type': 'application/json'
      },
      data: {},
      success: function (res) {
        var list = res.data;
        console.log(list);
        that.setData({
          noticeList: list
        })
      }

    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  modalinput: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮 
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认 
  confirm: function () {
    var that = this;

    if (that.data.newNotice != '') {
      console.log(that.data.newNotice)
      wx.request({
        url: app.globalData.url + '/wxbuildingNotice/updateNotice',
        method: "POST",
        header: {
          'cookie': 'JSESSIONID=' + wx.getStorageSync('serverSeesion'),
          'Content-Type': 'application/json'
        },
        data: {
          notice: that.data.newNotice,
          date: util.formatTime(new Date())
        },
        success: function (res) {
          var resDate = res.data;
          console.log(resDate)
          if (resDate.code == 200) {
            wx.showToast({
              title: '发布成功',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '发布失败',
              duration: 2000
            })
          }
        }
      })
    }


    this.setData({
      hiddenmodalput: true,
      newNotice: ''
    })
  },
  newNotice: function (e) {
    var that = this;

    this.setData({
      newNotice: e.detail.value
    })
    this.confirm();
  }

})