const  cloud = require("wx-server-sdk")
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  let userID = event.userID
  let fileID = event.fileID
  let fileName = event.fileName
  let stat = ""
try{
  stat = await db.collection("files").where({
    userID:userID,
    fileName:fileName,
    fileID:fileID
  }).get().then(res=>{
    console.log(res)
    return "请勿重复"
  })
}catch{
 stat =  db.collection("files").add({
    data:{
      userID: userID,
      fileName: fileName,
      fileID: fileID
    }
  }).then(res=>{
    return "上传成功"
  })
}
  return stat
}
  

  