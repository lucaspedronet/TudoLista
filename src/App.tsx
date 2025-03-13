import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
import { useEffect, useState } from 'react';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

const initialState: ITask[] = [];

export function App() {
  const [tasks, setTasks] = useState(initialState);
  const [inputName, setInputName] = useState('');
  const [ progress, setProgress ] = useState(0);
  //criando uma variável de estado que vai mudar ambos os seus valores quando houver uma alteração
  const [completedTasksRatio, setCompletedTasksRatio] = useState({ completedTasks: 0, totalTasks: 0 });

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.isChecked).length;
    const totalTasks = tasks.length;
    const newProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    setProgress(newProgress);

    setCompletedTasksRatio({ completedTasks, totalTasks })
  }, [tasks]);


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
   setInputName('');
  }

  function handleRemoveTask(id: number) {
    const filterTasks = tasks.filter(task => task.id !== id);

    setTasks(filterTasks);
    setInputName('');
  }

  function toggleTaskStatus(id: number){
    setTasks((prevTask) =>  
      prevTask.map((task) => 
        task.id === id ? {...task, isChecked: !task.isChecked } : task
    ));
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

        <div className={styles.ratioContainer}>
          {completedTasksRatio.totalTasks > 0 ? (
            <p>{completedTasksRatio.completedTasks} / {completedTasksRatio.totalTasks} tarefas completas
            </p>
          ) : (
            <p>Nenhuma tarefa ainda!

            </p>
          )}
        </div>

        <ProgressBar progress={progress} />
        

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                  <Item
                    key={task.id}
                    data={task}
                    //eu passo essas funções, mas o item que decide se quer usar ou não
                    removeTask={handleRemoveTask}
                    toggleTaskStatus={toggleTaskStatus}
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
