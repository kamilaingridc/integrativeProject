import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import styles from './Edit.module.css';

const schemaEditSensor = z.object({
  tipo: z.string().nonempty('Tipo é obrigatório'),
  mac_address: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
  latitude: z.union([z.string(), z.number()]).refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
  longitude: z.union([z.string(), z.number()]).refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
  localizacao: z.string().max(100, 'Máximo de 100 caracteres'),
  responsavel: z.string().max(100, 'Máximo de 100 caracteres'),
  unidade_medida: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
  status_operacional: z.boolean(),
  observacao: z.string().nullable(),
});

export function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(`Edit component mounted with id: ${id}`);

  const [sensor, setSensor] = useState({
    tipo: '',
    mac_address: '',
    latitude: '',
    longitude: '',
    localizacao: '',
    responsavel: '',
    unidade_medida: '',
    status_operacional: false,
    observacao: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/sensores/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const sensorData = response.data;
        setSensor(sensorData);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching sensor:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSensor();
  }, [id]);

  const editSensor = async (e) => {
    e.preventDefault();

    try {
      schemaEditSensor.parse(sensor);
      const response = await axios.put(`http://127.0.0.1:8000/api/sensores/${id}/`, sensor, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Sensor edited successfully:', response.data);
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach(err => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error('Error editing sensor:', error);
        setError(error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSensor(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.editSensor}>
      <h2>Edite seu sensor</h2>
      <form onSubmit={editSensor}>
        <div className={styles.formControl}>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            placeholder="Digite o tipo"
            value={sensor.tipo}
            onChange={handleChange}
          />
          {validationErrors.tipo && <span className={styles.error}>{validationErrors.tipo}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="mac_address">MAC Address</label>
          <input
            type="text"
            id="mac_address"
            name="mac_address"
            placeholder="Digite o MAC address"
            value={sensor.mac_address ?? ''}
            onChange={handleChange}
          />
          {validationErrors.mac_address && <span className={styles.error}>{validationErrors.mac_address}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="localizacao">Localização</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            placeholder="Digite a localização"
            value={sensor.localizacao}
            onChange={handleChange}
          />
          {validationErrors.localizacao && <span className={styles.error}>{validationErrors.localizacao}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="responsavel">Responsável</label>
          <input
            type="text"
            id="responsavel"
            name="responsavel"
            placeholder="Digite o responsável"
            value={sensor.responsavel}
            onChange={handleChange}
          />
          {validationErrors.responsavel && <span className={styles.error}>{validationErrors.responsavel}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            placeholder="Digite a longitude"
            value={sensor.longitude}
            onChange={handleChange}
          />
          {validationErrors.longitude && <span className={styles.error}>{validationErrors.longitude}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            placeholder="Digite a latitude"
            value={sensor.latitude}
            onChange={handleChange}
          />
          {validationErrors.latitude && <span className={styles.error}>{validationErrors.latitude}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="unidade_medida">Unidade de Medida</label>
          <input
            type="text"
            id="unidade_medida"
            name="unidade_medida"
            placeholder="Digite a unidade de medida"
            value={sensor.unidade_medida ?? ''}
            onChange={handleChange}
          />
          {validationErrors.unidade_medida && <span className={styles.error}>{validationErrors.unidade_medida}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="status_operacional">Status Operacional</label>
          <input
            type="checkbox"
            id="status_operacional"
            name="status_operacional"
            checked={sensor.status_operacional}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="observacao">Observação</label>
          <input
            type="text"
            id="observacao"
            name="observacao"
            placeholder="Digite a observação"
            value={sensor.observacao ?? ''}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Editar Sensor" className={styles.btn} />
      </form>
    </div>
  );
}
