import React from "react";
import {
     View, 
    Text,
    Image,
    StyleSheet
} from "react-native";

export default function TopBar(){
    return(
        <View style={styles.container}>
            <Image
            source={require("../assets/schoolflow-removebg-preview.png")}
            style={styles.logo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        elevation: 10,
        display: 'flex',
        backgroundColor:'#67aef5',
        alignItems:'center',
    },
    logo:{
        marginTop:30,
        width:'60%',
        height:'80%'
    }
})