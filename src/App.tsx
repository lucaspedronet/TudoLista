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
  const [inputName, setInputName] = useState<string>('');

  function handleNewAddTask() {
    // verificar se o input está vazio
    if (inputName.trim().length === 0) {
      return;
    }
    // verificar se o input é igual a uma task já existente
    if (inputName === tasks.find((task) => task.text === inputName)?.text) {
      return;
    }

    const newTask: ITask = {
      id: Math.random(), // número aleatório
      text: inputName,
      isChecked: false,
    };

    // nextState => [...nextState, newTask]
    setTasks((nextState) => [...nextState, newTask]);

    // limpar o input
    setInputName('');
  }

  function handleRemoveTask(id: number) {
    // nextState => nextState.filter((task) => task.id !== id)
    setTasks((nextState) => nextState.filter((task) => task.id !== id));
  }

  function handleCheckTask(id: number) {
    // nextState => nextState.map((task) => task.id === id ? { ...task, isChecked: !task.isChecked } : task)
    setTasks((nextState) =>
      nextState.map((task) =>
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

        <div className={styles.taskInfoContainer}>
          <p>
            {tasks.filter((task) => task.isChecked).length} de {tasks.length} concluídas
          </p>
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
                    //marcar item como concluído
                    toggleTaskStatus={() => handleCheckTask(task.id)}
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
