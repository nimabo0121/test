import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MotionProfile from '@/pages/member/motion-profile'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="container d-flex justify-content-center"
        style={{}}
      >
        <MotionProfile />
      </Modal.Body>
      <Button
        style={{
          position: 'absolute',
          top: '98%',
          left: '5%',
          width: '28rem',
          maxWidth: '90%',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
        onClick={props.onHide}
      >
        返回
      </Button>
    </Modal>
  )
}

function MotionButtonOne() {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <>
      <Button
        style={{
          border: '0px solid black',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          width: '50px',
          wordBreak: 'break-all',
        }}
        className="px-1"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        會員
        <br />
        資料
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default MotionButtonOne
