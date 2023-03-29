import React, { useEffect, useState } from "react";
import ModalConfirmacao from '../ModalConfirmacao/ModalConfirmacao';
import './TabelaClientes.css';
import api from '../../api';


function TabelaClientes() {

    const [showModal, setShowModal] = useState(false);


    const handleExcluirCliente = (clienteId) => {
        api
        .delete(`/Clientes/${clienteId}`)
        .then(response => {alert("Cliente Removido")})
        .catch(error => {console.log(error)})
    }


    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        api
        .get("/Clientes")
        .then((response) => setClientes(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    return(
        <>
            <div className="tabela-clientes">
                <table>
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>Celular</th>
                        <th>Data Nascimento</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(pessoa => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.telefone}</td>
                                <td>{pessoa.dataNascimento}</td>
                                <td>
                                    <h2 className={
                                        pessoa.status === true ? "statusAtivo" : "statusInativo"
                                    }>{
                                        pessoa.status === true ? "Ativo" : "Inativo"
                                    }
                                    </h2>
                                </td>
                                <td>
                                    <button 
                                        className="editar-btn">
                                        Editar
                                    </button>
                                    <button 
                                        className="excluir-btn" 
                                        onClick={() => setShowModal(true)}>
                                        Excluir
                                    </button>
                                    {showModal && (
                                        <ModalConfirmacao 
                                            message="Tem certeza que deseja excluir?" 
                                            onConfirm={() => handleExcluirCliente(pessoa.id)} 
                                            onCancel={() => setShowModal(false)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TabelaClientes