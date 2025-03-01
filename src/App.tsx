import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react'
export interface ITask {
  id: number
  text: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState<string>("");

  //nova tarefa
  const addTask = () => {
    if (inputName.trim() === "")
      return;
  }
    const newTask: ITask = {
      id: tasks.length + 1,
      text: inputName,
    };
    setTasks([...tasks, newTask]);
    setInputName("");
    //remove pelo id
    const removeTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
  }


};


export function App() {

  function handleNewAddTask() {
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
          <Button onClick={addTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {listaDeTarefas.length > 0 ? (
            <div>
              {listaDeTarefas.map((task) => {
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
