import { PlusCircle } from '@phosphor-icons/react'
import styles from './App.module.css'
import { Button, Input, Empty, Item, Header } from './components'
import { useState } from 'react'

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

const listaDeTarefas: ITask[] = []; 

export function App() {
  const [tasks, setTasks] = useState<ITask[]>(listaDeTarefas);
  const [newTaskText, setNewTaskText] = useState('');

  function handleNewAddTask() {
    const trimmedText = newTaskText.trim(); 
    if (trimmedText.length === 0) return; 

    const taskAlreadyExists = tasks.some(task => task.text.trim().toLowerCase() === trimmedText.toLowerCase());

    if (taskAlreadyExists) {
      alert('Já existe uma tarefa com esse nome!');
      return;
    }

    const newTask: ITask = {
      id: tasks.length + 1, 
      text: trimmedText, 
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText(''); 
  }
  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks); 
  }
  return (

    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setNewTaskText(e.target.value)}
            value={newTaskText}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={() => handleRemoveTask(task.id)}

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