import { PlusCircle } from '@phosphor-icons/react';
import styles from './App.module.css';

import { Button, Input, Empty, Item, Header } from './components';
import { useState } from 'react';

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState('');

  // Cálculos diretamente na renderização
  const totalTarefas = tasks.length;
  const tarefasConcluidas = tasks.filter(task => task.isChecked).length;

  // Função de adicionar tarefa
  function handleNewAddTask() {
    if (!inputName.trim()) return; // Evita adicionar tarefas vazias

    const newTask: ITask = {
      id: Date.now(),
      text: inputName,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
    setInputName('');
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleToggleTaskStatus({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, isChecked: value } : task);
    setTasks(updatedTasks);
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.taskCounters}>
          <div>
            <strong>Total de tarefas</strong>
            <p>{totalTarefas}</p>
            <strong>Total de concluídas </strong>
            <p>{tarefasConcluidas}</p>
          </div>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map(task => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => removeTask(task.id)}
                  toggleTaskStatus={handleToggleTaskStatus}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}
