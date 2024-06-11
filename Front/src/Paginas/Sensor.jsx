import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sensor.module.css';
import { Link } from 'react-router-dom';

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        responsavel: '',
        status_operacional: false,
        tipo: '',
        localizacao: '',
    });

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
        const token = localStorage.getItem('access_token');
        const response = await axios.post('http://127.0.0.1:8000/api/sensor_filter/', filters, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        setSensores(response.data);
        setLoading(false);

    };   

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
        <>
        <div className="forms">
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
            </div>
        
        <div className={styles.container}>
            <h1>Lista de Sensores</h1>

            
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Localização</th>
                        <th>Responsável</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sensores.map((sensor) => (
                        <tr key={sensor.id}>
                            <td>{sensor.id}</td>
                            <td>{sensor.tipo}</td>
                            <td>{sensor.localizacao}</td>
                            <td>{sensor.responsavel}</td>
                            <td>{sensor.longitude}</td>
                            <td>{sensor.latitude}</td>
                            <td>
                                <div className="methods">
                                    <Link to={`/edit/${sensor.id}`} className='botaoEditar'>
                                        Edit
                                    </Link>
                                    <Link to={`/delete/${sensor.id}`} className='botaoDeletar'>
                                        Delete
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
        </>
    );
}
