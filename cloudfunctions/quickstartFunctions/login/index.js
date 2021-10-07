const cloud = require("wx-server-sdk")
const request = require("request-promise")
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  let {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext()
  let code = event.code

  //const res = await request("https://api.weixin.qq.com/sns/jscode2session?appid=" + APPID + "&secret=a56162e08182da27b8cff96161ea1f72&js_code=" + code + "&grant_type=authorization_code")
 var login = async function(){
  try{
    return await db.collection("users").where({
      openid: OPENID.toString()
    }).get().then(res => {
      /* if(!res.data[0]._id){
        throw error
      } */
      return res.data[0]._id
    })
  }catch{
    return  await  db.collection("users").add({
      data:{
       openid : OPENID
      }
     }).then(data =>{
       return data._id
     })
  }
 }
 userId = login()
  return userId
}