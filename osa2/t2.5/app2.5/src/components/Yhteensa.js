import React from 'react'

const Yhteensa = ({osat}) => {
    const tehtavia = osat.map(osa => osa.tehtavia)
    console.log('tehtavia: ', tehtavia)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var tehtavaSumma = tehtavia.reduce(reducer);
    console.log('tehtavia yhteensa toisella tavalla: ', tehtavaSumma)
    return(
        <div>
            <p>Yhteensä {tehtavaSumma} tehtävää</p>
        </div>
    )
}
export default Yhteensa