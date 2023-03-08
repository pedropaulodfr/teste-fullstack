import React from "react";
import TabelaClientes from "../TabelaClientes/TabelaClientes";
import './ListaClientes.css';
import { Link } from 'react-router-dom'

const listaPessoasString = localStorage.getItem("listaPessoas")
const listaPessoas = JSON.parse(listaPessoasString)

function ListaClientes() {

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
                        <input type="text" placeholder="Pesquisar"/>
                    </div>
                </div>

                <TabelaClientes listaPessoas={listaPessoas} />
                
            </div>
        </>
    )
}

export default ListaClientes;
