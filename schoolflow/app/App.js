import React, { useState, useEffect } from 'react';
import { View, Keyboard, ScrollView, Text, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AdicionarTarefa from '../components/adicionarTarefa';
import Tarefa from '../components/tarefa';
import TopBar from '../components/topBar';

let db = null;

async function getDb() {
  if (db === null) {
    db = await SQLite.openDatabaseAsync('tarefas.db');
  }
  return db;
}

export default function App() {
  const [tarefas, setTarefas] = useState([]);

  const createTables = async () => {
  try {
    const database = await getDb();
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        status TEXT DEFAULT 'em_progresso'
      );
    `);
  } catch (error) {
    console.log('Erro ao criar tabela: ' + error.message);
  }
};

  const getTarefas = async () => {
    try {
      const database = await getDb();
      const results = await database.getAllAsync(
        'SELECT * FROM tarefas ORDER BY id DESC'
      );
      setTarefas(results);
    } catch (error) {
      console.log('Erro ao buscar tarefas: ' + error.message);
    }
  };

  const addTarefa = async (nome) => {
    if (nome == null || nome.trim() === '') return;
    try {
      const database = await getDb();
      await database.runAsync(
        'INSERT INTO tarefas (nome) VALUES (?)',
        [nome.trim()]
      );
      Keyboard.dismiss();
      await getTarefas();
    } catch (error) {
      console.log('Erro ao inserir tarefa: ' + error.message);
    }
  };

  const deleteTarefa = async (id) => {
    try {
      const database = await getDb();
      await database.runAsync('DELETE FROM tarefas WHERE id = ?', [id]);
      await getTarefas();
    } catch (error) {
      console.log('Erro ao deletar tarefa: ' + error.message);
    }
  };

  const updateStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'completo' ? 'em_progresso' : 'completo';
    try {
      const database = await getDb();
      await database.runAsync(
        'UPDATE tarefas SET status = ? WHERE id = ?',
        [novoStatus, id]
      );
      await getTarefas();
    } catch (error) {
      console.log('Erro ao atualizar status: ' + error.message);
    }
  };

  useEffect(() => {
    async function iniciarBanco() {
      await createTables();
      await getTarefas();
    }
    iniciarBanco();
  }, []);

  return (
    <View style={{ backgroundColor: '#A8D1F9', flex: 1, alignItems: 'center' }}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ alignItems: 'center', gap: 16, paddingBottom: 30}}
      >
        {tarefas.length === 0 && (
        <Text style={{ color: '#fff', marginTop: 40, fontSize: 16 }}>
            Nenhuma tarefa adicionada ainda...
        </Text>
        )}
        {tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa.nome}
            status={tarefa.status}
            updateStatus={() => updateStatus(tarefa.id, tarefa.status)}
            deleteTarefa={() => deleteTarefa(tarefa.id)}
          />
        ))}
      </ScrollView>
      <AdicionarTarefa addTarefa={addTarefa} />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    flex: 1,
    paddingTop: 20,
  },
});