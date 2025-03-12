import { PlusCircle } from '@phosphor-icons/react'
import { useActionState, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './App.module.css'

import { Button } from './components/Button/Button'
import { Header} from './components/Header/Header'
import { Input } from './components/Input/Input'
import { Empty } from './components/Empty/Empty'
import { Header as ListHeader } from './components/Header/Header'
import { Item } from './components/Item/Item'

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState("");
  const [TasksCount, setTasksCount] = useState(0);
  function addTask() {
    if (inputName.trim().length <= 0) {
      return;
    }
    const existTask = tasks.find((t) => t.text === inputName);
    if (existTask) {
      return;
    }
    const newTask: ITask = {
      id: Math.random(),
      text: inputName,
      isChecked: false,
    };
    setTasks((prevState) => [...prevState, newTask]);
    setInputName("  ");
  }

  function removeTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
  function toggleTaskStatus(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }
 
//_________________________
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
                    toggleTaskStatus={() => {toggleTaskStatus(task.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </section>
      </main>
    );
  }

