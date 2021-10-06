// pages/index/index.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    showFlag: "",
    hasItems: "true",
    files:{
      file_name:"1232132131"
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  goLogin(e){
    wx.reLaunch({
      url: '../my/my',
    })
  },
 async upLoud(e){
   let userID = wx.getStorageSync('userId')
   console.log(userID)
    let fileInfo = await wx.chooseMessageFile({
      count: 1,
    }).then(res=>{
      return res.tempFiles
    })
    console.log(fileInfo[0].name)
    console.log(fileInfo[0].path)
    let fileID = await wx.cloud.uploadFile({
      cloudPath: fileInfo[0].name,
      filePath:fileInfo[0].path
    }).then(res=>{
      return res.fileID
    })
    console.log(fileID)
    wx.cloud.callFunction({
      name:"quickstartFunctions",
      data:{
        type:"upLoudFile",
        userID: userID,
        fileID: fileID,
        fileName: fileInfo[0].name
      }
    }).then(res=>{
      console.log(res)
      if(res.result=="上传成功"){
        wx.showToast({
          title: res.result,
          icon:"success"
        })
      }else{
        wx.showToast({
          title: res.result,
          icon:"error"
        })
      }
      
      
    })
  },
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
    var userinfo =  wx.getStorageSync('userInfo')
    var userid = wx.getStorageSync('userId')
    if(userid&&userinfo){//判断有没有登录，展示对应画面
      this.setData({
        shouFlag: true
      })
    }
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