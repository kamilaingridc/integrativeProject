import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import estilos from './CadUser.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaRegistro = z.object({
    nome: z.string(),
    email: z.string,
    usuario: z.string().min(5, 'Mínimo de 5 caracteres').max(20, 'Máximo de 10 caracteres'),
    senha: z.string().min(6, 'Informe 6 caracteres').max(6, 'Máximo de 6 caracteres'),
});

export function Registro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaRegistro)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: data.usuario,
                password: data.senha
            });

            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            console.log('Registro bem-sucedido!');
            navigate('/inicial');
        } catch (error) {
            console.error('Erro de autenticação', error);
        }
    }

    return (
        <div className={estilos.conteiner}>
            <p className={estilos.titulo}>Registro</p>

            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p className={estilos.mensagem}>{errors.usuario.message}</p>
                )}

                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p className={estilos.mensagem}>{errors.senha.message}</p>
                )}

                <button className={estilos.botao}>Entrar</button>
            </form>
        </div>
    );
}