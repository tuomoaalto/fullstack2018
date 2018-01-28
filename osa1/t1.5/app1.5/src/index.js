import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
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
      }
  
    return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osat={kurssi} />
      <Yhteensa osat={kurssi} />
    </div>
  )
}

const Otsikko = (kurssi) => {
    return(
        <div>
            <h1>{kurssi.kurssi.nimi}</h1>
        </div>
    )
}
const Sisalto = (kurssi) => {
    return(
        <div>
        <Osa osa={kurssi.osat.osat[0]}/>
        <Osa osa={kurssi.osat.osat[1]}/>
        <Osa osa={kurssi.osat.osat[2]}/>
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
const Yhteensa = kurssi => {
    return(
        <div>
            <p>yhteensä {parseInt(kurssi.osat.osat[0].tehtavia) + parseInt(kurssi.osat.osat[1].tehtavia) + parseInt(kurssi.osat.osat[2].tehtavia)} tehtävää</p>
        </div>
    )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)