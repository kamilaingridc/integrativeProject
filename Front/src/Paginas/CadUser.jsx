import { useState } from 'react';
import styles from './CadUser.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const schemaRegistro = z.object({
  email: z.string()
    .email('Por favor, insira um email válido')
    .min(5, 'Por favor, insira pelo menos 5 caracteres')
    .max(100, "Por favor, insira até 100 caracteres"),
  username: z.string()
    .min(5, 'Por favor, insira pelo menos 5 caracteres')
    .max(100, "Por favor, insira até 100 caracteres"),
  password: z.string()
    .min(6, 'Por favor, insira pelo menos 6 caracteres')
    .max(100, "Por favor, insira até 100 caracteres")
});

export function Registro() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaRegistro)
  });

  async function obterDadosFormulario(data) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_user', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      alert('Usuário cadastrado com sucesso!');
      navigate('/'); 
    } catch (error) {
      console.error('Erro no Registro do usuário', error);
    }
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.formulario}
        onSubmit={handleSubmit(obterDadosFormulario)}
      >
        <h1 className={styles.titulo}>Registro</h1>

        <div className={styles.campo}>
          <label>Email</label>
          <input
            {...register('email')}
            type="email"
          />
          {errors.email && (
            <p className={styles.messageErro}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.campo}>
          <label>Username</label>
          <input
            {...register('username')}
          />
          {errors.username && (
            <p className={styles.messageErro}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles.campo}>
          <label>Password</label>
          <input
            {...register('password')}
            type="password"
          />
          {errors.password && (
            <p className={styles.messageErro}>{errors.password.message}</p>
          )}
        </div>

        <button className={styles.button} type="submit">Entrar</button>
      </form>
    </div>
  );
}
