import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      height: 80,
      // backgroundColor:"#ff0",
      alignItems: 'center',
      justifyContent: 'center'
    },
    map: {
      width: width - 40,
      height: height / 2,
      borderRadius: 10,
    },
    button: {
      width: "70%",
      height: 40,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      color: 'white'
    },
    cxs: {
      // backgroundColor: '#f00',
      width: '80%'
    },
    cx: {
      // backgroundColor: '#ff0',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 8,
      borderWidth: 1,
      padding: 5,
      borderColor: '#999'
    },
    cxTxt: {
      fontSize: 12,
    }
  });
  
  export default styles