import React from 'react'

import Header from './components/Header/Header'
import Main from './pages/Main/Main'


const App = () => {
  document.title = "CGPA Calculator"
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  )
}

export default App