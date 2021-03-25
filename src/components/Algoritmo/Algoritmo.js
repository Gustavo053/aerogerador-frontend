import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from '../../service/api';

import './Style.css';

function Busca() {
    const [numero, setNumero] = useState();
    const [numeroSoma, setNumeroSoma] = useState();
    const [lista, setLista] = useState([]);
    const [span, setSPan] = useState();

    useEffect(() => {
        async function loadList() {
            //Desabilita o campo de resultado quando a página é carregada
            document.getElementById('align-span').style.display = 'none';

            try {
                const response = await axios.get('/algoritmo');
                setLista(response.data);
            } catch {
                alert('server error');
            }
        }

        loadList();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (numero === '' || numero === undefined) {
            alert('O campo não pode ser vazio');
            return;
        }

        try {
            const response = await axios.post('/algoritmo', { numero: numero });
            if (response.status === 200) {
                alert('Número cadastrado com sucesso');
                document.location.reload();
            }
        } catch (err) {
            alert('server error');
        }
    }

    async function handleAlgorithm(e) {
        e.preventDefault();

        if (numeroSoma === '' || numeroSoma === undefined) {
            alert('O campo não pode ser vazio');
            return;
        }

        for (let i = 0; i < lista.length; i++) {
            for (let j = 0; j < lista.length; j++) {
                if (lista[i].numero + lista[j].numero === parseInt(numeroSoma) && i !== j) {
                    setSPan('Números somados que dão o mesmo resultado: ' + lista[i].numero + ' e ' + lista[j].numero);
                    document.getElementById('align-span').style.display = 'block';

                    return;
                }
            }
        }

        setSPan('Não há números somados na lista que dão o mesmo valor');
        document.getElementById('align-span').style.display = 'block';
    }

    return (
        <>
            <Header />
            <div className="container-algoritmo">
                <h1>Algoritmo de soma e cadastro de números</h1>
                <hr />
                <div className="forms">
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="Insira um número inteiro"
                            className="margin-top-50"
                            type="number"
                            required
                            onChange={evt => setNumero(evt.target.value)}
                        />
                        <button type="submit">Adicionar</button>
                    </form>
                    <br />
                    <form onSubmit={handleAlgorithm}>
                        <input
                            placeholder="Insira um número inteiro"
                            className="margin-top-50"
                            type="number"
                            onChange={evt => setNumeroSoma(evt.target.value)}
                        />
                        <button type="submit">Rodar algoritmo</button>
                    </form>
                </div>
                <div id="align-span">
                    <span id="result">{span}</span>
                </div>
                <hr id="hrList" />
                <h3>Lista:</h3>
                <div className="lista">
                    <ul>
                        {lista.map(i => (
                            <li key={i._id}>
                                <div className="container-url">
                                    {i.numero}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Busca;