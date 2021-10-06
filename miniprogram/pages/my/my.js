Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:""
  },
getUserInfo(e){
  wx.getUserProfile({
    desc: '测试',
    success:(e)=>{
      wx.setStorageSync('userInfo', e.userInfo)
      this.setData({
        userInfo:e.userInfo,
        hasUserInfo:true
      })
    }
  })
  
  wx.checkSession({
    success: (res) => {
      console.log("session有效")
      var value = wx.getStorageSync('userInfo')
      if (value) {
        this.setData({
          hasUserInfo: "true",
          userInfo: value
        })
      }
    },
    fail: () => {
      wx.clearStorage({
        success: (res) => {
          console.log("cleared")
        },
      })
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.cloud.callFunction({
              name: "quickstartFunctions",
              data: {
                type: "login",
                code: res.code
              },
              success: (res) => {
                wx.setStorageSync('userId', res.result)
              }
            })
          }
        }
      })

    }
  })
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo =  wx.getStorageSync('userInfo')
    var userid = wx.getStorageSync('userId')
    if(userid&&userinfo){
      this.setData({
        hasUserInfo: "true",
        userInfo: userinfo
      })
    }
   
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

  }
})