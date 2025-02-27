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

  function toggleTaskStatus(id : number){
    setTasks((prevTasks) => 
    prevTasks.map(task => task.id === id ? 
    {...task, isChecked: !task.isChecked} : task))
  }

  function handleRemoveTask(id : number){
    setTasks((prevTasks) => prevTasks.filter
    (task => task.id !== id));
  }

  function handleNewAddTask() {
    
    if(inputName.trim().length === 0) {
      return;
    }
    
    if (tasks.find(task => task.text === inputName)) {
      return
    }

  const newTask: ITask = {
    id: Math.random(),
    text: inputName,
    isChecked: false,
  };
  
  setTasks((text) => [...text, newTask]);

  setInputName('');

  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isChecked).length;

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
        <div className={styles.progressContainer}>
          <p>Progresso: {completedTasks} / {totalTasks} tarefas concluídas</p>
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
                    toggleTaskStatus={() => toggleTaskStatus(task.id)}
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
