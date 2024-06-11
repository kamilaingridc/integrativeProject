import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const Detalhes = ({ ponto, onClose, onSave, onDelete }) => {
    const [tipoSensor, setTipoSensor] = useState(ponto.tipoSensor);
    const [unidadeMedida, setUnidadeMedida] = useState(ponto.unidadeMedida);
    const [local, setLocal] = useState(ponto.local);
    const [responsaveis, setResponsaveis] = useState(ponto.responsaveis);
    const [status, setStatus] = useState(ponto.status);

    const handleSave = () => {
        onSave({
            ...ponto,
            tipoSensor,
            unidadeMedida,
            local,
            responsaveis,
            status
        });
    };

    return (
        <View>
            <Text>Tipo de sensor:</Text>
            <TextInput
                value={tipoSensor}
                onChangeText={setTipoSensor}
            />

            <Text>Unidade de medida:</Text>
            <TextInput
                value={unidadeMedida}
                onChangeText={setUnidadeMedida}
            />

            <Text>Local:</Text>
            <TextInput
                value={local}
                onChangeText={setLocal}
            />

            <Text>Responsáveis:</Text>
            <TextInput
                value={responsaveis}
                onChangeText={setResponsaveis}
            />

            <Text>Status:</Text>
            <TextInput
                value={status ? 'Ativo' : 'Não Ativo'}
                onChangeText={setStatus}
            />

            <Button title="Salvar" onPress={handleSave} />
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Excluir" onPress={() => onDelete(ponto.id)} />
        </View>
    );
};

export default Detalhes;
