import React, { useEffect, useState } from "react";
import ModalConfirmacao from '../ModalConfirmacao/ModalConfirmacao';
import ModalEdicao from "../ModalEdicao/ModalEdicao";
import Alertas from "../Alertas/Alertas";
import './TabelaClientes.css';
import api from '../../api';


function TabelaClientes(props) {
    const [showModal, setShowModal] = useState(false);
    const [showModalEdicao, setShowModalEdicao] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [clientesPesquisa, setClientesPesquisa] = useState([]);
    const [clienteSelecionadoId, setClienteSelecionadoId] = useState(null);
    const [exclusaoSucesso, setExclusaoSucesso] = useState(false);
    const [edicaoSucesso, setEdicaoSucesso] = useState(false)


    useEffect(() => {
        api
        .get("/Clientes")
        .then((response) => {setClientes(response.data); setClientesPesquisa(response.data)})
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    useEffect(() => {
        const handlePesquisaCliente = () => {
            let resultadoPesquisa = clientes.filter(cliente => cliente.nome.toLowerCase().startsWith(props.pesquisa.toLowerCase()));
            setClientes(resultadoPesquisa)

            if (props.pesquisa == "") {
                setClientes(clientesPesquisa)
            }
        }
    
        if (props.statusPesquisa) {
            handlePesquisaCliente();
        }
    }, [props.pesquisa])

    useEffect(() => {
        if (exclusaoSucesso || edicaoSucesso) {
          const timer = setTimeout(() => {
            setExclusaoSucesso(false);
            setEdicaoSucesso(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [exclusaoSucesso, edicaoSucesso]);


    const handleExcluirCliente = (clienteId) => {
        api
        .delete(`/Clientes/${clienteId}`)
        .then(() => {
            setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
        })
        .catch(error => {console.log(error)})
        
    }

    console.log(clientes);

    return(
        <>
            {showModalEdicao && (
                <ModalEdicao 
                    statusModal={setShowModalEdicao} 
                    clienteId={clienteSelecionadoId} 
                    listaClientes={setClientes}
                    setStatus={setEdicaoSucesso}
                />
            )}
            {exclusaoSucesso && (
                <Alertas 
                    mensagem="Cliente removido com sucesso!" 
                    corMensagem="#ffffff" corFundo="#219653" 
                    corBarraProgresso="white" 
                    setStatus={setExclusaoSucesso}
                />
            )}
            {edicaoSucesso && (
                <Alertas 
                    mensagem="Cliente atualizado com sucesso!" 
                    corMensagem="#ffffff" corFundo="#219653" 
                    corBarraProgresso="white" 
                    setStatus={setEdicaoSucesso}
                />
            )}
            <div className="tabela-clientes">
                {clientes.length === 0 ? (<p>Nenhum cliente cadastrado</p>) : 
                (<table>
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
                                <td>{new Date(pessoa.dataNascimento).toLocaleDateString('pt-BR')}</td>
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
                                        className="editar-btn"
                                        onClick={() => {
                                            setClienteSelecionadoId(pessoa.id);
                                            setShowModalEdicao(true)
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="excluir-btn" 
                                        onClick={() => {
                                            setClienteSelecionadoId(pessoa.id);
                                            setShowModal(true)
                                        }}
                                    >
                                        Excluir
                                    </button>
                                    {showModal && clienteSelecionadoId === pessoa.id && (
                                        <ModalConfirmacao 
                                            message="Tem certeza que deseja excluir?" 
                                            onConfirm={() => {
                                                handleExcluirCliente(clienteSelecionadoId);
                                                setClienteSelecionadoId(null);
                                                setShowModal(false);
                                                setExclusaoSucesso(true);
                                            }} 
                                            onCancel={() => {
                                                setClienteSelecionadoId(null);
                                                setShowModal(false)
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
            </div>
        </>
    )
}

export default TabelaClientes;
