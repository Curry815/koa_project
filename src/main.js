// 引入配置文件
const {APP_PORT} = require('./config/config.default')

const app = require('./app/index')

app.listen(APP_PORT, () => {
  console.log(`server is running at http://localhost:${APP_PORT}`)
})