import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import './Edit.module.css';

const schemaEditSensor = z.object({
    tipo: z.string().nonempty('Tipo é obrigatório'),
    mac_address: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
    latitude: z.string().refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
    longitude: z.string().refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string().max(100, 'Máximo de 100 caracteres'),
    responsavel: z.string().max(100, 'Máximo de 100 caracteres'),
    unidade_medida: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
    status_operacional: z.boolean(),
    observacao: z.string().nullable(),
});

export function Edit() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [sensor, setSensor] = useState({
    tipo: '',
    mac_address: '',
    latitude: '',
    longitude: '',
    localizacao: '',
    responsavel: '',
    unidade_medida: '',
    status_operacional: false,
    observacao: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/sensores/${id}`);
        const sensorData = response.data; 
        setSensor(sensorData);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSensor();
  }, [id]);

  const editSensor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/sensores/${id}`, sensor, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSensor({ ...sensor, [name]: type === 'checkbox' ? checked : value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='edit-sensor'>
      <h2>Edite seu sensor</h2>
      <form onSubmit={editSensor}>
        <div className="form-control">
          <label htmlFor="tipo">Tipo</label>
          <input 
            type="text" 
            id='tipo' 
            name="tipo" 
            placeholder='Digite o tipo'
            value={sensor.tipo}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="mac_address">MAC Address</label>
          <input 
            type="text" 
            id='mac_address' 
            name="mac_address" 
            placeholder='Digite o MAC address'
            value={sensor.mac_address ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="localizacao">Localização</label>
          <input 
            type="text" 
            id='localizacao' 
            name="localizacao" 
            placeholder='Digite a localização'
            value={sensor.localizacao}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="responsavel">Responsável</label>
          <input 
            type="text" 
            id='responsavel' 
            name="responsavel" 
            placeholder='Digite o responsável'
            value={sensor.responsavel}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="text" 
            id='longitude' 
            name="longitude" 
            placeholder='Digite a longitude'
            value={sensor.longitude}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="text" 
            id='latitude' 
            name="latitude" 
            placeholder='Digite a latitude'
            value={sensor.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="unidade_medida">Unidade de Medida</label>
          <input 
            type="text" 
            id='unidade_medida' 
            name="unidade_medida" 
            placeholder='Digite a unidade de medida'
            value={sensor.unidade_medida ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="status_operacional">Status Operacional</label>
          <input 
            type="checkbox" 
            id='status_operacional' 
            name="status_operacional" 
            checked={sensor.status_operacional}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="observacao">Observação</label>
          <input 
            type="text" 
            id='observacao' 
            name="observacao" 
            placeholder='Digite a observação'
            value={sensor.observacao ?? ''}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Editar Sensor" className='btn' />
      </form>
    </div>
  );
};