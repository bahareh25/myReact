import React from 'react'
import {
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToaster,
} from '@coreui/react'
export const CustomToast = ({ title, color, text }) => {
  const toaster = React.useRef();
  const MyToast = (
    <CToast title={title} color={color}>
      <CToastHeader closeButton>
        <strong className="me-auto">{title}</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>{text}</CToastBody>
    </CToast>);
  return (
    <>

      <CToaster ref={toaster} push={MyToast} placement="top-end"  visible={true}/>
    </>
  )
}
