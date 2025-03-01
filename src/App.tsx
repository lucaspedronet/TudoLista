import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

<<<<<<< HEAD
import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react'
=======
import { Button } from './components/Button'
import { Header, Header2 } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/List/Empty'
import { Header as ListHeader } from './components/List/Header'
import { Item } from './components/List/Item'
>>>>>>> 0d29024ad47d34c727d2793f892132c70ada2067

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState('')

  function addTask() {
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
    }
    setTasks((prevState) => [...prevState, newTask]);
    setInputName('');
  }

  function removeTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
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
          <Button onClick={addTask}>
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
                  removeTask={() => removeTask(task.id)}
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
