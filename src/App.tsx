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
  const [tasks, setTasks] = useState<ITask[]>([
    {
    id:1,
    text: "demo",
    isChecked: false,
    }
  ])
const [inputName, setInputName] = useState <string>('');

  function handleNewAddTask() {
      if (inputName.trim().length === 0) {
        setInputName('')
        return;
      }

      const newTask : ITask = {
        id: Math.random(), //número aleatório
        text: inputName,
        isChecked: false,
      };

    // nextState => [...nextState, newTask]
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputName('');
  }

  function handleRemoveTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); 
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
                    removeTask={() => handleRemoveTask(task.id)} 
                    toggleTaskStatus={() => {}}
                    
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