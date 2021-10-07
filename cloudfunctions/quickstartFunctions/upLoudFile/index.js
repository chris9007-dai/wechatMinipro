const  cloud = require("wx-server-sdk")
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  let userID = event.userID
  let fileID = event.fileID
  let stat = ""
try{
  stat = await db.collection("files").where({//查重
    userID:userID,
    fileID:fileID
  }).get().then(res=>{
    console.log(res.data)
    if(res.data == ""){//没重复抛出错误，执行catch添加
      throw error
    }
    return "请勿重复"
  })
}catch{
 stat =  db.collection("files").add({
    data:{
      userID: userID,
      fileID: fileID
    }
  }).then(res=>{
    return "上传成功"
  })
}
  return stat
}
  

  