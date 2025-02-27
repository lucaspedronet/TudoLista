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
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      text: 'Task 1',
      isChecked: false
    }
  ]);

  const [taskText, setTaskText] = useState<string>('');

  function handleNewAddTask() {
    if (taskText.trim().length === 0) return; // Evita adicionar tarefas vazias

    const newTask: ITask = {
      id: Math.random(), // Pode ser melhor substituído por um ID único real
      text: taskText,
      isChecked: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText(''); // Limpa o input após adicionar
  }

  function removeTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  // Adicionando a função toggleTaskStatus
  function toggleTaskStatus(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map(task => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => removeTask(task.id)}
                  toggleTaskStatus={() => toggleTaskStatus(task.id)}
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
