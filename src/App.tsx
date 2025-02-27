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

  function toggleTaskStatus(id : number){ /*Função para verificar as tarefas pegando como parametro o id */
    setTasks((prevTasks) => 
    prevTasks.map(task => task.id === id ? /*prevTasks (o PP me explicou porem ainda estou confuso, estudar mais depois) */
    {...task, isChecked: !task.isChecked} : task))
  }

  function handleRemoveTask(id : number){ /*Função para remover pegando como parametro o id */
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

  const totalTasks = tasks.length; /*Constante criada para contar o tamanho de tarefas que tem na lista */
  const completedTasks = tasks.filter(task => task.isChecked).length; /*Constante criada para contar o tamanho de tarefas completas que tem na lista (através do is cheked) */

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

        {/*O texto de prograsso sendo iterado toda vez que adicionar uma nova tarefa.*/}
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
                    removeTask={() => handleRemoveTask(task.id)} /*Função de remover a  tarefa .*/
                    toggleTaskStatus={() => toggleTaskStatus(task.id)} /*Função para checar o status da tarefa */
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
