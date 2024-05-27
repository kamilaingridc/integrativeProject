import React, { useEffect, useState } from 'react';
import axios from 'axios';
import estilos from './Sensor.module.css';

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchSensores();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div className={estilos.container}>
            <h1>Lista de Sensores</h1>
            <table className={estilos.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Localização</th>
                        <th>Responsável</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Alterar Dados</th>
                    </tr>
                </thead>
                <tbody>
                    {sensores.map(sensor => (
                        <tr key={sensor.id}>
                            <td>{sensor.id}</td>
                            <td>{sensor.tipo}</td>
                            <td>{sensor.localizacao}</td>
                            <td>{sensor.responsavel}</td>
                            <td>{sensor.longitude}</td>
                            <td>{sensor.latitude}</td>
                            {/* Aqui você pode adicionar o botão para alterar dados */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
