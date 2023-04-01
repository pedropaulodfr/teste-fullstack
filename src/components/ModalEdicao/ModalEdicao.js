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

    const [novoNome, setNovoNome] = useState(false)
    const [novoCelular, setNovoCelular] = useState(false)
    const [novoStatus, setNovoStatus] = useState(false)
    const [novoDataNascimento, setNovoDataNascimento] = useState(false)
    const [novoCEP, setNovoCEP] = useState(false)
    const [novoEndereco, setNovoEndereco] = useState(false)
    const [novoNumero, setNovoNumero] = useState(false)
    const [novoComplemento, setNovoComplemento] = useState(false)
    const [novoBairro, setNovoBairro] = useState(false)
    const [novoCidade, setNovoCidade] = useState(false)
    const [novoUf, setNovoUf] = useState(false)

    
    useEffect(() => {
        if (!novoNome) {setNome(cliente.nome)}
        if (!novoCelular) {setCelular(cliente.telefone)}
        if (!novoStatus) {setStatus(cliente.status)}
        if (!novoDataNascimento) {setDataNascimento(cliente.dataNascimento)}
        if (!novoCEP) {setCEP(cliente.cep)}
        if (!novoEndereco) {setEndereco(cliente.endereco)}
        if (!novoNumero) {setNumero(cliente.numeroResidencia)}
        if (!novoComplemento) {setComplemento(cliente.complemento)}
        if (!novoBairro) {setBairro(cliente.bairro)}
        if (!novoCidade) {setCidade(cliente.cidade)}
        if (!novoUf) {setUf(cliente.uf)}
    })

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

    function handleChangeNome(event) {setNovoNome(true); setNome(event.target.value)}
    function handleChangeCelular(event) {setNovoCelular(true); setCelular(event.target.value)}
    function handleChangeStatus(event) {setNovoStatus(true); setStatus(event.target.value)}
    function handleChangeDataNascimento(event) {setNovoDataNascimento(true); setDataNascimento(event.target.value)}
    function handleChangeCEP(event) {setNovoCEP(true); setCEP(event.target.value)}
    function handleChangeEndereco(event) {setNovoEndereco(true); setEndereco(event.target.value)}
    function handleChangeNumero(event) {setNovoNumero(true); setNumero(event.target.value)}
    function handleChangeComplemento(event) {setNovoComplemento(true); setComplemento(event.target.value)}
    function handleChangeBairro(event) {setNovoBairro(true); setBairro(event.target.value)}
    function handleChangeCidade(event) {setNovoCidade(true); setCidade(event.target.value)}
    function handleChangeUf(event) {setNovoUf(true); setUf(event.target.value)}

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
        let mes = (data.getMonth() + 1)

        const dataNascimentoFormatada = `${data.getFullYear()}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`

        let booleanStatus = status === "ativo" || status === true ? true : false;
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
                            type="text" 
                            placeholder={"Nome"} 
                            value={nome} 
                            onChange={handleChangeNome}
                            />
                        <input 
                            type="text" 
                            placeholder={"Celular"} 
                            className="input-celular"
                            maxLength="16"
                            value={celular} 
                            onChange={handleChangeCelular} 
                            onClick={handleMascaras}
                        />
                        <select 
                            name="Status"
                            value={status === true || status === "ativo" ? "ativo" : "inativo"}
                            defaultValue=""
                            onChange={handleChangeStatus}
                            onClick={handleChangeStatus}
                        >
                            <option value="" disabled >Status</option>
                            <option value="ativo" >Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                        <input 
                            type="date" 
                            value={moment(dataNascimento).format('YYYY-MM-DD')} 
                            onChange={handleChangeDataNascimento}
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
                            placeholder="CEP" 
                            className="input-CEP"
                            maxLength="9"
                            value={CEP} 
                            onChange={handleChangeCEP}
                            onClick={handleMascaras}
                            />
                        <input 
                            type="text" 
                            placeholder="Endereco"
                            value={endereco} 
                            onChange={handleChangeEndereco}
                        />
                        <input 
                            type="text" 
                            placeholder="Numero"  
                            value={numero} 
                            onChange={handleChangeNumero}
                        />
                        <input 
                            type="text" 
                            placeholder="Complemento"
                            value={complemento} 
                            onChange={handleChangeComplemento}
                        />
                        <input 
                            type="text" 
                            placeholder="Bairro"
                            value={bairro} 
                            onChange={handleChangeBairro}
                        />
                        <input 
                            type="text"
                            placeholder="Cidade"
                            value={cidade} 
                            onChange={handleChangeCidade}
                        />
                        <input 
                            type="text" 
                            placeholder="UF"
                            maxLength="2"
                            value={uf} 
                            onChange={handleChangeUf}
                        />
                    </div>
                </div>
                <div className="button-salvar-edicao">
                    <button 
                        className="salvar-btn" 
                        onClick={() => {handleAtualizarCliente(props.clienteId, props.statusModal)}}
                    >Atualizar Dados
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEdicao