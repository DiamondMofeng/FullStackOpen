import React, { useState, useImperativeHandle } from "react";


const Togglable = React.forwardRef(({ buttonLable, children }, ref) => {
  const [visible, setVisible] = useState(false)

  //style
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //pass this function
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}
)


export default Togglable