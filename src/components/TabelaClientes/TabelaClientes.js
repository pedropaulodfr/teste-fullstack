import React from 'react';
import './TabelaClientes.css';

function TabelaClientes( {listaPessoas} ) {

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
                                    <button className="editar-btn">Editar</button>
                                    <button className="excluir-btn">Excluir</button>
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