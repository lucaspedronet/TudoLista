import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react'
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

const listaDeTarefas: ITask[] = [
  {
    id: 1,
    text: 'Estudar React',
    isChecked: false
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
  {
    id: 3,
    text: 'Teste de Front-end',
    isChecked: false
  },
];

export function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Estudar React',
      isChecked: false
    }
  ]);

  function handleAddNewTask() {

    const newTask: ITask = {
      id: Math.random(),
      text: 'Nova tarefa',
      isChecked: false
    };

    setTasks(nexState => [...nexState, newTask]);
    
    console.log("tasks: ", tasks);
  }

  return (
    <main>

      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => {}}
            value={''}
          />
          <Button onClick={handleAddNewTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => {}}
                  toggleTaskStatus={() => {}}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  )
}
