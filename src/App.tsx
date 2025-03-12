import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react';
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

  const total = tasks.length;
  const tarefasConcluidas = tasks.filter(task => task.isChecked).length;

  function handleNewAddTask() {
   if (inputName.trim().length <= 0) {
    return;
   }

   const existTask = tasks.find(t => t.text === inputName);

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

  function handleToggleTaskStatus({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, isChecked: value };
        return updatedTask;
      } else {
        return task;
      }
    });
  
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

        <div>
          <strong>Total de tarefas</strong>
          <span> {tarefasConcluidas} / {total}</span>
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
                    toggleTaskStatus={handleToggleTaskStatus} 
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
  )
}
