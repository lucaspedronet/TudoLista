import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button, Header, Input, Empty, HeaderList, Item } from './components'

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
