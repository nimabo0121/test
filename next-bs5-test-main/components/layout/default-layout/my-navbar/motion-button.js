import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/assets/loader-motion.json'
import { Button, Modal } from 'react-bootstrap'

// 定义 Modal 组件
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          快速導覽介面
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Motion</h4>
        <p>内容</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>關閉</Button>
      </Modal.Footer>
    </Modal>
  )
}

// App 组件
function App() {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <>
      <Lottie
        variant="primary"
        // onClick={() => setModalShow(true)}
        animationData={animationData}
        style={{
          width: '70px',
          height: 'auto',
          position: 'fixed',
          
        }}
      />

      {/* 渲染 Modal 组件 */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default App
