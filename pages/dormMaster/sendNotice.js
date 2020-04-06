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
    noticeList: [],
    
    delBtnWidth:160,
    data: [{ content: "1", right: 0 }, { content: "2", right: 0 }, { content: "3", right: 0 }, { content: "4", right: 0 }, { content: "5", right: 0 }, { content: "6", right: 0 }, { content: "7", right: 0 }, { content: "8", right: 0 }, { content: "9", right: 0 }, { content: "10",  right: 0 }],
    isScroll:true,
    windowHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
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
        for (let i = 0; i < list.length; i++) {
          list[i].right = 0
        }
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
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for(var index in this.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX
    
    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.data
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  },  
  drawEnd: function (e) {
    var item = this.data.data[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth/2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  },
  
  delItem: function (e) {

  }
})