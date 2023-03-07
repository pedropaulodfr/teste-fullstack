import './App.css';

import logoCSJ from './assets/logo.png'

function App() {
  return (
    <div className="App">

      <div className='cabecalho'  >

        <img src={logoCSJ}  />
        <div>
          <h1>Para continuar realize o login com a sua conta</h1>
        </div>

      </div>

      <div className='formulario-login'>
        
        <div className='login-title'>
          <h1>Login</h1>
        </div>

        <div className='inputs'>
          <input type="email" />
          <span className='span-login' data-placeholder='Email'></span>
        </div>

        <div className='inputs'>
          <input type="password" />
          <span className='span-login' data-placeholder='Password'></span>
        </div>

        <div className='login-form-btn'>
          <button className='form-btn'>Entrar</button>
        </div>

      </div>

    </div>
  );
}

export default App;
