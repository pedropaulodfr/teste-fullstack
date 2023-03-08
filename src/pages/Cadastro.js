import React from 'react';

import CadastraCliente from '../components/CadastroCliente/CadastroCliente';

import Navbar from '../components/Navbar/Navbar'
import './Cadastro.css'


function Cadastro () {
    return (
        <>
           <div className='cadastro-container'></div>
           
           <Navbar />

           <div className='component-cadastra-cliente'>
                <CadastraCliente />
            </div>
        </>
    )
}

export default Cadastro