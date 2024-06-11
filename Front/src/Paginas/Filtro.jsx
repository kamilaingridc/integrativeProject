import React, { useState } from 'react';
import axios from 'axios';
import styles from './Filtro.module.css';

export function Filtro() {
    const [filters, setFilters] = useState({
        responsavel: '',
        status_operacional: false,
        tipo: '',
        localizacao: '',
    });

    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/api/sensor_filter/', filters, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSensors(response.data);
        } catch (error) {
            console.error('Error fetching sensors:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <label className={styles.label} htmlFor="responsavel">Responsável</label>
                <input className={styles.input} type="text" id="responsavel" name="responsavel" value={filters.responsavel} onChange={handleChange} />

                <label className={styles.label} htmlFor="status_operacional">Status Operacional *</label>
                <input className={styles.input} type="checkbox" id="status_operacional" name="status_operacional" checked={filters.status_operacional} onChange={handleChange} />

                <label className={styles.label} htmlFor="tipo">Tipo</label>
                <input className={styles.input} type="text" id="tipo" name="tipo" value={filters.tipo} onChange={handleChange} />

                <label className={styles.label} htmlFor="localizacao">Localização</label>
                <input className={styles.input} type="text" id="localizacao" name="localizacao" value={filters.localizacao} onChange={handleChange} />

                <button className={styles.botao} type="submit">Filtrar</button>
            </form>

            {loading && <div>Carregando...</div>}
            {error && <div>Erro ao buscar sensores: {error.message}</div>}

            <div className={styles.conteiner}>
                <h1>Sensores Filtrados</h1>
                <ul>
                    {sensors.map(sensor => (
                        <li key={sensor.id}>{sensor.tipo} - {sensor.localizacao} - {sensor.responsavel}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
