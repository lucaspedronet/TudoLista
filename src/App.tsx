import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';

import styles from './App.module.css';

import { Button } from './components/Button';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Empty } from './components/List/Empty';
import { Header as ListHeader } from './components/List/Header';
import { Item } from './components/List/Item';

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState('');

  function handleAddTask() {
    if (!inputValue.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      text: inputValue,
      isChecked: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue('');
  }

  const removeTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const checkedTasksCounter = tasks.filter((task) => task.isChecked).length;
  const progress = tasks.length > 0 ? (checkedTasksCounter / tasks.length) * 100 : 0;

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>
        {tasks.length > 0 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{progress.toFixed(0)}% Concluído</span>
          </div>
        )}

        <div className={styles.tasksList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
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
