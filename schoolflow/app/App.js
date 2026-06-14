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
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda');

  const createTables = async () => {
    try {
      const database = await getDb();
      await database.execAsync(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dia TEXT NOT NULL DEFAULT 'Segunda',
        status TEXT DEFAULT 'em_progresso',
        foto TEXT
      );
    `);

      const colunas = await database.getAllAsync("PRAGMA table_info(tarefas)");

      const temColunaDia = colunas.some((col) => col.name === 'dia');
      if (!temColunaDia) {
        await database.execAsync(
          "ALTER TABLE tarefas ADD COLUMN dia TEXT NOT NULL DEFAULT 'Segunda'"
        );
      }

      const temColunaFoto = colunas.some((col) => col.name === 'foto');
      if (!temColunaFoto) {
        await database.execAsync(
          "ALTER TABLE tarefas ADD COLUMN foto TEXT"
        );
      }
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

  const addTarefa = async (nome, dia, foto) => {
    if (nome == null || nome.trim() === '') return;
    try {
      const database = await getDb();
      await database.runAsync(
        'INSERT INTO tarefas (nome, dia, foto) VALUES (?, ?, ?)',
        [nome.trim(), dia, foto]
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

  const diasOrdem = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <View style={{ backgroundColor: '#000000', flex: 1, alignItems: 'center' }}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ alignItems: 'center', gap: 16, paddingBottom: 30, width: '100%' }}
      >
        {tarefas.length === 0 && (
          <Text style={{ color: '#888', marginTop: 40, fontSize: 16 }}>
            Nenhum exercício adicionado ainda...
          </Text>
        )}
        {diasOrdem.map((dia) => {
          const tarefasDoDia = tarefas.filter((t) => t.dia === dia);
          if (tarefasDoDia.length === 0) return null;
          return (
            <View key={dia} style={{ width: '100%', alignItems: 'center' }}>
              <Text style={styles.diaTitulo}>{dia}</Text>
              <View style={{ width: '100%', alignItems: 'center', gap: 16 }}>
                {tarefasDoDia.map((tarefa) => (
                  <Tarefa
                    key={tarefa.id}
                    tarefa={tarefa.nome}
                    status={tarefa.status}
                    foto={tarefa.foto}
                    updateStatus={() => updateStatus(tarefa.id, tarefa.status)}
                    deleteTarefa={() => deleteTarefa(tarefa.id)}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <AdicionarTarefa
        addTarefa={addTarefa}
        diaSelecionado={diaSelecionado}
        setDiaSelecionado={setDiaSelecionado}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    flex: 1,
    paddingTop: 20,
  },
  diaTitulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 4,
    width: '80%',
  },
});