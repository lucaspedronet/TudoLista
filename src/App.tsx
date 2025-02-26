import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react';
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

const listaDeTarefas: ITask[] = [
  {
    id: 1878,
    text: 'Estudar React',
    isChecked: false,
  },
  {
    id: 2,
    text: 'Enviar e-mail para o cliente',
    isChecked: false
  },
  {
    id: 3,
    text: 'Levar o cachorro para passear',
    isChecked: false
  },
];


export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function handleNewAddTask() {
    const newTask: ITask = {
      id: Math.random(), // número aleatório
      text: 'Task nova pessoal',
      isChecked: false,
    };

    // nextState => [...nextState, newTask]
    setTasks((nextState) => {
      const newState = [...nextState, newTask];
      return newState;
    });
    
    console.log("Tasks: ", tasks);
  }

  return (
    <main>

      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={() => {}}
            value={''}
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
                    removeTask={() => {}}
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
