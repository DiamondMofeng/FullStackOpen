import React, { useState, useImperativeHandle } from "react";


const Togglable = React.forwardRef(({ buttonLable, children, inline }, ref) => {
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


export default Togglable