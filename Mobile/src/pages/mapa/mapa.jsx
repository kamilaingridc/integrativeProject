import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';



export default function Geo() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    const [la, setLa] = useState(null)
    const [lo, setLo] = useState(null)

    const [distance1, setDistance1] = useState(null); // Distância até o ponto fixo 1
    const [distance2, setDistance2] = useState(null); // Distância até o ponto fixo 2
    const [temp, setTemp] = useState(null)
    const [x, setX] = useState(null)


    const initialRegion = {
        latitude: -22.9140639,
        longitude: -47.068686,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

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
        const d = R * c; // Distância em metros

        return d;
    };

    const fixedPoints = [
        {
            id: 1,
            latitude: -22.9140639, // Exemplo de coordenada 1
            longitude: -47.068065, // Exemplo de coordenada 1
        },
        {
            id: 2,
            latitude: -22.9141804, // Exemplo de coordenada 2
            longitude: -47.0683294, // Exemplo de coordenada 2
        }
    ];

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
                    setLa(newLocation.coords.latitude)
                    setLo(newLocation.coords.longitude)

                    // Calcular a distância entre a localização atual e os pontos fixos
                    const distanceToFixedPoint1 = haversine(la, lo, fixedPoints[0]['latitude'], fixedPoints[0]['longitude']);
                    const distanceToFixedPoint2 = haversine(la, lo, fixedPoints[1]['latitude'], fixedPoints[1]['longitude']);
                    setDistance1(distanceToFixedPoint1);
                    setDistance2(distanceToFixedPoint2);
                    if (distanceToFixedPoint1 <= distanceToFixedPoint2) {
                        setTemp(fixedPoints[0]['temp'])
                    } else {
                        setTemp(fixedPoints[1]['temp'])
                    }

                }

            );

            return () => {
                locationSubscription.remove();
            };
        })();
    }, []);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;

    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker coordinate={{ latitude: -22.915, longitude: -47.0678 }} />
                {fixedPoints.map(point => (
                    <Marker
                        key={point.id}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        pinColor="blue" // Cor do marcador para os pontos fixos
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="red" // Cor do marcador para a localização atual
                    />
                )}
            </MapView>

            <View style={styles.cxs}>
                <View style={styles.cx}><Text style={styles.cxTxt}>Latitude: </Text><Text style={styles.cxTxt}>{la}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Longitude: </Text><Text style={styles.cxTxt}>{lo}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 1: </Text>{distance1 !== null && <Text style={styles.cxTxt}>{distance1.toFixed(1)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 2: </Text>{distance1 !== null && <Text style={styles.cxTxt}>{distance1.toFixed(2)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Temperatura:</Text><Text style={styles.cxTxt}>{temp}ºC</Text></View>
            </View>
        </View>
    );
}