import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginInfo from './components/LoginInfo'
import Notification from './components/Notification'

import blogService from './services/blogs'


const App = () => {
  const [user, setUser] = useState(null)

  // includes{notice.msg,notice.type}
  const [notice, setNotice] = useState({})


  //get saved login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])


  if (user !== null) {
    return (
      <div>
        <Notification notice={notice} setNotice={setNotice} />
        <LoginInfo
          user={user} setUser={setUser}

          setNotice={setNotice} />
        <BlogList setNotice={setNotice} user={user}/>

      </div>
    )
  }
  else {
    return (
      <div>
        <Notification notice={notice} />
        <LoginInfo
          user={user} setUser={setUser}

          setNotice={setNotice} />
      </div>
    )
  }
}


export default App