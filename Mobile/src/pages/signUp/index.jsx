import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, Pressable, Alert } from 'react-native';
import styles from './styles';

export default function Create({ navigation }) {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [erro, setErro] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        // Suponha que você tenha recebido o token como resposta de uma requisição
        const tokenX = token;

        // Salvar o token no AsyncStorage
        AsyncStorage.setItem('token', tokenX)
            .then(() => {
                if (token != null) {
                    console.log('Token SignUPX: ', token)
                    console.log('Token salvo com sucesso!');
                }
            })
            .catch(error => {
                console.error('Erro ao salvar token:', error);
            });
    }, [token]);

    const createUser = async () => {
        console.log("User", usuario);
        console.log("Senha", password);
        try {
            const response = await axios.post('http://127.0.0.1:8000/create_user/',
                {
                    username: usuario,
                    password: password,
                });
            const resp = await axios.post('http://127.0.0.1:8000/token/',
                {
                    username: usuario,
                    password: password,
                })
            setToken(resp.data.access);
            navigation.navigate("Read")
        } catch (error) {
            setErro(error.message);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>CREATE</Text>

            <View style={styles.campos}>
                <Text style={styles.texto2}>Nome:</Text>
                <TextInput
                    style={styles.textoNomeEmail}
                    onChangeText={setUsuario}
                    value={usuario}
                />
                <Text style={styles.texto2}>Senha:</Text>
                <TextInput
                    style={styles.addNew}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.btnBtn}>
                <Pressable
                    style={styles.btn}
                    onPress={createUser}
                >
                    <Text style={styles.btnCadastrar}>CADASTRAR</Text>
                </Pressable>
            </View>

            <View style={{ width: "80%" }}>
                <Text style={styles.textoErro}>{!erro ? '' : 'Erro: '}{erro}</Text>
            </View>
        </View>
    );
}


