import React, { useState } from "react";
import './ModalEdicao.css'
import { CgClose } from "react-icons/cg";


function ModalEdicao(props) {
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
                            type="text" 
                            placeholder="Nome" 
                            value={nome} 
                            onChange={e => setNome(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Celular"
                            className="input-celular"
                            maxLength="16"
                            value={celular} 
                            onChange={e => setCelular(e.target.value)} 
                            onClick={handleMascaras}
                        />
                        <select 
                            name="Status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="" disabled selected>Status</option>
                            <option value="ativo" selected>Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                        <input 
                            type="date" 
                            placeholder="Data Nascimento" 
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
                            placeholder="CEP" 
                            className="input-CEP"
                            maxLength="9"
                            value={CEP} 
                            onChange={e => setCEP(e.target.value)}
                            onClick={handleMascaras}
                        />
                        <input 
                            type="text" 
                            placeholder="Endereço" 
                            value={endereco} 
                            onChange={e => setEndereco(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Nº" 
                            value={numero} 
                            onChange={e => setNumero(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Complemento" 
                            value={complemento} 
                            onChange={e => setComplemento(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Bairro" 
                            value={bairro} 
                            onChange={e => setBairro(e.target.value)}
                        />
                        <input 
                            type="text"
                             placeholder="Cidade"
                            value={cidade} 
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="UF"
                            maxLength="2"
                            value={uf} 
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                </div>
                <div className="button-salvar-edicao">
                    <button className="salvar-btn" onClick={""}>Salvar Dados</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEdicao