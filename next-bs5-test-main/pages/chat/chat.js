import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from '@/hooks/use-auth'

const socket = io('http://localhost:3006')

export default function Chat() {
  const { auth } = useAuth()

  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    // 監聽從服務器接收的新訊息
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const handleMessageSubmit = (e) => {
    e.preventDefault()
    if (messageInput.trim() !== '') {
      // 向服務器發送新訊息
      socket.emit('sendMessage', {
        content: messageInput,
        senderId: auth.userData.id, // 傳送使用者 ID
        senderName: auth.userData.name, // 傳送使用者名稱
      })
      setMessageInput('')
    }
  }

  const getMessageClass = (msg) => {
    return msg.senderId === auth.userData.id ? 'chat-message right' : 'chat-message left'
  }

  return (
    <div className="chat-container">
      <h1>聊天室</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={getMessageClass(msg)}>
            <span>{msg.senderName}: {msg.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="chat-form">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-button">Send</button>
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
          }

          .chat-message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
            max-width: 70%; /* 控制訊息框最大寬度 */
            word-wrap: break-word; /* 訊息過長自動換行 */
          }

          .chat-message.left {
            background-color: #f0f0f0;
            text-align: left;
            align-self: flex-start; /* 左對齊 */
          }

          .chat-message.right {
            background-color: #d3e8ff;
            text-align: right;
            align-self: flex-end; /* 右對齊 */
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
