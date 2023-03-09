import React from 'react';
import { useState } from 'react';
import ModalConfirmacao from '../ModalConfirmacao/ModalConfirmacao';
import './TabelaClientes.css';

function TabelaClientes( {listaPessoas} ) {

    const [showModal, setShowModal] = useState(false);

    const handleExcluirCliente = (clienteId) => {

        for (let i = 0; i < listaPessoas.length; i++) {
            const pessoa = listaPessoas[i];
          
            if (pessoa.id === clienteId) {
                listaPessoas.splice(i, 1)
              break; 
            }
          }
        
        const listaPessoasAtualizada = JSON.stringify(listaPessoas)
        localStorage.setItem("listaPessoas", listaPessoasAtualizada)
        
        alert("Cliente removido!")
    }

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
                        {listaPessoas.map(pessoa => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.celular}</td>
                                <td>{pessoa.dataNascimento}</td>
                                <td>
                                    <h2 className={
                                        pessoa.status == 1 ? "statusAtivo" : "statusInativo"
                                    }>{
                                        pessoa.status == 1 ? "Ativo" : "Inativo"
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