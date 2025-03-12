import { PlusCircle } from '@phosphor-icons/react'
import { useState } from 'react'

import styles from './App.module.css'

import { Button } from './components/Button'
import { Header, Header2 } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/List/Empty'
import { Header as ListHeader } from './components/List/Header'
import { Item } from './components/List/Item'

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue] = useState('');

  const handleAddTarefa = () => {
    if(inputValue.trim() === '') return;

    const newTarefa = {
      id: Date.now(),
      text: inputValue,
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

  const checkedTasksCounter = tasks.filter(task => task.isChecked).length;

  return (
    <main>
      <Header/>
      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={handleAddTarefa}>
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
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => handleRemoverTarefa(task.id)}
                  toggleTaskStatus={handleAlterarTaskStatus}
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
