import React, { useEffect } from 'react'
import useFirebase from '@/hooks/use-firebase'
import { useAuth, initUserData } from '@/hooks/use-auth'
import {
  googleLogin,
  checkAuth,
  logout,
  parseJwt,
  getUserById,
} from '@/services/user'
import toast, { Toaster } from 'react-hot-toast'
import GoogleLogo from '@/components/icons/google-logo'

export default function GoogleLoginRedirect() {
  const { logoutFirebase, loginGoogleRedirect, initApp } = useFirebase()
  const { auth, setAuth } = useAuth()

  useEffect(() => {
    // 在頁面初次渲染後，初始化 Firebase 和監聽 Google 登入狀態
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理 Google 登入後的回調函式
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 如果已經登入，則不需要再處理登入動作
    if (auth.isAuth) return

    try {
      // 向後端發送 Google 登入資料，並取得回應
      const res = await googleLogin(providerData)

      console.log(res.data)

      if (res.data.status === 'success') {
        // 解析 JWT 存取令牌，取得使用者資料
        const jwtUser = parseJwt(res.data.data.accessToken)
        console.log(jwtUser)

        // 從後端獲取完整的使用者資料
        const res1 = await getUserById(jwtUser.id)
        console.log(res1.data)

        if (res1.data.status === 'success') {
          // 從後端獲取到的使用者資料
          const dbUser = res1.data.data.user
          // 初始化用戶數據
          const userData = { ...initUserData }

          // 將後端返回的使用者數據更新到全域狀態中
          for (const key in userData) {
            if (Object.prototype.hasOwnProperty.call(dbUser, key)) {
              userData[key] = dbUser[key] || ''
            }
          }

          // 更新全域狀態
          setAuth({
            isAuth: true,
            userData,
          })

          toast.success('已成功登入')
        } else {
          toast.error('登入後無法獲取會員資料')
        }
      } else {
        toast.error('登入失敗')
      }
    } catch (error) {
      console.error('登入過程中發生錯誤:', error)
      toast.error('登入過程中發生錯誤')
    }
  }

  // 檢查登入狀態
  const handleCheckAuth = async () => {
    try {
      const res = await checkAuth()

      console.log(res.data)

      if (res.data.status === 'success') {
        toast.success('已登入會員')
      } else {
        toast.error('非會員身份')
      }
    } catch (error) {
      console.error('檢查登入狀態時發生錯誤:', error)
      toast.error('檢查登入狀態時發生錯誤')
    }
  }

  // 處理登出
  const handleLogout = async () => {
    // 登出 Firebase 和後端
    logoutFirebase()
    const res = await logout()

    if (res.data.status === 'success') {
      // 登出成功後，重置本地狀態為初始值
      setAuth({
        isAuth: false,
        userData: initUserData,
      })

      toast.success('已成功登出')
    } else {
      toast.error('登出失敗')
    }
  }

  return (
    <>
      <h1>Google Login重定向測試頁</h1>
      <p>會員狀態: {auth.isAuth ? '已登入' : '未登入'}</p>
      <button onClick={() => loginGoogleRedirect()}>
        <GoogleLogo /> Google登入
      </button>
      <br />
      <button onClick={handleLogout}>登出</button>
      <br />
      <button onClick={handleCheckAuth}>檢查登入狀態</button>
      <hr />
      {/* 用於顯示訊息提示 */}
      <Toaster />
    </>
  )
}
