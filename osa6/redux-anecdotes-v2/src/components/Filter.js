import React from 'react'
import { connect } from 'react-redux'
import { applyFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            <br/>
            filter <input onChange={(e) => handleChange(props, e)}/>
        </div>
    )
}

const handleChange = (props, event) => {
    props.applyFilter(event.target.value)
}

export default connect(
    null,
    { applyFilter }
)(Filter)