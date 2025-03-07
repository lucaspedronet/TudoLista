import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react'
import { HeaderList } from './components/HeaderList/HeaderList'
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {

  const [task, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState('');

  function handleNewAddTask() {
    if (inputName.trim().length <= 0) {
      return;
    }
    const existTask = task.find(t => t.text === inputName)
    if (existTask) {
      return;
    }

    const newTask: ITask = {
      id: Date.now(),
      text: inputName,
      isChecked: false
    };
    setTasks((prevState) => [...prevState, newTask]);

  }

  function handleDeleteTask(id: number) {
    setTasks(task.filter((i) => i.id !== id))
  }

  function toggleTaskStatus(id: number) {
    setTasks((prevTask) =>
      prevTask.map((t) =>
        t.id === id ? { ...t, isChecked: !t.isChecked } : t
      )
    )
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

          <HeaderList count={task.length} checkedCount={task.filter((e) => e.isChecked === true).length}/>

          {task.length > 0 ? (
            <div>
              {task.map((task) => {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    handleDeleteTask={handleDeleteTask}
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
  )
}
