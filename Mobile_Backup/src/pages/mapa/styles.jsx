import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: width,
        height: height
    },
    cxs: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cx: {
        flexDirection: 'row',
        marginBottom: 5
    },
    cxTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'
    }
});

export default styles;
