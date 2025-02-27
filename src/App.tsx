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
  //initial state
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      text: 'Demo',
      isChecked: false,
    }
  ]);

  const [inputName, setInputName] = useState('');

  function handleNewAddTask() {
    let input = inputName.trim();
    if (input.length == 0 || tasks.find(task => task.text == input)) {
      setInputName('');
      return;
    }

    const newTask: ITask = {
      //id único e aleatório
      id: Math.random(),
      //texto verificado do usuário
      text: inputName,
      //sempre começa não completado
      isChecked: false,
    };

    setTasks((nextState) => [newTask, ...nextState]);

    setInputName('');
  };

  function deleteTask(taskId: number){
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }


  return (
    <main>

      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={ // recuperando o evento do usuário
            (e) => setInputName(e.target.value)}
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
              {tasks.map(function nomeDaFuncao(task) {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={deleteTask}
                    toggleTaskStatus={() => {}}
                  />
                )
              })}
            </div>
          ) : (
            // componente caso lista = []
            <Empty />
          )}
        </div>
      </section>
    </main>
  )
}
