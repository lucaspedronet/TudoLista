import { PlusCircle } from '@phosphor-icons/react';

import styles from './App.module.css';

import { Button, Input, Empty, Item, Header } from './components';
import { useState } from 'react';
export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

const listaDeTarefas: ITask[] = [
  {
    id: 1,
    text: 'Estudar React',
    isChecked: false,
  },
  {
    id: 2,
    text: 'Enviar e-mail para o cliente',
    isChecked: false,
  },
  {
    id: 3,
    text: 'Levar o cachorro para passear',
    isChecked: false,
  },
];

export function App() {
  const [tasks, setTasks] = useState<ITask[]>(listaDeTarefas);
  const [inputName, setInputName] = useState('');
  const [totalTask, setTotalTask] = useState(3);
  const totalConcludeTask = tasks.filter((task) => task.isChecked).length;

  function handleNewAddTask() {
    if (tasks.some((task) => task.text === inputName)) {
      alert('Tarefa ja existe!');
      return;
    } else if (inputName.trim().length === 0) {
      alert('Escreva algo');
      return;
    }

    const newTask: ITask = {
      id: Math.random(),
      text: inputName,
      isChecked: false,
    };

    setTasks((lastTasks) => [...lastTasks, newTask]); ///basicamente o rest permite que eu traga todas as anteriores de volta.
    setInputName('');
    setTotalTask((lastTotal) => lastTotal + 1);
  }

  function removeTask(id: number) {
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
    setTotalTask((antigoTotal) => antigoTotal - 1);
  }

  function toggleTaskStatus(id: number) {
    console.log(
      tasks.filter((task) => task.isChecked || task.isChecked === false).length
    );
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  const completedTasks = tasks.filter((task) => task.isChecked).length;

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
            New
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
          <div></div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div className={styles.progressWrapper}>
            <span className={styles.progressText}>
              Tasks: {totalConcludeTask} / {totalTask}
            </span>
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width:
                    totalTask > 0
                      ? `${(totalConcludeTask / totalTask) * 100}%`
                      : '0%',
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={removeTask}
                    toggleTaskStatus={toggleTaskStatus}
                  />
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}
