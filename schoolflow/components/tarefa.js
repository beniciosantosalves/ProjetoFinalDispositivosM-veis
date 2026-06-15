import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ALTURA_FOTO = 180;

export default function Tarefa(props) {
  const completo = props.status === 'completo';
  const temFoto = !!props.foto;

  return (
    <View style={styles.container}>
      {temFoto && (
        <Image source={{ uri: props.foto }} style={styles.foto} />
      )}

      <View style={styles.linha}>
        <View style={styles.containerNomeAtividade}>
          <Text
            style={[styles.nomeAtividade, completo && styles.nomeAtividadeCompleta]}
            numberOfLines={2}
          >
            {props.tarefa.length > 70 ? props.tarefa.slice(0, 72) + '...' : props.tarefa}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusBolinha, { backgroundColor: completo ? '#4ADE80' : '#FACC15' }]} />
            <Text style={styles.statusTexto}>
              {completo ? 'Completo' : 'Em progresso'}
            </Text>
          </View>
        </View>

        <View style={styles.acoes}>
          <TouchableOpacity
            style={[styles.botaoIcone, { backgroundColor: completo ? '#4ADE80' : '#2a2a2a' }]}
            onPress={!completo ? () =>
              props.updateStatus() :
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
            {completo ? (
              <MaterialIcons name="check" size={20} color="#0a0a0a" />
            ) : (
              <MaterialIcons name="hourglass-empty" size={20} color="#fff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoIcone} onPress={() => props.deleteTarefa()}>
            <MaterialIcons name="delete-outline" size={20} color="#F87171" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  foto: {
    width: '100%',
    height: ALTURA_FOTO,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  containerNomeAtividade: {
    flex: 1,
    gap: 6,
  },
  nomeAtividade: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '600',
  },
  nomeAtividadeCompleta: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusBolinha: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusTexto: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoIcone: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});