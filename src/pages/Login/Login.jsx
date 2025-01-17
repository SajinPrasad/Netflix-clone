import React, {useState} from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [signState, setSignState] = useState('Sign In')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate  = useNavigate()

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (signState === 'Sign In') {
      await login(email, password)
    } else {
      const result = await signUp(name, email, password)
      if (result) {
        setSignState('Sign In')
        navigate('/login')
      }
    }
    setLoading(false)
  }
  
  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className='login'>
      <img src={Logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form id='signup-form'>
          {signState === 'Sign Up' ? 
          <input type="text" placeholder='Your Name' value={name} onChange={(e) => {setName(e.target.value)}} /> : <></>}
          <input type="email" placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
          <button type='submit' onClick={user_auth} >{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="signup-form">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
          <div className="form-switch">
            {signState === 'Sign In' ? <p>New to Netflix? <span onClick={() => {setSignState('Sign Up')}}>Sign Up Now</span></p>:
            <p>Already have account? <span onClick={() => {setSignState('Sign In')}}>Sign In Now</span></p>}
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login
