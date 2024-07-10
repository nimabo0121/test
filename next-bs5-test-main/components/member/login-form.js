import React from 'react'
import styles from './member.module.css'
import Link from 'next/link'

import { initUserData, useAuth } from '@/hooks/use-auth'
import { login, getUserById } from '@/services/user'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
// 第三方登入
import LineLogo from '@/components/icons/line-logo'
import GoogleLogo from '@/components/icons/google-logo'
import FacebookLogo from '@/components/icons/facebook-logo'

// 解析accessToken用的函式
const parseJwt = (token) => {
  const base64Payload = token.split('.')[1]
  const payload = Buffer.from(base64Payload, 'base64')
  return JSON.parse(payload.toString())
}

export default function LoginForm() {
  const [user, setUser] = useState({ username: '', password: '' })

  // 登入後設定全域的會員資料用
  const { setAuth } = useAuth()

  const router = useRouter()

  // 輸入帳號 密碼用
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // 記錄欄位錯誤訊息用
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  // 顯示密碼使用
  const [showPassword, setShowPassword] = useState(false)

  // 表單送出事件處理函式
  const handleSubmit = (e) => {
    // 先阻擋form表單元件的預設送出行為
    e.preventDefault()

    // 表單檢查--- START ---
    // 建立一個新的錯誤訊息物件
    const newErrors = { username: '', password: '' }

    // 開始檢查
    // if (user.username === '') {
    // if(user.username) 檢查如果有填寫
    // if(!user.username) 檢查如果沒填的話…
    if (!user.username) {
      newErrors.username = '帳號為必填'
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
    }

    if (user.password.length < 5 || user.password.length > 10) {
      newErrors.password = '密碼 5 到 10 字元'
    }

    // 檢查完成後設定到錯誤狀態
    setErrors(newErrors)

    // newErrors物件中如果有屬性值不是空白字串時，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    if (hasErrors) {
      alert('有檢查到錯誤')
      return // 在函式內作流程控制用，執行到這會跳出函式執行
    }
    // 表單檢查--- END ---
  }

  // 處理登入
  const handleLogin = async () => {
    const res = await login(user)

    console.log(res.data)

    if (res.data.status === 'success') {
      // 從JWT存取令牌中解析出會員資料
      // 注意JWT存取令牌中只有id, username, google_uid, line_uid在登入時可以得到
      const jwtUser = parseJwt(res.data.data.accessToken)
      console.log(jwtUser)

      const res1 = await getUserById(jwtUser.id)
      console.log(res1.data)

      if (res1.data.status === 'success') {
        // 只需要initUserData中的定義屬性值，詳見use-auth勾子
        const dbUser = res1.data.data.user
        const userData = { ...initUserData }

        for (const key in userData) {
          if (Object.hasOwn(dbUser, key)) {
            userData[key] = dbUser[key]
          }
        }

        // 設定到全域狀態中
        setAuth({
          isAuth: true,
          userData,
        })

        toast.success('已成功登入')
        router.push('/')
      } else {
        toast.error('登入後無法得到會員資料')
        // 這裡可以讓會員登出，因為這也算登入失敗，有可能會造成資料不統一
      }
    } else {
      toast.error(`登入失敗`)
    }
  }

  return (
    <main className={`form-member w-100 m-auto text-center`}>
      <h2 className="text-center mb-5">會員登入</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="text"
              name="username"
              value={user.username}
              className={`form-control w-100 ${styles['form-control']} `}
              placeholder="帳號"
              onChange={handleFieldChange}
            />
          </div>
          <div className="error">{errors.username}</div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={user.password}
              className={`form-control w-100 ${styles['form-control']}`}
              placeholder="密碼"
              onChange={handleFieldChange}
            />
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => {
                setShowPassword(!showPassword)
              }}
            />
            顯示密碼
          </div>
          <div className="error">{errors.password}</div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6 text-start">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
              />
              <label
                className={`form-check-label  ${styles['notice']}`}
                htmlFor="gridCheck1"
              >
                保持登入狀態
              </label>
            </div>
          </div>
          <div className="col-sm-4 offset-sm-2 test-end">
            <Link
              href="/member/forget-password"
              className={`${styles['notice']}`}
            >
              忘記密碼？
            </Link>
          </div>
        </div>
        <div className="row mb-2">
          <p className={`${styles['notice']}`}>
            如登入，即代表同意本站
            <Link href="/about">隱私權政策</Link>和
            <Link href="/about">使用條款</Link>。
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          登入
        </button>
        <button
          className="mt-2"
          onClick={() => {
            // 測試帳號 herry/11111
            setUser({ username: 'herry', password: '11111' })
          }}
        >
          一鍵輸入
        </button>
        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/register">加入我們</Link>。
          </p>
        </div>

        <div className={`mb-3 ${styles['hr-sect']}`}>快速登入</div>
        <div className="row mb-2">
          <div className="col-sm-12 text-start">
            <div className="d-flex justify-content-center">
              <LineLogo className="mx-3" />
              <GoogleLogo className="mx-3" />
              <FacebookLogo className="mx-3" />
            </div>
          </div>
        </div>
        {/* 土司訊息視窗用 */}
        <Toaster />
      </form>
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 12px;
            height: 16px;
          }
        `}
      </style>
    </main>
  )
}
