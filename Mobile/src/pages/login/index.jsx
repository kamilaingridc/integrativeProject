import React from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const schemaLogin = z.object({
    usuario: z.string().min(3, 'Mínimo de 3 caracteres').max(20, 'Máximo de 20 caracteres'),
    senha: z.string().min(6, 'Informe 6 caracteres').max(20, 'Máximo de 20 caracteres'),
});

const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://10.109.72.25:8000/api/token/', {
                username: data.usuario,
                password: data.senha
            });

            const { access, refresh } = response.data;

            await AsyncStorage.setItem('access_token', access);
            await AsyncStorage.setItem('refresh_token', refresh);

            console.log('Login bem-sucedido!');
            navigation.navigate('Mapa');
        } catch (error) {
            console.error('Erro de autenticação', error);
            Alert.alert('Erro de autenticação', 'Usuário ou senha incorretos');
        }
    };

    const handleRegister = () => {
        navigation.navigate('Registro'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.formulario}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={styles.campo}
                            placeholder="Usuário"
                        />
                    )}
                    name="usuario"
                    rules={{ required: true }}
                />
                {errors.usuario && (
                    <Text style={styles.mensagem}>{errors.usuario.message}</Text>
                )}

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={styles.campo}
                            placeholder="Senha"
                            secureTextEntry
                        />
                    )}
                    name="senha"
                    rules={{ required: true }}
                />
                {errors.senha && (
                    <Text style={styles.mensagem}>{errors.senha.message}</Text>
                )}

                <Button title="Entrar" onPress={handleSubmit(handleLogin)} style={styles.botao} />
                <Button title="Registrar" onPress={handleRegister} />
            </View>
        </View>
    );
};

export default Login;