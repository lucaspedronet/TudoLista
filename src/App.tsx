import { PlusCircle } from '@phosphor-icons/react';
import styles from './App.module.css';
import { Button, Input, Empty, Item, Header } from './components';
import { useState } from 'react';

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      text: 'Demo',
      isChecked: false,
    },
  ]);

  const [inputName, setInputName] = useState<string>('');

  // Function to generate a unique ID
  function geraIdUnico(): number {
    let newId: number;
    do {
      newId = Math.random(); // Generate a random ID
    } while (tasks.some((task) => task.id === newId)); // Ensure the ID is unique
    return newId;
  }

  // Function to add a new task
  function handleNewAddTask() {
    if (inputName.trim().length === 0) {
      return;
    }

    const newTask: ITask = {
      id: geraIdUnico(), // Use the function to generate a unique ID
      text: inputName,
      isChecked: false,
    };

    setTasks((nextState) => [newTask, ...nextState]);
    setInputName('');
  }

  // Function to remove a task
  function removeTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Function to toggle task status (completed/not completed)
  function toggleTaskStatus(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
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
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => removeTask(task.id)} // Pass the removeTask function
                  toggleTaskStatus={() => toggleTaskStatus(task.id)} // Pass the toggleTaskStatus function
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