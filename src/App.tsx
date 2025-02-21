import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Input, Empty, Item, Header } from './components'
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

const listaDeTarefas: ITask[] = [
  {
    id: 1,
    text: 'Estudar React',
    isChecked: false
  },
  {
    id: 2,
    text: 'Enviar e-mail para o cliente',
    isChecked: false
  },
  {
    id: 3,
    text: 'Levar o cachorro para passear',
    isChecked: false
  },
];

export function App() {

  return (
    <main>

      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={() => {}}
            value={''}
          />
          <Button onClick={() => {}}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          {listaDeTarefas.length > 0 ? (
            <div>
              {listaDeTarefas.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => {}}
                  toggleTaskStatus={() => {}}
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
