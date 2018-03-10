const initialNotification = 'This is your initial notification.'

const notificationReducer = (notification = initialNotification, action) => {
    console.log('notification at start: ', notification)
    console.log('action.type:', action.type)
    switch (action.type) {
    case 'SET_NOTIFICATION':
        console.log('setting notification to: ', notification)
        notification = action.notification
        return notification
    case 'CLEAR_NOTIFICATION':
        return ''
    default:
        return notification
    }
}

export const notify = (notification, timeout) => {
    console.log('Notification begins...')
    return (dispatch) => {
        dispatch(showNotification(notification))
        setTimeout(() => {
            console.log('Notification ends...')
            dispatch(clearNotification())
        }, timeout*1000)
    }
}

export const showNotification = (notification) => {
    console.log('new notification: ', notification)
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        notification: ''
    }
}

export default notificationReducer