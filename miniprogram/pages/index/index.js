// pages/index/index.js
let db = wx.cloud.database()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    showFlag: "",
    hasItems: "true",
    files:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  goLogin(e){
    wx.reLaunch({
      url: '../my/my',
    })
  },
  
  async upLoud(e){ //上传函数
   let userID = wx.getStorageSync('userId')
   let fileInfo = await wx.chooseMessageFile({
      count: 1,
    }).then(res=>{
      return res.tempFiles
    })

    let fileID = await wx.cloud.uploadFile({
      cloudPath: fileInfo[0].name,
      filePath:fileInfo[0].path
    }).then(res=>{
      return res.fileID
    })

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
    this.onShow()
    
  },

  async downFile(e){//下载函数
    let fileID = e.target.dataset.fileid 
    let filename = e.target.dataset.filename
    let filePath= await wx.cloud.downloadFile({
      fileID:fileID
    }).then((res)=>{
      return res.tempFilePath
    })
    wx.downloadFile({
      url: filePath,
      success:(res)=>{
        /* console.log(res) */
        wx.getFileSystemManager().saveFile({
          tempFilePath:res.tempFilePath,
          filePath:wx.env.USER_DATA_PATH+"/"+filename,
          success:(res)=>{
            console.log(res)
            wx.showToast({
              title: '下载成功',
            })
          }
        })
      }
    })
    
    
  },

  async delete(e){//删除函数
    let userID = wx.getStorageSync('userId')
    let fileID = e.target.dataset.fileid 
    let filename = e.target.dataset.filename
    console.log(fileID,filename)
   await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data:{
        type:"deleteBase",
        fileID:fileID,
        fileName:filename,
        userID:userID
      }
    }).then(res=>{
      if(res.result=="删除成功"){
        wx.showToast({
          title: '删除成功',
          icon:'success'
        })
      }else{
        wx.showToast({
          title: '删除失败',
          icon:"error"
        })
      }
    })
    
    this.onShow()
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

    if(this.data.shouFlag){
       wx.cloud.callFunction({
          name:"quickstartFunctions",
          data:{
            type: "inquire",
            userID:userid
          }
        }).then((res=>{
          this.setData({
            files:res.result.data
          })
        }))
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