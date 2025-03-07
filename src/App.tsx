import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState } from 'react'

>>>>>>> Lucas_Franco_de_Castro/aula-04-atividade
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}


export function App() {
  const [listaDeTarefas,setListaDeTarefas] = useState<ITask[]>([])
  const [inputTask,setInputTask] = useState('')

  function handleInputTask(textValue:string){
    setInputTask(textValue)
  }

  function handleNewAddTask() {
    if(inputTask.trim().length>0 && !listaDeTarefas.find((t)=>t.text===inputTask)){
      const task = {
        id:Math.random(),
        text:inputTask,
        isChecked:false
      }
      setListaDeTarefas([...listaDeTarefas,task])
    }

  }

  function handleRemoveTask(taskId:number){
    setListaDeTarefas((prevLista)=>(prevLista.filter((item)=>item.id!==taskId)))
  }

  function handleToggleStatus(taskId: number,value:boolean) {
    setListaDeTarefas((prevLista) =>
      prevLista.map((task) =>
        task.id === taskId ? { ...task, isChecked: !value } : task
      )
    )
  }

  return (
    <main>

      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => handleInputTask(e.target.value)}
            value={inputTask}
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {listaDeTarefas.length > 0 ? (
            <div>
              {listaDeTarefas.map((task) => {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={() => handleRemoveTask(task.id)}
                    toggleTaskStatus={() => handleToggleStatus(task.id,task.isChecked)}
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
