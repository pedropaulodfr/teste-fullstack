import React from 'react';
import './Alertas.css'
import { CgClose } from "react-icons/cg";


function Alertas(props) {
    return(
        <div className='alerta-container' style={{backgroundColor:`${props.corFundo}`}}>
            <div className='button-close-alerta'>
                <CgClose className='cgClose' onClick={() => {
                    props.statusExclusao(false)
                }} />
            </div>
            <div className='mensagem-alerta-content'>
                <p style={{color:`${props.corMensagem}`}}>{props.mensagem}</p>
            </div>
            <div className='tempo'>
                <div style={{backgroundColor:`${props.corBarraProgresso}`}}></div>
            </div>
        </div>
    )
}

export default Alertas;