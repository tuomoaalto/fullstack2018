import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const kurssi = {
  nimi: 'Half Stack -sovelluskehitys',
  osat: [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10,
      id: 1
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7,
      id: 2
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14,
      id: 3
    },
    {
      nimi: 'Joku muu, mikä?',
      tehtavia: 99,
      id: 4
    }
  ]
}

ReactDOM.render(
  <App kurssi={kurssi}/>,
  document.getElementById('root')
)