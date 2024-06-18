import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Delete.module.css';

export function Delete() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`kamilaingridc.pythonanywhere.com/api/sensores/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setItem(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Erro ao buscar o item');
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`kamilaingridc.pythonanywhere.com/api/sensores/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setDeleted(true);
            console.log('Excluído com sucesso.')
            navigate('/');
        } catch (error) {
            console.error('Erro ao excluir o item:', error);
            setError('Erro ao excluir o item');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.deleteItem}>
            <h2>Excluir Item</h2>
            {item && (
                <div>
                    <p><strong>Tipo:</strong> {item.tipo}</p>
                    <p><strong>Localização:</strong> {item.localizacao}</p>
                    <p><strong>Responsável:</strong> {item.responsavel}</p>
                    <p><strong>Longitude:</strong> {item.longitude}</p>
                    <p><strong>Latitude:</strong> {item.latitude}</p>
                </div>
            )}
            <button onClick={handleDelete}>Excluir</button>
            {deleted && <p>Item excluído com sucesso!</p>}
        </div>
    );
}
