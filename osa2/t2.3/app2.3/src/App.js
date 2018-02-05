import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({kurssi} ) => {
    return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}
export default App