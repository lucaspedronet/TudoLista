import styles from "./HeaderList.module.css";

type Props = {
  tasksCounter: number;  // total de tarefas criadas
  checkedTasksCounter: number; // total de tarefas concluídas
};
// Dois blocos um para"Tarefas criadas" e outro para "Concluídas"
export const HeaderList = ({ tasksCounter, checkedTasksCounter }: Props) => {
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
    </header>
  );
};