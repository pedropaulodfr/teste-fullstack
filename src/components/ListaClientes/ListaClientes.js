import React, { useState } from "react";
import TabelaClientes from "../TabelaClientes/TabelaClientes";
import './ListaClientes.css';
import { Link } from 'react-router-dom'


function ListaClientes() {

    const [pesquisa, setPesquisa] = useState("")
    const [statusPesquisa, setStatusPesquisa] = useState()

    return (
        <>
            <div className='lista-header'>
                <h2>Lista de Clientes</h2>
                <Link to="/cadastro">
                    <button className='cadastrar-novo-btn'>Cadastrar Novo</button>
                </Link>
            </div>

             <div className='lista-clientes-content'>

                <div className='lista-body'>
                    <div className='lista-top'>
                        <h2 className="clientes-title">Clientes</h2>
                        <input 
                            type="text" 
                            placeholder="Pesquisar"
                            onChange={(e) => {setPesquisa(e.target.value); setStatusPesquisa(true)}}
                        />
                    </div>
                </div>

                <TabelaClientes pesquisa={pesquisa} statusPesquisa={statusPesquisa}/>
                
            </div>
        </>
    )
}

export default ListaClientes;
