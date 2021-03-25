import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import api from '../../service/api';

import './Style.css'

import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';

function FormPotencia() {
    const history = useHistory();
    const [nome, setNome] = useState();
    const [csv, setCsv] = useState();
    const [curvas, setCurvas] = useState([]);
    const [chart, setChart] = useState();

    useEffect(() => {
        async function loadChart() {
            try {
                const response = await api.get('/');
                setCurvas(response.data);

                const ctx = document.getElementById('chart').getContext('2d');

                let datas = [''];
                let name;
                if (response.data.length === 0) {
                    name = '';
                } else {
                    name = response.data[0].nome;
                    datas = response.data[0].potencia;
                }

                setChart(new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: name,
                            backgroundColor: 'transparent',
                            borderColor: '#5586B2',
                            data: datas
                        }]
                    },

                    options: {
                        responsive: true,
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Velocidade do vento (m/s)'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Potência (KW)'
                                }
                            }]
                        }
                    }
                }));
            } catch (err) {
                alert('server error');
            }
        }

        loadChart();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (nome === undefined || csv === undefined) {
            alert('Campos inválidos');
            return;
        }

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('csv', csv);

        try {
            const response = await api.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('Cadastrado com sucesso');
                history.push('/');
                document.location.reload();
            }
        } catch (err) {
            alert('O nome da curva já existe. Por favor, tente outro');
        }
    }

    async function handleOption(e) {
        const option = e.target.value;
        try {
            const response = await api.get('/');

            setCurvas(response.data);
            const ctx = document.getElementById('chart').getContext('2d');

            let chartOption;

            response.data.forEach((e) => {
                if (e.nome === option) {
                    chartOption = e;
                }
            });

            let datas;
            let name;
            if (response.data.length === 0) {
                datas = [''];
                name = '';
            } else {
                name = chartOption.nome;
                datas = chartOption.potencia;
            }

            chart.destroy();
            setChart(new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: name,
                        backgroundColor: 'transparent',
                        borderColor: '#5586B2',
                        data: datas
                    }]
                },

                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Velocidade do vento (m/s)'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Potência (KW)'
                            }
                        }]
                    }
                }
            }));
        } catch (err) {
            alert('server error');
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <h1>Plotagem do gráfico com CSV</h1>
                <hr />
                <form className="form" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label>Curva de potência:</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Informe a curva de potência"
                            id="curva"
                            onChange={evt => setNome(evt.target.value)}
                        />
                    </div>

                    <div>
                        <label>Arquivo CSV:</label>
                        <br />
                        <input
                            accept=".csv"
                            type="file"
                            placeholder="Arquvo dos dados de potência"
                            onChange={evt => setCsv(evt.target.files[0])}
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                <br />
                <div className="custom-select">
                    <select>
                        {curvas.map(c => (
                            <option onClick={handleOption} key={c._id}>
                                {c.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <hr id="hrChart" />
                <div className="container">
                    <canvas id="chart" width="60vh" height="30vh"></canvas>
                </div>
            </div>
        </>
    );
}

export default FormPotencia;