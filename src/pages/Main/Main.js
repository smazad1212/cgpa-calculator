import React from 'react'

// import UniversitySelector from '../../containers/UniversitySelector'
import CoursesTable from '../../containers/CoursesTable'

import main from './Main.module.css'


const Main = () => {
  return (
    <div className={main.container}>
      {/*<UniversitySelector />*/}
      <CoursesTable />
    </div>
  )
}

export default Main