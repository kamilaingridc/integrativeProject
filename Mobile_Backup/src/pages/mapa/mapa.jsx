import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps'; 
import * as Location from 'expo-location'; 
import styles from './styles'; 
import Detalhes from '../detalhes/detalhes'; 

export default function Mapa() { 
    // Declaração de estados usando o hook useState
    const [location, setLocation] = useState(null); // Estado para armazenar a localização atual
    const [errorMsg, setErrorMsg] = useState(null); // Estado para armazenar mensagem de erro

    const [detalhesVisiveis, setDetalhesVisiveis] = useState(false); // Estado para controlar a visibilidade do modal de detalhes
    const [pontoSelecionado, setPontoSelecionado] = useState(null); // Estado para armazenar o ponto selecionado
    
    const [la, setLa] = useState(null); // Estado para armazenar a latitude
    const [lo, setLo] = useState(null); // Estado para armazenar a longitude

    const [distance1, setDistance1] = useState(null); // Estado para armazenar a distância até o ponto fixo 1
    const [distance2, setDistance2] = useState(null); // Estado para armazenar a distância até o ponto fixo 2
    const [temp, setTemp] = useState(null); // Estado para armazenar a temperatura

    // Função para fechar o modal de detalhes
    const handleClose = () => {
        setDetalhesVisiveis(false);
    };

    // Configuração da região inicial para exibição do mapa
    const initialRegion = {
        latitude: -22.9140639,
        longitude: -47.068686,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

    // Função para calcular a distância entre dois pontos usando a fórmula de haversine
    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371000; // Raio da Terra em metros
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d;
    };

    // Ponto fixos com suas coordenadas e temperatura
    const fixedPoints = [
        {
            id: 1,
            latitude: -22.914099,
            longitude: -47.06804, 
            temp: 25, // Adicionando temperatura ao ponto fixo 1
        },
        {
            id: 2,
            latitude: -22.914228, 
            longitude: -47.068679,
            temp: 27, // Adicionando temperatura ao ponto fixo 2
        }
    ];

    // Hook useEffect para acessar a localização do dispositivo
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    setLa(newLocation.coords.latitude);
                    setLo(newLocation.coords.longitude);

                    const distanceToFixedPoint1 = haversine(newLocation.coords.latitude, newLocation.coords.longitude, fixedPoints[0].latitude, fixedPoints[0].longitude);
                    const distanceToFixedPoint2 = haversine(newLocation.coords.latitude, newLocation.coords.longitude, fixedPoints[1].latitude, fixedPoints[1].longitude);
                    setDistance1(distanceToFixedPoint1);
                    setDistance2(distanceToFixedPoint2);
                    if (distanceToFixedPoint1 <= distanceToFixedPoint2) {
                        setTemp(fixedPoints[0].temp);
                    } else {
                        setTemp(fixedPoints[1].temp);
                    }

                }
            );

            return () => {
                locationSubscription.remove();
            };
        })();
    }, []);

    // Define o texto a ser exibido com base na localização atual e possíveis erros
    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    }

    return (
        <View style={styles.container}>
            {/* Componente MapView para exibir o mapa */}
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                {/* Marcador para a posição inicial */}
                <Marker coordinate={{ latitude: -22.915, longitude: -47.0678 }} />
                {/* Marcadores para os pontos fixos */}
                {fixedPoints.map(point => (
                    <Marker
                        key={point.id}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        pinColor="blue" 
                    />
                ))}
                {/* Marcador para a localização atual */}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="red"
                    />
                )}
            </MapView>

            {/* Exibe informações sobre a localização atual e distância/tempo */}
            <View style={styles.cxs}>
                <View style={styles.cx}><Text style={styles.cxTxt}>Latitude: </Text><Text style={styles.cxTxt}>{la}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Longitude: </Text><Text style={styles.cxTxt}>{lo}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 1: </Text>{distance1 !== null && <Text style={styles.cxTxt}>{distance1.toFixed(1)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 2: </Text>{distance2 !== null && <Text style={styles.cxTxt}>{distance2.toFixed(2)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Temperatura:</Text><Text style={styles.cxTxt}>{temp}ºC</Text></View>
            </View>

            {/* Modal para exibir detalhes de um ponto */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={detalhesVisiveis}
                onRequestClose={handleClose}
            >
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPressOut={handleClose}
                >
                    <View style={styles.modalView}>
                        {/* Exibe detalhes do ponto selecionado */}
                        {pontoSelecionado && 
                            <Detalhes 
                                ponto={pontoSelecionado} 
                                onSave={handleSave} 
                                onDelete={handleDelete} 
                                onClose={handleClose} 
                            />
                        }
                    </View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
}

