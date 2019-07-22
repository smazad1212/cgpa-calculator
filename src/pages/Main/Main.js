import React from 'react'

import SelectDropdown from '../../components/SelectDropdown/SelectDropdown'

import styles from './Main.module.css'


const Main = () => {
  return (
    <div className={styles.main}>
      <SelectDropdown />
    </div>
  )
}

export default Main