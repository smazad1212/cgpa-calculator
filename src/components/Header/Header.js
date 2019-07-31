import React, { PureComponent } from 'react'
import { PageHeader } from 'antd'

import header from './Header.module.css'


class Header extends PureComponent {
  render() {
    return (
      <PageHeader title='CGPA Calculator' className={header.container} />
    )
  }
}

export default Header