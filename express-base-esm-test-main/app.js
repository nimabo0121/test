import * as fs from 'fs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import path from 'path'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import http from 'http'
import { fileURLToPath, pathToFileURL } from 'url'
import { Server as SocketServer } from 'socket.io' // 從 socket.io 中引入 Server 類

// 使用檔案的 session store，存在 sessions 資料夾
const FileStore = sessionFileStore(session)

// 修正 ESM 中的 __dirname 與 Windows 環境下的動態導入
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 讓 console.log 呈現檔案與行號，並且使用顏色標記字串訊息
import { extendLog } from '#utils/tool.js' // 假設這裡是自定義工具的導入
import 'colors' // 顏色庫的導入
extendLog()

// 建立 Express 應用程式
const app = express()

// 創建 HTTP 伺服器
const server = http.createServer(app)

// 創建 Socket.IO 伺服器
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:3000', // 允許的來源
    methods: ['GET', 'POST'], // 允許的 HTTP 方法
    allowedHeaders: ['my-custom-header'], // 允許的自定義標頭
    credentials: true, // 是否允許帶上 cookie
  },
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('sendMessage', (message) => {
    console.log('Message received:', message)
    // 向所有客戶端發送新訊息
    io.emit('newMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = process.env.PORT || 3006
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// 設置 CORS，請確保設置中包含必要的參數
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://localhost:9000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// 設置視圖引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// 記錄 HTTP 請求
app.use(logger('dev'))

// 解析 POST 和 PUT 請求中的 JSON 格式數據
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 解析 Cookie 標頭並將其添加到 req.cookies
app.use(cookieParser())

// 提供靜態文件服務於 public 目錄
app.use(express.static(path.join(__dirname, 'public')))

// 設置 session 使用的 fileStore 選項
const fileStoreOptions = { logFn: function () {} }
app.use(
  session({
    store: new FileStore(fileStoreOptions), // 使用檔案記錄 session
    name: 'SESSION_ID', // 存儲在瀏覽器中的 cookie 名稱
    secret: '67f71af4602195de2450faeb6f8856c0', // 安全字串，應用一個高安全字串
    cookie: {
      maxAge: 30 * 86400000, // 30 天的 session 有效期
    },
    resave: false,
    saveUninitialized: false,
  })
)

// 載入 routes 中的各路由檔案，並套用 API 路由
const apiPath = '/api' // 預設路由
const routePath = path.join(__dirname, 'routes')
const filenames = await fs.promises.readdir(routePath)

for (const filename of filenames) {
  const item = await import(pathToFileURL(path.join(routePath, filename)))
  const slug = filename.split('.')[0]
  app.use(`${apiPath}/${slug === 'index' ? '' : slug}`, item.default)
}
// 載入 routes 中的各路由檔案，並套用 API 路由 END

// 捕獲 404 錯誤處理
app.use(function (req, res, next) {
  next(createError(404))
})

// 錯誤處理函式
app.use(function (err, req, res, next) {
  // 在開發環境中只提供錯誤信息
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 渲染錯誤頁面
  res.status(err.status || 500)
  // 更改為 JSON 格式的錯誤信息
  // res.status(500).send({ error: err })
})

export default app
