import React from 'react';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import logoCSJ from '../assets/logo.png'
import './Login.css'
import api from '../api'

function Login () {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [clientes, setClientes] = useState([])
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  
  api
  .get(`/Usuarios`)
  .then((response) => {setClientes(response.data)})
  .catch((error) => {console.error(error)})

  
  const handleLogin = () => {
    for (let i = 0; i < clientes.length; i++) {
      
      if (clientes[i].email === email && clientes[i].senha === password) {
        localStorage.setItem("usuarioLogado", clientes[i].nome)
        navigate('/home')
      } else {
        setShowErrorMessage(true)
      }
    }
  }

  return (
    <div className="Container">

      <div className='cabecalho'  >

        <img src={logoCSJ} className='logoCSJ'/>
        <div>
          <h1>Para continuar realize o login com a sua conta</h1>
        </div>

      </div>

      <div className='formulario-login'>
      
        <div className='login-title'>
          <h1>Login</h1>
        </div>

        <div className='inputs-login'>
          <input 
            type="email"  
            placeholder='E-mail*'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='inputs-login'>
          <input 
            type="password" 
            placeholder='Senha*'
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </div>

        {showErrorMessage && <div className="error-message">E-mail ou senha incorretos</div>}

        <button className='form-btn' onClick={handleLogin}>Entrar</button>

      </div>
      
  </div>
  )
}

export default Login;