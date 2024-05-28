import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lati, setLatitude] = useState(null);
  const [longi, setLongitude] = useState(null);

  // Temperaturas fictícias
  const [temperature1, setTemperature1] = useState(25);
  const [temperature2, setTemperature2] = useState(30);

  const bounds = {
    north: -22.9138,
    south: -22.9145,
    west: -47.0687,
    east: -47.0679,
  };

  const fixedPoint1 = {
    latitude: -22.914099,
    longitude: -47.068040,
  };

  const fixedPoint2 = {
    latitude: -22.914228,
    longitude: -47.068679,
  };

  const calculatePosition = (latitude, longitude) => {
    if (!latitude || !longitude) return { top: '50%', left: '50%' };

    if (latitude < bounds.south || latitude > bounds.north || longitude < bounds.west || longitude > bounds.east) {
      return { top: '50%', left: '50%' };
    }

    const top = ((bounds.north - latitude) / (bounds.north - bounds.south)) * 100;
    const left = ((longitude - bounds.west) / (bounds.east - bounds.west)) * 100;

    return { top: `${top}%`, left: `${left}%` };
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 200,
        distanceInterval: 0.8,
      }, (newLocation) => {
        setLocation(newLocation.coords);
        setLatitude(newLocation.coords.latitude);
        setLongitude(newLocation.coords.longitude);
      });
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {location && <View style={[styles.bolinha, calculatePosition(location.latitude, location.longitude)]} />}
        <View style={[styles.fixedPoint1, calculatePosition(fixedPoint1.latitude, fixedPoint1.longitude)]}>
          <Text style={styles.tempText}>{temperature1}°C</Text>
        </View>
        <View style={[styles.fixedPoint2, calculatePosition(fixedPoint2.latitude, fixedPoint2.longitude)]}>
          <Text style={styles.tempText}>{temperature2}°C</Text>
        </View>
      </View>
      <Text>Latitude: {lati}</Text>
      <Text>Longitude: {longi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'relative',
    width: width - 40,
    height: height / 1.5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  bolinha: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'pink',
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  fixedPoint1: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  fixedPoint2: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'purple',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  tempText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
