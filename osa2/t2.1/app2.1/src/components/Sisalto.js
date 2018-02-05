import React from 'react';
import Osa from './Osa'

const Sisalto = ({ sisalto }) => {
    console.log('sisalto: ', sisalto)
    return(
        <div>
            <ul>
                {sisalto.map(osa => <Osa key={osa.id} osa={osa}/>)}
            </ul>
        </div>
    )
}
export default Sisalto