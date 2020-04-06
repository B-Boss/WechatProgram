// pages/attendance/attendance.js
const app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    latitude_east: '',
    latitude_west: '',
    longitude_north: '',
    longitude_south: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/buildinglocation',
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync('serverSeesion'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var resData = res.data;
        that.setData({
          latitude_east: resData[0].latitude_east,
          latitude_west: resData[0].latitude_west,
          longitude_north: resData[0].longitude_north,
          longitude_south: resData[0].longitude_south
        })
      }
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getLocation() {
    let that = this;


    wx.getLocation({
      altitude: 'true',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,

        })

        if (that.data.longitude_south <= longitude && longitude <= that.data.longitude_north &&
          latitude <= that.data.latitude_east && latitude >= that.data.latitude_west) {
          wx.request({
            url: app.globalData.url + '/attendance',
            header: {
              'cookie': 'JSESSIONID=' + wx.getStorageSync('serverSeesion'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              date: util.myFormatDate(new Date())

            },
            success: function (res) {
              console.log(res)
              if (res.data == "success") {
                wx.showToast({
                  title: '签到成功',
                  duration: 5000
                })
              } else {
                wx.showToast({
                  title: '错误代码' + res.statusCode,
                  duration: 5000
                })
              }

            }
          })

        } else {
          // wx.request({
          //   url: app.globalData.url + '/attendance',
          //   header: {
          //     'cookie': 'JSESSIONID=' + wx.getStorageSync('serverSeesion'),
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   },
          //   data: {
          //     date: util.myFormatDate(new Date())
          //   },
          //   success: function (res) {
          //     console.log(res)
          //     if (res.data == "success") {
          //       wx.showToast({
          //         title: '签到成功',
          //         duration: 5000
          //       })
          //     } else {
          //       wx.showToast({
          //         title: '错误代码' + res.statusCode,
          //         duration: 5000
          //       })
          //     }
          //   }
          // })
          wx.showToast({
            title: '当前不在签到范围，请尽快前往签到区域签到',
            duration: 5000
          })
        }

      }
    })
  }
})