const cloud = require("wx-server-sdk")
const db = cloud.database()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event,context) => {
  fileID = event.fileID
  userID = event.userID
  fileList = []
let result = await  db.collection("files").where({
    fileID:fileID,
    userID:userID
  }).remove().then((res)=>{
    fileList.push(fileID)
    cloud.deleteFile({
      fileList:fileList
    })
    return "删除成功"
  })
  return result
}