import React from 'react'

const Notification = ({ message, type }) => {
    console.log('messge:', message)
    if (message === null) {
      return null
    }
    let className = '';
    if (type === 'info'){
        className = 'notification'
    } else if (type === 'err'){
        className = 'error'
    }
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
  export default Notification