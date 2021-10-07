const cloud = require("wx-server-sdk")
const db = cloud.database()
cloud.init()

exports.main = async (event,context) => {
  fileID = event.fileID
  fileName = event.fileName
  userID = event.userID
  fileList = []
let result = await  db.collection("files").where({
    fileID:fileID,
    fileName:fileName,
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