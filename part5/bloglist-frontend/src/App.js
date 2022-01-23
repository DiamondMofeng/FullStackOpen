import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginInfo from './components/LoginInfo'
import blogService from './services/blogs'


const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

 

  //get saved login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])



  return (
    <div>
      <div>
        <LoginInfo
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          user={user} setUser={setUser} />
      </div>
      <div>
        <BlogList />
      </div>
    </div>
  )
}


export default App