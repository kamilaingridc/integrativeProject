import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import styles from './styles'; 

const schemaRegistro = z.object({
  email: z.string()
    .email('Por favor, insira um email válido')
    .min(5, 'Por favor, insira pelo menos 5 caracteres')
    .max(100, 'Por favor, insira até 100 caracteres'),
  username: z.string()
    .min(5, 'Por favor, insira pelo menos 5 caracteres')
    .max(100, 'Por favor, insira até 100 caracteres'),
  password: z.string()
    .min(6, 'Por favor, insira pelo menos 6 caracteres')
    .max(100, 'Por favor, insira até 100 caracteres')
});

const Registro = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaRegistro)
  });

  const handleRegistro = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_user/', data);
      Alert.alert('Usuário cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro no Registro do usuário', error);
      Alert.alert('Erro no Registro do usuário', 'Ocorreu um erro ao tentar registrar. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      <View style={styles.formulario}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.campo}
              placeholder="Email"
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        {errors.email && (
          <Text style={styles.mensagemErro}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.campo}
              placeholder="Username"
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && (
          <Text style={styles.mensagemErro}>{errors.username.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.campo}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        {errors.password && (
          <Text style={styles.mensagemErro}>{errors.password.message}</Text>
        )}

        <Button title="Registrar" onPress={handleSubmit(handleRegistro)} style={styles.botao} />
      </View>
    </View>
  );
};

export default Registro;
