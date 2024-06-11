import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Delete.module.css';

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
                const response = await axios.get(`http://127.0.0.1:8000/api/sensores/${id}`);
                setItem(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Error fetching the item');
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/sensores/${id}`); 
            setDeleted(true);
            navigate('/');
        } catch (error) {
            console.error('Error deleting the item:', error);
            setError('Error deleting the item');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="delete-item">
            <h2>Delete Item</h2>
            {item && (
                <div>
                    <p><strong>Tipo:</strong> {item.tipo}</p>
                    <p><strong>Localização:</strong> {item.localizacao}</p>
                    <p><strong>Responsável:</strong> {item.responsavel}</p>
                    <p><strong>Longitude:</strong> {item.longitude}</p>
                    <p><strong>Latitude:</strong> {item.latitude}</p>
                </div>
            )}
            <button onClick={handleDelete}>Delete</button>
            {deleted && <p>Item excluído com sucesso!</p>}
        </div>
    );
}
