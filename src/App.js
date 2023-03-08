import './App.css';
import React from 'react';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Cadastro from './pages/Cadastro';


function App() {

  const listaPessoas = [
    {
        id: "1",
        nome: "João dos Santos",
        celular: "(12) 98823-2343",
        dataNascimento: "27/01/1998",
        status: 0
    },
    {
        id: "2",
        nome: "Mariana Silva",
        celular: "Não Informado",
        dataNascimento: "01/02/2001",
        status: 1
    }
  ]
  
  const listaPessoasString = JSON.stringify(listaPessoas);
  localStorage.setItem('listaPessoas', listaPessoasString);

  return (
    <div className="App">

      <Router>
      <Routes>
        <Route exact  path="/" element={<Login/ >}></Route>
        <Route  path="/home" element={<Home/ >}></Route>
        <Route  path="/cadastro" element={<Cadastro/ >}></Route>
      </Routes>
    </Router>

    </div>
  );
}

export default App;
