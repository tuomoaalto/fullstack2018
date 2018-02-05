import React from 'react'

const Yhteensa = ({osat}) => {
    const tehtavia = osat.map(osa => osa.tehtavia)
    console.log('tehtavia: ', tehtavia)
    var tehtavaSumma = 0
    for(var i in tehtavia) { tehtavaSumma += tehtavia[i]; }
    console.log('tehtavia yhteensa: ' + tehtavaSumma)
    return(
        <div>
            <p>Yhteensä {tehtavaSumma} tehtävää</p>
        </div>
    )
}
export default Yhteensa