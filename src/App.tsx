import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { ListHeader } from './components/HeaderList/ListHeader';
import { useState } from 'react';
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputTarefa, setInputValue] = useState('');

  function handleNewAddTask() {
    if(inputTarefa.trim() === '') return;

    const newTarefa = {
      id: Math.random(), // número aleatório
      text: inputTarefa,
      isChecked: false,
    };

    setTasks([...tasks, newTarefa]); setInputValue('');
    
  }

  const handleRemoverTarefa = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAlterarTaskStatus = ({ id, value }: { id: number; value: boolean }) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isChecked: value } : task
    ));
  };

  const checkedTasksCounter = tasks.reduce((count, task) => {
    return task.isChecked ? count + 1 : count;
  }, 0);

  return (
    <main>

      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputTarefa}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
        <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={() => handleRemoverTarefa(task.id)}
                    toggleTaskStatus={handleAlterarTaskStatus}
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
