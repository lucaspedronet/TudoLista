import { PlusCircle } from '@phosphor-icons/react'
import styles from './App.module.css'
import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react';

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskText, setTaskText] = useState('');

  function handleNewAddTask() {
    if (!taskText.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      text: taskText,
      isChecked: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText('');
  }

  function handleRemoveTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  function toggleTaskStatus(id: number) {
    setTasks((prevTasks) => 
      prevTasks.map(task => 
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isChecked).length;

  return (
    <main>
      <Header />
      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input 
            onChange={(e) => setTaskText(e.target.value)}
            value={taskText}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>
        <div className={styles.progressContainer}>
          <p>Progresso: {completedTasks} / {totalTasks} tarefas concluídas</p>
        </div>
        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => handleRemoveTask(task.id)}
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
