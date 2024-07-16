import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import animationData from '@/assets/loader-motion.json'

export default function NavberMotion() {
  const [dragConstraints, setDragConstraints] = useState({
    top: 50, // 拖動按鈕的初始頂部邊距
    left: 50, // 拖動按鈕的初始左邊距
    right: undefined, // 拖動按鈕的右側限制，根據窗口大小動態計算
    bottom: undefined, // 拖動按鈕的底部限制，根據窗口大小動態計算
  })

  const buttonRef = useRef(null) // 用於引用拖動按鈕的 useRef

  useEffect(() => {
    // 更新拖動限制的函數
    function updateDragConstraints() {
      const navberWidth = 0 // 根據實際情況調整導航欄寬度，此處暫未使用
      const buttonWidth = buttonRef.current.offsetWidth // 獲取按鈕的寬度
      const windowWidth = window.innerWidth // 窗口寬度
      const windowHeight = window.innerHeight // 窗口高度

      // 計算右側和左側邊界
      const rightConstraint = windowWidth - buttonWidth - 50 // 右側邊界
      const leftConstraint = 50 // 左側邊界

      // 更新拖動限制狀態
      setDragConstraints({
        top: 50, // 調整頂部限制
        left: leftConstraint, // 調整左側限制，避免覆蓋導航欄
        right: rightConstraint, // 調整右側限制
        bottom: windowHeight - 200, // 調整底部限制
      })
    }

    // 組件加載時更新一次拖動限制
    updateDragConstraints()

    // 窗口大小變化時更新拖動限制
    window.addEventListener('resize', updateDragConstraints)

    // 組件卸載時清理事件監聽器
    return () => {
      window.removeEventListener('resize', updateDragConstraints)
    }
  }, []) // 空陣列作為依賴項，確保只在組件加載時執行一次

  // 開始拖動按鈕的事件處理函數
  function startDrag(event) {
    const button = buttonRef.current // 獲取拖動按鈕的DOM元素
    const buttonRect = button.getBoundingClientRect() // 獲取按鈕的位置信息

    const offsetX = event.clientX - buttonRect.left // 鼠標點擊位置相對於按鈕左上角的X偏移
    const offsetY = event.clientY - buttonRect.top // 鼠標點擊位置相對於按鈕左上角的Y偏移

    function handleDrag(event) {
      const left = event.clientX - offsetX // 計算應用偏移後的左邊距
      const top = event.clientY - offsetY // 計算應用偏移後的頂部邊距

      // 應用拖動限制
      button.style.left = `${Math.max(
        dragConstraints.left,
        Math.min(left, dragConstraints.right)
      )}px`
      button.style.top = `${Math.max(
        dragConstraints.top,
        Math.min(top, dragConstraints.bottom)
      )}px`
    }

    function stopDrag(event) {
      const buttonWidth = buttonRef.current.offsetWidth // 獲取按鈕的寬度
      const windowWidth = window.innerWidth // 窗口寬度

      // 計算按鈕應該靠近的最終位置
      const distanceToLeftEdge = dragConstraints.left // 左邊緣的距離
      const distanceToRightEdge = windowWidth - buttonWidth - 50 // 右邊緣的距離
      const currentLeft = parseFloat(button.style.left) // 當前按鈕的左邊距

      // 判斷離左右邊緣的距離，選擇靠近哪一側
      let targetLeft
      if (
        Math.abs(currentLeft - distanceToLeftEdge) <=
        Math.abs(currentLeft - distanceToRightEdge)
      ) {
        targetLeft = distanceToLeftEdge
      } else {
        targetLeft = distanceToRightEdge
      }

      // 使用動畫效果將按鈕吸附到目標位置
      button.style.transition = 'left 1.5s'
      button.style.left = `${targetLeft}px`

      // 清除動畫效果的 transition 屬性
      setTimeout(() => {
        button.style.transition = ''
      }, 1500)

      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', stopDrag)
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
  }

  // 滾動到頁面頂部的函數，平滑滾動
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="draggable-button"
      style={{
        position: 'fixed',
        zIndex: 1000,
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: `${dragConstraints.left}px`, // 初始位置的左邊距
        top: `${dragConstraints.top}px`, // 初始位置的頂部邊距
      }}
      onMouseDown={startDrag} // 鼠標按下時開始拖動
      onClick={scrollToTop} // 點擊按鈕滾動到頂部
      ref={buttonRef} // 引用拖動按鈕的 ref
    >
      <Lottie
        animationData={animationData} 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  )
}
