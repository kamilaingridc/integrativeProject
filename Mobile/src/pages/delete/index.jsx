import axios from "axios"
import { useState, useEffect } from "react"
import { View, Text, Pressable, TextInput } from "react-native"
import styles from "./styles"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Delete() {
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState(''); 
    const [erro, setErro] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(tokenY => {
                console.log("Token Read", tokenY);
                setToken(tokenY);
            }).catch(error => {
                console.log(error);
            });
    }, [token]);

    const apagar = async () => {
        console.log("Token Delete", token);
        try {
            await axios.delete('http://127.0.0.1:8000/api/usuario/' + userId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(userId + " apagado.");
        } catch (error) {
            setErro(error.response.status);
            console.error('Error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Delete</Text>

            <TextInput
                placeholder="ID"
                style={styles.caixa}
                onChangeText={(text) => setUserId(text)}
                value={userId}
                keyboardType="numeric"
            />

            <Pressable
                style={styles.btn}
                onPress={apagar}
            >
                <Text style={styles.textBtn}>Excluir</Text>
            </Pressable>
        </View>
    );
}
