import React from 'react'
import { Button } from 'antd'

import button from './CustomButton.module.css'

const CustomButton = (
  {
    onClick,
    type = 'primary', // primary, link
    children
  }) => {
  return (
    <Button onClick={onClick} type={type} className={button.button}>
      {children}
    </Button>
  )
}

export default CustomButton