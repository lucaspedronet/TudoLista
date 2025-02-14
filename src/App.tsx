import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button } from './components/Button'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/List/Empty'
import { HeaderList } from './components/List/Header'
import { Item } from './components/List/Item'

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

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

        <HeaderList checkedTasksCounter={3} tasksCounter={9} />

        <div className={styles.tasksList}>
          {[].length > 0 ? (
            <div>
              {[].map((task) => (
                <Item
                  key={task}
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
