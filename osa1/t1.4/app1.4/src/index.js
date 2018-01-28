import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  
    return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

const Otsikko = (kurssi) => {
    return(
        <div>
            <h1>{kurssi.kurssi}</h1>
        </div>
    )
}
const Sisalto = (osat) => {
    return(
        <div>
        <Osa osa={osat.osat[0]}/>
        <Osa osa={osat.osat[1]}/>
        <Osa osa={osat.osat[2]}/>
        </div>
    )
}
const Osa = (osa) =>{
    return (
        <div>
            <p>{osa.osa.nimi} {osa.osa.tehtavia}</p>
        </div>
    )
}
const Yhteensa = osat => {
    console.log(osat)
    console.log(osat.osat[0])
    return(
        <div>
            <p>yhteensä {parseInt(osat.osat[0].tehtavia) + parseInt(osat.osat[1].tehtavia) + parseInt(osat.osat[2].tehtavia)} tehtävää</p>
        </div>
    )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)