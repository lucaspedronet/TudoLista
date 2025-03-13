import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState, useEffect } from 'react';
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

// const BRANCH = 'aula04/gestor-tarefas';
const initialState: ITask[] = [];

export function App() {
  const [tasks, setTasks] = useState(initialState);
  const [inputName, setInputName] = useState('');
  const [progress, setProgress] = useState(0);

  function handleNewAddTask() {
   if (inputName.trim().length <= 0) {
    return;
   }

   const existTask = tasks.find(t => t.text === inputName);

   setInputName('')

   if (existTask) {
    return;
   }
   
   const newTask: ITask = {
    id: Math.random(),
    text: inputName,
    isChecked: false,
   };
   setTasks((prevState) => [...prevState, newTask]);
  }

  function handleRemoveTask(id: number) {
    const filterTasks = tasks.filter(task => task.id !== id);

    setTasks(filterTasks);
    setInputName('');
  }

  function toggleTaskStatus({ id, value }: { id: number; value: boolean }) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: value } : task
      )
    );
  }

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.isChecked).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100: 0;
    setProgress(progressPercentage);
  }, [tasks]);

  const completedTasks = tasks.filter((task) => task.isChecked).length;
  const remainingTasks = tasks.length - completedTasks;

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

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <h3 className={styles.progressTitle}>Progresso</h3>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className={styles.progressInfo}>
            <br />{completedTasks}/{tasks.length} tarefas concluídas!
          </p>

        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={handleRemoveTask}
                    toggleTaskStatus={toggleTaskStatus}
                  />
                )
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
