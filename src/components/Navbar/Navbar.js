import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'

import logoBrancaCSJ from '../../assets/logo-csjgroup-branco.png'

import { FaPowerOff } from "react-icons/fa";

const username = {
    id: 1,
    name: "Pedro Paulo Dantas Franco Rocha",
    cpf: "70200443445"
}

function Navbar() {
    return (
        <div className='navbar'>

            <div className='logo-content'>
                <img src={logoBrancaCSJ} className='logo-nav-csj'></img>
            </div>

            <div className='username-logout'>
                <div className='nome-usuario-content'>
                    <h2 className='nome-usuario'>{username.name}</h2>
                </div>

                <div className='logout-content'>
                    <Link to="/">
                        <FaPowerOff className='logout-btn' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar