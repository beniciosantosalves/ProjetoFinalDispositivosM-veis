import React from "react";
import { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text, 
    KeyboardAvoidingView,
    Platform
} from 'react-native';

export default function AdicionarTarefa(props){
    const [tarefa, setTarefa] = useState()

    const handleAddTarefa = (tarefa) =>{
        props.addTarefa(tarefa);
        setTarefa('');
    }
    
    return (
        <KeyboardAvoidingView 
            behavior="padding"
            style={styles.container}
            keyboardVerticalOffset={95}
        >
            <TextInput
            style = {styles.input}
            value={tarefa}
            onChangeText={(text)=> setTarefa(text)}
            placeholder="Digite o nome da tarefa..."
            placeholderTextColor="#888"
            autoCapitalize="sentences" 
            />
            <TouchableOpacity style={styles.adicionarTarefa} onPress={()=> handleAddTarefa(tarefa)}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    + Adicionar Tarefa
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1/3,
        width:'100%',
        backgroundColor:'#67aef5',
        alignItems:'center',
        padding:20,
        gap:10,
        display: 'flex',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.4)', 
        elevation: 10, 
    },
    input:{
        backgroundColor:'#d7e8ff',
        color:'black',
        width:'80%',
        height:40,
        borderColor:'black'
    },
    adicionarTarefa: {
        backgroundColor:'#268BF1',
        width:'80%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    }
})