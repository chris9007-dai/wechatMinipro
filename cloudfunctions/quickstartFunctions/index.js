const login = require('./login/index')
const upLoudFile = require("./upLoudFile/index")
const inquire = require("./inquire/index")
const deleteBase = require("./deleteBase/index")


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'login':
      return await login.main(event, context)
    case 'upLoudFile':
      return await upLoudFile.main(event,context)
    case 'inquire':
      return await inquire.main(event,context)
    case 'deletBase':
      return await deleteBase.mainn(event,context)
  }
}
