import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCDD2', // Vermelho claro
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    color: '#D32F2F', // Vermelho escuro
  },
  formulario: {
    width: '80%',
  },
  campo: {
    height: 40,
    borderWidth: 1,
    borderColor: '#EF9A9A', // Vermelho médio
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mensagem: {
    color: '#D32F2F', // Vermelho escuro
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#D32F2F', // Vermelho escuro
    color: '#FFFFFF', // Branco
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#FFFFFF', // Branco
    fontSize: 16,
  },
});

export default styles;
