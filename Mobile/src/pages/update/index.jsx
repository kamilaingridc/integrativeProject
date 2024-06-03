import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Update() {
    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [token, setToken] = useState('');
    const [erro, setErro] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(tokenY => {
                console.log("Token Read", tokenY);
                setToken(tokenY);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    const atualizar = async () => {
        console.log("Token Buscar", token);
        try {
            const dados = {
                nome: nome,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                cep: cep,
                email: email,
                numero: numero
            };

            const response = await axios.put('http://127.0.0.1:8000/api/usuario/' + userId, dados,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            console.log(response.data.id);
            console.log(response.data.nome);
            console.log(response.data.rua);
            console.log(response.data.bairro);
            console.log(response.data.cidade);
            console.log(response.data.uf);
            console.log(response.data.cep);
            console.log(response.data.email);
            console.log(response.data.numero);

            setNome('');
            setRua('');
            setBairro('');
            setCidade('');
            setUf('');
            setCep('');
            setEmail('');
            setNumero('');
        } catch (error) {
            setErro(error.response.status);
            console.error('Error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Update</Text>

            <TextInput
                placeholder="ID"
                style={styles.caixa}
                onChangeText={(e) => setUserId(e)}
                value={userId}
            />

            <TextInput
                placeholder="Nome"
                style={styles.caixa}
                onChangeText={(e) => setNome(e)}
                value={nome}
            />
            <TextInput
                placeholder="Rua"
                style={styles.caixa}
                onChangeText={(e) => setRua(e)}
                value={rua}
            />
            <TextInput
                placeholder="Número"
                style={styles.caixa}
                onChangeText={(e) => setNumero(e)}
                value={numero}
            />
            <TextInput
                placeholder="Bairro"
                style={styles.caixa}
                onChangeText={(e) => setBairro(e)}
                value={bairro}
            />
            <TextInput
                placeholder="Cidade"
                style={styles.caixa}
                onChangeText={(e) => setCidade(e)}
                value={cidade}
            />
            <TextInput
                placeholder="UF"
                style={styles.caixa}
                onChangeText={(e) => setUf(e)}
                value={uf}
            />
            <TextInput
                placeholder="CEP"
                style={styles.caixa}
                onChangeText={(e) => setCep(e)}
                value={cep}
            />
            <TextInput
                placeholder="Email"
                style={styles.caixa}
                onChangeText={(e) => setEmail(e)}
                value={email}
            />

            <Pressable
                style={styles.btn}
                onPress={atualizar}
            >
                <Text style={styles.textBtn}>Ok</Text>
            </Pressable>
        </View>
    );
}
