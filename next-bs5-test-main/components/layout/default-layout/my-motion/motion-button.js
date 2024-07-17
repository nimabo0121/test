import React, { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import animationData from '@/assets/loader-motion.json' // 假設這是動畫檔案的路徑
import Link from 'next/link'
import { Button, Modal } from 'react-bootstrap'
import MotionButtonOne from './motion-button-one'

function MotionButton(props) {
  const [currentButton, setCurrentButton] = useState(1)

  const generatePositionStyle = (angleDeg, distance) => {
    const angleRad = (angleDeg * Math.PI) / 180
    const x = Math.cos(angleRad) * distance
    const y = Math.sin(angleRad) * distance
    return {
      position: 'absolute',
      top: `calc(50% - 35px + ${y}px)`, // 計算頂部位置
      left: `calc(50% - 35px + ${x}px)`, // 計算左側位置
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentButton <= 8) {
        setCurrentButton((prev) => prev + 1)
      } else {
        setCurrentButton(1)
      }
    }, 700)

    return () => clearInterval(interval)
  }, [currentButton])

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Body
        style={{
          textAlign: 'center',
          position: 'relative',
          backgroundColor: 'transparent',
          padding: 0,
        }}
      >
        {/* 主要的關閉按鈕 */}
        <Button
          onClick={props.onHide}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            zIndex: 1,
          }}
        >
          X
        </Button>

        {/* 四个环绕的按钮 */}
        <Button
          style={{
            ...generatePositionStyle(0, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',

            animation: currentButton === 1 ? 'pulse 1s alternate' : '',
          }}
        >
          <MotionButtonOne />
        </Button>
        <Button
          style={{
            ...generatePositionStyle(315, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 2 ? 'pulse 1s alternate' : '',
          }}
        >
          2
        </Button>
        <Button
          style={{
            ...generatePositionStyle(270, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 3 ? 'pulse 1s alternate' : '',
          }}
        >
          3
        </Button>
        <Button
          style={{
            ...generatePositionStyle(225, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 4 ? 'pulse 1s alternate' : '',
          }}
        >
          4
        </Button>
        <Button
          style={{
            ...generatePositionStyle(180, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 5 ? 'pulse 1s alternate' : '',
          }}
        >
          <Link style={{ color: 'white', textDecoration: 'none' }} href="/">
            返回首頁
          </Link>
        </Button>
        <Button
          style={{
            ...generatePositionStyle(135, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 6 ? 'pulse 1s alternate' : '',
          }}
        >
          6
        </Button>
        <Button
          style={{
            ...generatePositionStyle(90, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 7 ? 'pulse 1s alternate' : '',
          }}
        >
          7
        </Button>
        <Button
          style={{
            ...generatePositionStyle(45, 100),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            animation: currentButton === 8 ? 'pulse 1s alternate' : '',
          }}
        >
          8
        </Button>
      </Modal.Body>
    </Modal>
  )
}

function App() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Lottie
        variant="primary"
        onClick={() => setModalShow(true)}
        animationData={animationData}
        style={{
          width: '90px',
          height: 'auto',
          position: 'fixed',
        }}
      />

      {/* 渲染 Modal 元件 */}
      <MotionButton show={modalShow} onHide={() => setModalShow(false)} />
      <style>
        {`
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }
      {/* 去除Bootstrap 的內定樣式 .modal-content */}
           .modal-content {
            margin: 0;
            max-width: none;
            width: 100%;
            padding: 0;
            box-shadow: none;
            background-color: transparent;
            border: none;
          }
      `}
      </style>
    </>
  )
}

export default App
