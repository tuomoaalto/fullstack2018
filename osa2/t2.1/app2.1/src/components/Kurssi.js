import React from 'react';
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

const Kurssi = ({ kurssi }) => {
    console.log('kurssi: ', kurssi)
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi}/>
            <Sisalto sisalto={kurssi.osat}/>
        </div>
    )
}
export default Kurssi