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
    const [celular, setCelular] = useState("")
    const [status, setStatus] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [CEP, setCEP] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")

    const handleSalvarCliente = () => {
        console.log({nome, celular, status, dataNascimento, CEP, endereco, numero, complemento, bairro, cidade, uf});

        const novoCliente = {
            nome: nome,
            celular: celular,
            status: status,
            dataNascimento: dataNascimento,
            CEP: CEP,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        }

        const listaPessoasString = localStorage.getItem("listaPessoas")
        const listaPessoas = JSON.parse(listaPessoasString)

        listaPessoas.push(novoCliente)

        const listaPessoasAtualizada = JSON.stringify(listaPessoas)
        localStorage.setItem("listaPessoas", listaPessoasAtualizada)

        console.log(listaPessoas);
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
                            value={celular} 
                            onChange={e => setCelular(e.target.value)} 
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
                            value={CEP} 
                            onChange={e => setCEP(e.target.value)}
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
