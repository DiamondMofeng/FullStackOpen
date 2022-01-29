import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginInfo from './components/LoginInfo'
import Notification from './components/Notification'

import blogService from './services/blogs'


const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          user={user} setUser={setUser}

          setNotice={setNotice} />
        <BlogList setNotice={setNotice} />

      </div>
    )
  }
  else {
    return (
      <div>
        <Notification notice={notice} />
        <LoginInfo
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          user={user} setUser={setUser}

          setNotice={setNotice} />
      </div>
    )
  }
}


export default App