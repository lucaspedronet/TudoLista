import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react';
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState('');
    
  function handleNewAddTask() {
    if (inputName.trim().length === 0) {
      return;
    }

    const newTask: ITask = {
      id: Math.random(),
      text: inputName,
      isChecked: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    
    setInputName('');
  }

  function handleRemoveTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  function handleAlterarTaskStatus (id: number) {
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
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map(function nomeDaFuncao(task) {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={()=> handleRemoveTask(task.id)}
                    toggleTaskStatus = {() => handleAlterarTaskStatus(task.id)}
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
