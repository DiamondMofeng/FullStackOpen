import React,{useState} from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'



const LoginInfo = ({  user, setUser,
  setNotice }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {

      const loginInfo = {
        username: username,
        password: password
      }
      const user = await loginService.login(loginInfo)
      //after succ

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      //after login
      setNotice({ msg: 'You have successfully login', type: '' })
      setTimeout(() => {
        setNotice(null)
      }, 5000)

      setUsername('')
      setPassword('')


    }
    catch {
      setNotice({ msg: 'Invalid username or password', type: 'error' })
      setTimeout(() => {
        setNotice(null)
      }, 5000)
      // console.log('fail to login!')
    }
  }


  const handleLogoff = (user, setUser) => {
    const handler = () => {
      console.log(user.name, 'is logging off')
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      console.log('log off succ')
    }
    return handler
  }




  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>Current user: {user.name} </p>
        <button onClick={handleLogoff(user, setUser)}>Log Off  </button>
      </div>
    )
  }
}
export default LoginInfo