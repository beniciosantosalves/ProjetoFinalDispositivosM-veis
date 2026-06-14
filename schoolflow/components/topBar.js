    import React from "react";
    import { View, Text, StyleSheet } from "react-native";

    export default function TopBar(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Minhas Tarefas</Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 100,
            elevation: 10,
            backgroundColor:'#000000',
            alignItems:'center',
            justifyContent:'center',
            borderBottomWidth: 1,
            borderBottomColor: '#333',
        },
        title:{
            color:'#fff',
            fontSize: 26,
            fontWeight:'bold',
        }
    })