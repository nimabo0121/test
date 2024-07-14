import { motion, useDragControls } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export default function NavberMotion() {
  const controls = useDragControls()
  const [dragConstraints, setDragConstraints] = useState({
    top: 50,
    left: 50,
    right: undefined,
    bottom: undefined,
  })

  const buttonRef = useRef(null) // 創建按鈕的 ref

  useEffect(() => {
    function updateDragConstraints() {
      const navberWidth = 0 // 你的導航欄寬度，根據實際情況調整
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      setDragConstraints({
        top: 50, // 顶部限制，根据实际情况调整
        left: navberWidth, // 左侧限制，避免覆盖导航栏
        right: windowWidth - 50, // 右侧限制，根据实际情况调整
        bottom: windowHeight - 50, // 底部限制，根据实际情况调整
      })
    }

    // 初始載入時更新一次拖動限制
    updateDragConstraints()

    // 在窗口大小變化時更新拖動限制
    window.addEventListener('resize', updateDragConstraints)

    return () => {
      window.removeEventListener('resize', updateDragConstraints)
    }
  }, [])

  function startDrag(event) {
    controls.start({ x: event.clientX, y: event.clientY })
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <a onClick={scrollToTop}>TOP</a>
      <motion.div
        className="draggable-button"
        drag
        dragControls={controls}
        dragConstraints={dragConstraints}
        style={{
          width: '50px',
          height: '50px', // 圓形按鈕的高度與寬度相等
          background: 'blue',
          borderRadius: '50%', // 使用 borderRadius 來製作圓形按鈕
          cursor: 'grab',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
        onPointerDown={startDrag}
        onClick={scrollToTop}
        ref={buttonRef} // 將按鈕的 ref 賦值給 buttonRef
      >
        按鈕
      </motion.div>
      <style jsx>{`
        .draggable-button:hover {
          cursor: grab;
        }
      `}</style>
    </>
  )
}
