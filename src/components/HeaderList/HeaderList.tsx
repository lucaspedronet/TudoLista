import styles from "./HeaderList.module.css";

type Props = {
  tasksCounter: number;
  checkedTasksCounter: number;
};

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
