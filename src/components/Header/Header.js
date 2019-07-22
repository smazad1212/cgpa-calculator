import React, { PureComponent } from 'react'
import { PageHeader } from 'antd'

import styles from './Header.module.css'


class Header extends PureComponent {
  render() {
    return (
      <PageHeader title='CGPA Calculator' className={styles.header} />
    )
  }
}

export default Header