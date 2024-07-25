import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from '@/hooks/use-auth'

// 连接到 Socket.IO 服务器
const socket = io('http://localhost:3006')
const avatarBaseUrl = 'http://localhost:3006/avatar' // 头像的基础 URL

export default function Chat() {
  const { auth } = useAuth() // 使用自定义 hook 获取用户认证信息

  const [messages, setMessages] = useState([]) // 状态：存储聊天消息的数组
  const [messageInput, setMessageInput] = useState('') // 状态：存储用户输入的消息

  useEffect(() => {
    // 监听从服务器接收的新消息
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      // 组件卸载时断开 Socket.IO 连接
      socket.disconnect()
    }
  }, [])

  const handleMessageSubmit = (e) => {
    e.preventDefault()
    if (messageInput.trim() !== '') {
      socket.emit('sendMessage', {
        content: messageInput,
        senderId: auth.userData.id,
        senderName: auth.userData.name,
        senderAvatar: auth.userData.id, // 使用用户 ID 作为头像文件名
      })
      setMessageInput('') // 清空消息输入框
    }
  }

  const getMessageClass = (msg) => {
    return msg.senderId === auth.userData.id
      ? 'chat-message right'
      : 'chat-message left'
  }

  // 构建头像的 URL
  const getAvatarUrl = (userId) => {
    return `${avatarBaseUrl}/${userId}.jpg` // userId.jpg
  }

  return (
    <div className="chat-container">
      <h1>聊天室</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={getMessageClass(msg)}>
            {msg.senderId !== auth.userData.id && (
              <img
                src={getAvatarUrl(msg.senderId)} // 根据用户 ID 获取头像 URL
                alt="User Avatar"
                className="user-avatar"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/default.png' // 加载错误时显示默认头像
                }}
              />
            )}
            <div className="message-content">
              {msg.senderId !== auth.userData.id && (
                <span className="sender-name">{msg.senderName}</span>
              )}
              <p className="message-text">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleMessageSubmit} className="chat-form">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="chat-input"
          placeholder="輸入訊息..."
        />
        <button type="submit" className="chat-button">
          發送
        </button>
      </form>

      <style>
        {`
          .chat-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }

          .chat-messages {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
          }

          .chat-message {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            width: 100%;
          }

          .chat-message.right {
            justify-content: flex-end;
            text-align: right;
          }

          .chat-message.left {
            justify-content: flex-start;
            text-align: left;
          }

          .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .chat-message.right .user-avatar {
            margin-left: 10px;
            margin-right: 0;
          }

          .chat-message.left .user-avatar {
            margin-left: 0;
            margin-right: 10px;
          }

          .message-content {
            display: flex;
            flex-direction: column;
            max-width: 70%; /* 控制訊息框最大寬度 */
          }

          .sender-name {
            font-weight: bold;
            margin-bottom: 5px;
          }

          .message-text {
            word-wrap: break-word;
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 10px;
          }

          .chat-input {
            width: calc(100% - 70px);
            padding: 10px;
            margin-right: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .chat-button {
            padding: 10px 20px;
            border: none;
            background-color: #007bff;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
          }

          .chat-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  )
}
