import styles from './Header.module.css'

interface Props {
  tasksCounter: number
  checkedTasksCounter: number
  deletedTasksCount: number; // Nova propriedade
}

export function Header({ tasksCounter, checkedTasksCounter, deletedTasksCount }: Readonly<Props>) {

  return (
    <header className={styles.container}>
      <aside>
        <p>Tarefas criadas</p>
        <span>{tasksCounter}</span>
      </aside>

      <aside>
        <p>Concluídas</p>
        <span>
          {tasksCounter === 0
            ? tasksCounter
            : `${checkedTasksCounter} de ${tasksCounter}`}
        </span>
      </aside>

      <aside>
        <p>Tarefas excluídas</p>
        <span>{deletedTasksCount}</span>
      </aside>
    </header>
  )
}
