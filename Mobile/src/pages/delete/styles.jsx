import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#a4c3b2',
        flex:1
    },

    caixa:{
        width:'80%',
        height:40,
        borderColor: '#000',
        borderRadius:10,
        padding:10,
        marginTop:10,
        backgroundColor:'#eaf4f4'
    },

    btn:{
        width:'40%',
        height:40,
        borderColor: '#000',
        borderRadius:10,
        marginTop:10,
        backgroundColor:'#6b9080', 
        alignItems:'center',
        justifyContent:'center'
    },

    textBtn:{
        fontSize: 25,
        color: 'white',
        fontWeight:'bold'
    },

    textTitle:{
        fontSize: 50,
        fontWeight:'bold'
    },

    textInput:{
        padding:10,
    },

    textos:{
        width:'80%',
        padding:10,
        height:40,
        borderColor: '#000',
        borderRadius:10,
        marginTop:10,
        backgroundColor:'#cce3de'
    },

})

export default styles