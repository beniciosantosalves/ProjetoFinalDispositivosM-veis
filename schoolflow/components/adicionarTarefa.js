import React from "react";
import { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export default function AdicionarTarefa(props) {
    const [tarefa, setTarefa] = useState('')
    const [diaSelecionado, setDiaSelecionado] = useState('Segunda')

    const handleAddTarefa = (tarefa) => {
        props.addTarefa(tarefa, diaSelecionado);
        setTarefa('');
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
            keyboardVerticalOffset={95}
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.diasContainer}
                style={{ width: '100%' }}
            >
                {DIAS.map((dia) => (
                    <TouchableOpacity
                        key={dia}
                        style={[
                            styles.diaBotao,
                            diaSelecionado === dia && styles.diaBotaoSelecionado
                        ]}
                        onPress={() => setDiaSelecionado(dia)}
                    >
                        <Text style={[
                            styles.diaTexto,
                            diaSelecionado === dia && styles.diaTextoSelecionado
                        ]}>
                            {dia}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TextInput
                style={styles.input}
                value={tarefa}
                onChangeText={(text) => setTarefa(text)}
                placeholder="Digite o exercício..."
                placeholderTextColor="#666"
                autoCapitalize="sentences"
            />
            <TouchableOpacity style={styles.adicionarTarefa} onPress={() => handleAddTarefa(tarefa)}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
                    + Adicionar Exercício
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 3,
        width: '100%',
        backgroundColor: '#000000',
        alignItems: 'center',
        padding: 20,
        gap: 10,
        display: 'flex',
        borderTopWidth: 1,
        borderTopColor: '#333',
        elevation: 10,
    },
    diasContainer: {
        gap: 8,
        paddingHorizontal: '10%',
    },
    diaBotao: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#1a1a1a',
    },
    diaBotaoSelecionado: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    diaTexto: {
        color: '#888',
        fontSize: 13,
        fontWeight: '500',
    },
    diaTextoSelecionado: {
        color: '#000',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    adicionarTarefa: {
        backgroundColor: '#fff',
        width: '80%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
})