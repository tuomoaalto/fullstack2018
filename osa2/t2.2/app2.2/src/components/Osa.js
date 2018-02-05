import React from 'react';

const Osa = ({ osa }) =>{
    console.log('osa: ', osa)
    return (
        <li>{osa.nimi} {osa.tehtavia}</li>
    )
}
export default Osa