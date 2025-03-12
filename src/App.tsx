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
  const [checkedTasksCounter, setCheckedTasksCounter] = useState(0);


  const qtTasksTotal = tasks.length;
  const qtTasksConcluidas = tasks.filter(task => task.isChecked).length;
  const valorPorcentagem = (qtTasksConcluidas / qtTasksTotal ) * 100

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

  function marcarDesmarcarTask(id: number, value: boolean) {
    const filterTasksConcluidas = tasks.map(task => task.id === id ?
       {...task, isChecked: value} : task)

    setTasks(filterTasksConcluidas)
  }

  useEffect(() => {
    setCheckedTasksCounter(qtTasksConcluidas);
  }, [tasks]);

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

        <div className={styles.barraProgresso}>
            <progress value={valorPorcentagem} max="100"></progress>
            <span>{checkedTasksCounter}/{qtTasksTotal}</span>
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
                    toggleTaskStatus={() => marcarDesmarcarTask(task.id, !task.isChecked)}
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
