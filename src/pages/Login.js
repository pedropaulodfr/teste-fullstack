import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom';
import logoCSJ from '../assets/logo.png'
import './Login.css'

function Login () {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailErr, setEmailErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)

  console.log({email, password});

  const handleLogin = () => {
    const listaUsuariosString = localStorage.getItem("listaUsuarios")
    const listaUsuarios = JSON.parse(listaUsuariosString)
    for (let i = 0; i < listaUsuarios.length; i++) {
      
      if (listaUsuarios[i].email === email && listaUsuarios[i].senha === password) {
        navigate('/home')
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
            {emailErr && <p>E-mail inválido!</p>}
        </div>

        <div className='inputs-login'>
          <input 
            type="password" 
            placeholder='Senha*'
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            {passwordErr && <p>Senha inválida!</p>}
        </div>

        <button className='form-btn' onClick={handleLogin}>Entrar</button>

      </div>
      
  </div>
  )
}

export default Login;