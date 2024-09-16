import {login} from '@/lib/auth'
import LoginForm from './LoginForm'
const Login = () => {
  return (
    <>
      <LoginForm login={login}/>
    </>
    
  )
}

export default Login