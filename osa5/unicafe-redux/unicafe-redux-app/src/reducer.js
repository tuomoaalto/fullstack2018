const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    /*
    console.log('state........: ', state)
    console.log('initialState.: ', initialState)
    console.log('action.......: ', action)
    */
    switch (action.type) {
        case 'GOOD':
            state = initialState
            state.good = initialState.good+1
            return state
        case 'OK':
            state = initialState
            state.ok = initialState.ok+1
            return state
        case 'BAD':
            state = initialState
            state.bad = initialState.bad+1
            return state
        case 'RESET':
            state = initialState
            state.good=0
            state.ok=0
            state.bad=0
            return state
        default:
            return state
    }
}

export default counterReducer