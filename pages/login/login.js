// pages/login/login.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    index: null,
    username: '',
    password: ''
  },

  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  
// 点击登录
  clickLogin: function (e) {
    console.log("点击按钮!" + "获取到的用户名:" + this.data.username + "获取到的密码:" + this.data.password);
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8080/wxlogin",
     
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': '38116150',
        'password': "123456"
      },
      success: function (res) {
        getApp().globalData.userId=that.data.username
      
        var resData = res.data;  
        console.log("回调函数:" + resData)
        app.globalData.header.Cookie='JSESSIONID=' + resData;
        wx.setStorageSync('serverSeesion', resData);
        console.log(app.globalData.header.Cookie)

        if (resData != null) {         
          wx.showToast({
              title: '登录成功',
              duration: 3000
            }),
            wx.navigateTo({
              url: '/pages/menu/menu',
              data:{

                'username':that.data.username
              }
            })

        } else {
          wx.showToast({
            title: '登录失败',
            duration: 2000
          })
        }
      }

    })
  },
  reset() {
    this.password = '',
      this.username = ''
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',

    })
  }
})