// pages/chooseRoom/chooseRoom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    userId:app.globalData.userId,
    bedList:[],
    UserInfosList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
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
    let that = this;
    wx.request({
      url: app.globalData.url+"/wxmyroom/bedlist",
      method:"GET",
      header:{'cookie':'JSESSIONID='+wx.getStorageSync('serverSeesion'),
      'Content-Type': 'application/json'},
      data:{ 
        JSESSIONID: wx.getStorageSync('serverSeesion')
      },
      success:function(res){
        var list=res.data;
        console.log(list);
        for (let i = 0; i < list.length; i++) {
        list[i].id=i
        };
        for (let i = 0; i < list.length; i++) {
          list[i].name=list[i].name.slice(8);//处理字符串
          };
        that.setData({
          bedList:list
        })
      }
    })
    wx.request({
      url: app.globalData.url+"/wxmyroom/householdinfo",
      method:"GET",
      header:{'cookie':'JSESSIONID='+wx.getStorageSync('serverSeesion'),
      'Content-Type': 'application/json'},
      data:{
        JSESSIONID: wx.getStorageSync('serverSeesion')
      },
      success:function(res){
        var list=res.data; 
        console.log(list);
        that.setData({
          UserInfosList:list
         
        })
      }
    })
  },


  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50,
  
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.bedList;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})
 