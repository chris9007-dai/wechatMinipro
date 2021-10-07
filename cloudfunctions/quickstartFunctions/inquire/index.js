const cloud = require("wx-server-sdk")
const db = cloud.database()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event,context) =>{ 
  userID = event.userID
  let items = await db.collection("files").where({
    userID:userID
  }).get().then((res)=>{
    return res
  })
  
  return items
}