import React from 'react'

import UniversitySelector from '../../containers/UniversitySelector'

import main from './Main.module.css'


const Main = () => {
  return (
    <div className={main.container}>
      <UniversitySelector />

    </div>
  )
}

export default Main