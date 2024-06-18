import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mapa from '../Componentes/Mapa';
import styles from './Localizacao.module.css';

export function Localizacao() {
    const [pontos, setPontos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('kamilaingridc.pythonanywhere.com/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const sensores = response.data;
                const pontos = sensores.map(sensor => ({
                    latitude: sensor.latitude,
                    longitude: sensor.longitude,
                    tipo: sensor.tipo,
                    localizacao: sensor.localizacao,
                }));
                setPontos(pontos);
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
        <div className={ styles.container }>
          <h1 className={ styles.title }>Localização dos Sensores</h1>
          <div className={ styles.mapa }>
            <Mapa pontos={pontos} />
          </div>         
        </div>
      );
}
