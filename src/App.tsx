import { PlusCircle } from '@phosphor-icons/react'
import { useState } from 'react'

import styles from './App.module.css'

import { Button } from './components/Button'
import { Header, Header2 } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/List/Empty'
//import { Header as ListHeader } from './components/List/Header'
import { Item } from './components/List/Item'



export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

const initialState: ITask[] = [];

export function App() {

  const [tasks, setTasks] = useState(initialState);
  const [inputName, setInputName] = useState("");

  function removeTask(id: number) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      setTasks(tasks.filter((_, i) => i!== index));
    }
  }


  function handleNewAddTask() {

    if (inputName.trim().length <= 0){
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
              {tasks.map((task) => {
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