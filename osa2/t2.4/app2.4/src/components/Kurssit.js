import React from 'react'
import Kurssi from './Kurssi'

const Kurssit = ({kurssit}) =>{
    console.log('kurssit: ', kurssit)
    return(
        <div>
            <ul>
                {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi}/>)}
            </ul>
        </div>
    )
}
export default Kurssit