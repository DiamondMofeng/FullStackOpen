import React, { useState, useImperativeHandle } from "react"
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ buttonLable, children }, ref) => {
  const [visible, setVisible] = useState(false)

  //style
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }



  //func
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //pass this function
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible} display='inline'>
        <button onClick={toggleVisibility}>{buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired
}


export default Togglable