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
      id: 1,
      text: 'Demo',
      isChecked: false,
    }
  ]);
  const [inputName, setInputName] = useState('');
  const checkedTasksCounter = tasks.filter((task) => task.isChecked).length;
  const progress = tasks.length > 0 ? (checkedTasksCounter / tasks.length) * 100 : 0;

  function toggleTaskStatus({ id, value }: { id: number; value: boolean }){
    const newTasks = [...tasks]
    newTasks.filter((tasks)=>
      tasks.id === id ? tasks.isChecked = !value : tasks

    );
    setTasks(newTasks);


  }


  function removeTask(id:number){
    const newTasks = [...tasks]
    const filteredTasks = newTasks.filter((tasks)=>
      tasks.id !== id ? tasks : null
    
    );
    setTasks(filteredTasks);
  }

  function handleNewAddTask() {
    if (inputName.trim().length === 0) {
      return;
    }

    const newTask: ITask = {
      id: Math.random(),
      text: inputName,
      isChecked: false,
    };

    setTasks((test) => [...test, newTask]);

    setInputName('')
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
        {tasks.length > 0 && (
          
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{progress.toFixed(0)}% Concluído</span>
              <span>Quantidade de Tarefas: {tasks.length}</span>
              <span>Quantidade de Tarefas Concluídas: {checkedTasksCounter}</span>
            </div>

        )}
        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map(function nomeDaFuncao(task) {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={() => {removeTask(task.id)}}
                    toggleTaskStatus={() => {toggleTaskStatus({ id: task.id, value: task.isChecked })}}
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
