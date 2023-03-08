import React from 'react';
import ListaClientes from '../components/ListaClientes/ListaClientes';

import Navbar from '../components/Navbar/Navbar'
import './Home.css'


function Home () {
    return (
        <>
            <div className='home-container'>
                <Navbar />
                <div className='component-lista-clientes'>
                    <ListaClientes />
                </div>
            </div>
        </>
    )
}

export default Home