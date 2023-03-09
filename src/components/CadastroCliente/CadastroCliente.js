import React from "react";
import { useState } from 'react';
import './CadastroCliente.css';
import { Link } from 'react-router-dom'
import '../ListaClientes/ListaClientes'

function CadastroCliente() {

    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    const formattedDate = formatter.format(currentDate);

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
    
            if (inputLength === 0) {
                inputCelular.value += '('
            }
            if (inputLength === 3) {
                inputCelular.value += ') '
            }
            if (inputLength === 6) {
                inputCelular.value += ' '
            }
            if (inputLength === 11) {
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

    const handleSalvarCliente = () => {
        console.log({nome, celular, status, dataNascimento, CEP, endereco, numero, complemento, bairro, cidade, uf});
        
        if (celular == "") {
            celular = "Não Informado"
        } 

        if (status == "ativo") {
            var statusBoolean = 1
        } else {
            var statusBoolean = 0
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

        const dataNascimentoFormatada = `${dia}/${mes}/${data.getFullYear()}`

        const listaPessoasString = localStorage.getItem("listaPessoas")
        const listaPessoas = JSON.parse(listaPessoasString)

        const novoCliente = {
            id: listaPessoas.length + 1,
            nome: nome,
            celular: celular,
            status: statusBoolean,
            dataNascimento: dataNascimentoFormatada,
            CEP: CEP,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        }
        
        listaPessoas.push(novoCliente)

        const listaPessoasAtualizada = JSON.stringify(listaPessoas)
        localStorage.setItem("listaPessoas", listaPessoasAtualizada)

        console.log(listaPessoas);

        alert("Dados salvos!")
        
    }


    return (
        <>
            <div className='cadastro-header'>
                <h2>Cadastro de Cliente</h2>
                <h2 className="data-atual">{formattedDate}</h2>
            </div>

            <div className='cadastro-cliente-content'>

                <div className="dados-pessoais-content">
                    <div className="dados-pessoais-title">
                        <h2>Dados Pessoais</h2>
                    </div>
                    
                    <div className="inputs">
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

                <div className="dados-endereco-content">
                    <div className="dados-endereco-title">
                        <h2>Dados de Endereço</h2>
                    </div>
                    
                    <div className="inputs">
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

                <div className="buttons">
                    <button className="salvar-btn" onClick={handleSalvarCliente}>Salvar Dados</button>
                    <Link to="/home">
                        <button className="voltar-btn">Voltar</button>
                    </Link>
                </div>


            </div>
    
            
        </>
    )
}

export default CadastroCliente;
