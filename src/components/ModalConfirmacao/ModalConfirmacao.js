import React from 'react';
import './ModalConfirmacao.css'

function ModalConfirmacao(props) {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <p>{props.message}</p>
                <div className='modal-botoes'>
                    <button className='confirmar-btn' onClick={props.onConfirm}>Confirmar</button>
                    <button className='cancelar-btn' onClick={props.onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmacao