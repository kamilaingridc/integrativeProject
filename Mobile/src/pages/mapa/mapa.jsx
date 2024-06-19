import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';

export default function Mapa() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [sensor, setSensor] = useState(null);
    const [sensores, setSensores] = useState([]);

    const initialRegion = {
        latitude: -22.9140639,
        longitude: -47.068686,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

    const fixedPoints = [
        { id: 1, latitude: -22.914099, longitude: -47.06804, temp: 25 },
        { id: 2, latitude: -22.914228, longitude: -47.068679, temp: 27 },
    ];

    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371000;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };

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

                    if (sensores.length === 0) {
                        setSensores([...fixedPoints]);
                    }

                    if (sensores.length > 0) {
                        const updatedSensores = sensores.map(sensor => {
                            const distance = haversine(newLocation.coords.latitude, newLocation.coords.longitude, sensor.latitude, sensor.longitude);
                            return { ...sensor, distance };
                        });

                        const closestSensor = updatedSensores.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
                        setSensor(closestSensor); 
                        setSensores(updatedSensores);
                    }
                }
            );

            return () => {
                locationSubscription.remove();
            };
        })();
    }, [sensores]);

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={initialRegion}
                region={location ? {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                } : initialRegion}
            >
                {fixedPoints.map(point => (
                    <Marker
                        key={point.id}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        pinColor="blue"
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="red"
                    />
                )}
            </MapView>

            <View style={styles.cxs}>
                <View style={styles.cx}><Text style={styles.cxTxt}>Latitude: </Text><Text style={styles.cxTxt}>{location?.latitude}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Longitude: </Text><Text style={styles.cxTxt}>{location?.longitude}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o sensor mais próximo: </Text>{sensor && <Text style={styles.cxTxt}>{sensor.distance.toFixed(1)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Temperatura:</Text>{sensor && <Text style={styles.cxTxt}>{sensor.temp}ºC</Text>}</View>
            </View>
        </View>
    );
}
