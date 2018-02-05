import React from 'react'
import Kurssit from './components/Kurssit'

const App = ({kurssit} ) => {
    return (
    <div>
      <h1>Opetusohjelma</h1>
      <Kurssit kurssit={kurssit} />
    </div>
  )
}
export default App