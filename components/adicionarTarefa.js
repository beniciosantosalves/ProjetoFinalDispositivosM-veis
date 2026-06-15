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
    ScrollView,
    Image,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export default function AdicionarTarefa(props) {
    const [tarefa, setTarefa] = useState('')
    const [foto, setFoto] = useState(null)

    const handleAddTarefa = (tarefa) => {
        props.addTarefa(tarefa, props.diaSelecionado, foto);
        setTarefa('');
        setFoto(null);
    }

    const tirarFoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permissão necessária',
                'É preciso permitir o acesso à câmera para anexar uma foto.'
            );
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!resultado.canceled) {
            setFoto(resultado.assets[0].uri);
        }
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
                style={styles.diasScroll}
            >
                {DIAS.map((dia) => (
                    <TouchableOpacity
                        key={dia}
                        style={[
                            styles.diaBotao,
                            props.diaSelecionado === dia && styles.diaBotaoSelecionado
                        ]}
                        onPress={() => props.setDiaSelecionado(dia)}
                    >
                        <Text style={[
                            styles.diaTexto,
                            props.diaSelecionado === dia && styles.diaTextoSelecionado
                        ]}>
                            {dia}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.linhaInput}>
                <TextInput
                    style={styles.input}
                    value={tarefa}
                    onChangeText={(text) => setTarefa(text)}
                    placeholder="Digite o exercício..."
                    placeholderTextColor="#666"
                    autoCapitalize="sentences"
                />
                <TouchableOpacity style={styles.botaoFoto} onPress={tirarFoto}>
                    {foto ? (
                        <Image source={{ uri: foto }} style={styles.previewFoto} />
                    ) : (
                        <MaterialIcons name="camera-alt" size={22} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>

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
        width: '100%',
        backgroundColor: '#000000',
        alignItems: 'center',
        padding: 20,
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
        elevation: 10,
    },
    diasScroll: {
        width: '100%',
        height: 50,
        flexGrow: 0,
    },
    diasContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    linhaInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        gap: 8,
    },
    input: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    botaoFoto: {
        width: 40,
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    previewFoto: {
        width: '100%',
        height: '100%',
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