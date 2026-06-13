import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Tarefa(props) {
  const completo = props.status === 'completo';

  return (
    <View style={styles.container}>
      <View style={styles.containerNomeAtividade}>
        <Text style={[styles.nomeAtividade, props.status === 'completo' && { textDecorationLine: 'line-through', opacity: 0.6 }]}>
          {props.tarefa.length > 70 ? props.tarefa.slice(0, 72) + '...' : props.tarefa}
        </Text>
      </View>
      <View style={styles.opcoes}>
        <TouchableOpacity
          style={[styles.botaoEstado, { backgroundColor: completo ? 'green' : 'yellow' }]}
          onPress={!completo ? () => 
            props.updateStatus(): 
            () => Alert.alert(
            'Mudar status',
            `Tem certeza que deseja marcar como ${completo ? 'em progresso' : 'completo'}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => props.updateStatus() },
            ]
            )
          }
        >
          <Text style={{ color: completo ? 'white' : '#333', fontSize: 16 }}>
            {completo ? <MaterialIcons name="check" size={20} color="white" />  : <MaterialIcons name="hourglass-empty" size={20} color="#333" /> }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoDeletar} onPress={() => props.deleteTarefa()}>
          <MaterialIcons name="delete" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#268BF1',
    marginHorizontal: '10%',
    height: 100,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  containerNomeAtividade: {
    width: '80%',
    justifyContent: 'center',
    padding: 10,
  },
  nomeAtividade: {
    color: '#d7e8ff',
    fontSize: 18,
    fontWeight: '500',
  },
  opcoes: {
    height: '100%',
    width: '20%',
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  botaoEstado: {
    width: '100%',
    height: '50%',
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoDeletar: {
    width: '100%',
    height: '50%',
    backgroundColor: '#d52828',
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});