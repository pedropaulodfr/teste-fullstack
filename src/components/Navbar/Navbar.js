import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'

import logoBrancaCSJ from '../../assets/logo-csjgroup-branco.png'

import { FaPowerOff } from "react-icons/fa";

const username = localStorage.getItem("usuarioLogado")

function Navbar() {
    return (
        <div className='navbar'>

            <div className='logo-content'>
                <img src={logoBrancaCSJ} className='logo-nav-csj'></img>
            </div>

            <div className='username-logout'>
                <div className='nome-usuario-content'>
                    <h2 className='nome-usuario'>{username}</h2>
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