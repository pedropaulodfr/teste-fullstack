import React, { useEffect, useState } from "react";
import './ModalEdicao.css'
import api from "../../api";
import { CgClose } from "react-icons/cg";
import moment from 'moment';
import Alertas from "../Alertas/Alertas";


function ModalEdicao(props) {
    const [cliente, setCliente] = useState([])
    const [nome, setNome] = useState("")
    const [celular, setCelular] = useState("")
    const [status, setStatus] = useState()
    const [dataNascimento, setDataNascimento] = useState("")
    const [CEP, setCEP] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")
    const [edicaoErro, setEdicaoErro] = useState(false)

    useEffect(() => {
        api
    .get(`Clientes/${props.clienteId}`)
    .then((response) => {setCliente(response.data)})
    .catch((err) => {console.error(err)})
    }, []);

    useEffect(() => {
        if (edicaoErro) {
          const timer = setTimeout(() => {
            setEdicaoErro(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [edicaoErro]);

    const handleMascaras = () => {
        const inputCelular = document.querySelector("input.input-celular")
        
        inputCelular.addEventListener("keypress", () => {
            let inputLength = inputCelular.value.length
    
            if (inputLength == 0) {
                inputCelular.value += '('
            }
            if (inputLength == 3) {
                inputCelular.value += ') '
            }
            if (inputLength == 6) {
                inputCelular.value += ' '
            }
            if (inputLength == 11) {
                inputCelular.value += '-'
            }
        })


        const inputCEP = document.querySelector("input.input-CEP")
        inputCEP.addEventListener("keypress", () => {
            let inputLength = inputCEP.value.length

            if (inputLength === 5) {
                inputCEP.value += '-'
            }
        })
    }

    const handleVisualizarListaClientesAtualizada = () => {
        api
        .get(`/Clientes`)
        .then((response) => {props.listaClientes(response.data)})
        .catch((error) => {console.error(error)})
    }

    const handleAtualizarCliente = (id, statusModal) => {
        const data = new Date(dataNascimento)
        let dia = data.getDate()
        let mes = data.getMonth()

        if ((dia + 1) < 10) {
            dia = "0" + (dia + 1)
        } else {
            dia++
        }

        if ((mes + 1) < 10) {
            mes = "0" + (mes + 1)
        } else {
            mes++
        }

        const dataNascimentoFormatada = `${data.getFullYear()}-${mes}-${dia}`

        let booleanStatus = status === "true" ? true : false;
        let validacaoCelular = celular === "" ? "Não Informado": celular;

        api
        .put(`/Clientes/${id}`, {
            nome: nome,
            telefone: validacaoCelular,
            status: booleanStatus,
            dataNascimento: dataNascimentoFormatada,
            CEP: CEP,
            endereco: endereco,
            numeroResidencia: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        })
        .then((response) => {
            props.setStatus(true)
            statusModal(false);
            handleVisualizarListaClientesAtualizada();
        })
        .catch((err) => {
            console.error(err)
            setEdicaoErro(true)
        })
    }

    return (
        <div className='modal-edicao'>
            {edicaoErro && (
                <Alertas 
                    mensagem="Erro ao atualizar cliente!" 
                    corMensagem="#ffffff" 
                    corFundo="#B41616" 
                    corBarraProgresso="white" 
                    setStatus={setEdicaoErro}
                />
            )}
            <div className='button-close-modal'>
                <CgClose onClick={() => {props.statusModal(false)}} />
            </div>
            <div className='modal-edicao-content'>
                <div className="dados-pessoais-edicao-content">
                    <div className="dados-pessoais-edicao-title">
                        <h2>Dados Pessoais</h2>
                    </div>
                    
                    <div className="inputs-edicao">
                        <input 
                            id="input-nome"
                            type="text" 
                            placeholder={cliente.nome} 
                            value={nome} 
                            onChange={e => setNome(e.target.value)}
                            />
                        <input 
                            type="text" 
                            placeholder={cliente.telefone} 
                            className="input-celular"
                            maxLength="16"
                            value={celular} 
                            onChange={e => setCelular(e.target.value)} 
                            onClick={handleMascaras}
                        />
                        <select 
                            name={cliente.status}
                            value={status}
                            defaultValue=""
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="" disabled >Status</option>
                            <option value="ativo" >Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                        <input 
                            type="date" 
                            placeholder={moment(cliente.dataNascimento).format('YYYY-MM-DD')}
                            value={dataNascimento} 
                            onChange={e => setDataNascimento(e.target.value)}
                        />
                    </div>
                </div>
                <div className="dados-endereco-edicao-content">
                    <div className="dados-endereco-edicao-title">
                        <h2>Dados de Endereço</h2>
                    </div>
                    
                    <div className="inputs-edicao">
                        <input 
                            type="text" 
                            placeholder={cliente.cep} 
                            className="input-CEP"
                            maxLength="9"
                            value={CEP} 
                            onChange={e => setCEP(e.target.value)}
                            onClick={handleMascaras}
                            />
                        <input 
                            type="text" 
                            placeholder={cliente.endereco}  
                            value={endereco} 
                            onChange={e => setEndereco(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder={cliente.numeroResidencia}  
                            value={numero} 
                            onChange={e => setNumero(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder={cliente.complemento} 
                            value={complemento} 
                            onChange={e => setComplemento(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder={cliente.bairro} 
                            value={bairro} 
                            onChange={e => setBairro(e.target.value)}
                        />
                        <input 
                            type="text"
                             placeholder={cliente.cidade} 
                            value={cidade} 
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder={cliente.uf} 
                            maxLength="2"
                            value={uf} 
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                </div>
                <div className="button-salvar-edicao">
                    <button className="salvar-btn" onClick={() => {handleAtualizarCliente(props.clienteId, props.statusModal)}}>Atualizar Dados</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEdicao