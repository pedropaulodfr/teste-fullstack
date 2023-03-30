import React, { useEffect, useState } from "react";
import './ModalEdicao.css'
import api from "../../api";
import { CgClose } from "react-icons/cg";
import moment from 'moment';



function ModalEdicao(props) {
    const [cliente, setCliente] = useState([])
    const [nome, setNome] = useState("")
    let [celular, setCelular] = useState("")
    const [status, setStatus] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [CEP, setCEP] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")

    useEffect(() => {
        api
    .get(`Clientes/${props.clienteId}`)
    .then((response) => {setCliente(response.data)})
    .catch((err) => {console.error(err)})
    }, []);

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

    const handleAtualizarCliente = (id, statusModal) => {
        if (celular === "") {
            celular = "Não Informado"
        } 

        if (status === "ativo") {
            var statusBoolean = true
        } else {
            var statusBoolean = false
        }
        
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

        api
        .put(`/Clientes/${id}`, {
            nome: nome,
            telefone: celular,
            status: statusBoolean,
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
            alert("Usuário Atualizado");
            statusModal(false);
        })
        .catch((err) => {console.error(err)})
    }

    return (
        <div className='modal-edicao'>
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
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="" disabled selected>Status</option>
                            <option value="ativo" selected>Ativo</option>
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