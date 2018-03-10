const initialFilter = ''

const filterReducer = (filter = initialFilter, action) => {
    console.log('filter at start: ', filter)
    console.log('action.type:', action.type)
    switch (action.type) {
    case 'SET_FILTER':
        console.log('setting filter to: ', filter)
        filter = action.filter
        return filter
    default:
        return filter
    }
}

export const applyFilter = (filter) => {
    console.log('applying filter: ', filter)
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default filterReducer