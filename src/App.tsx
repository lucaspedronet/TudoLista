import { PlusCircle } from "@phosphor-icons/react";

import styles from "./App.module.css";

import { Button, Input, Empty, Item, Header } from "./components";
import { useState } from "react";
export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskName, setTaskName] = useState<string>("");

  function handleNewAddTask() {
    if (
      taskName.trim() === "" ||
      tasks.find((e) => e.text === taskName) !== undefined
    )
      return;

    const newTask: ITask = {
      id: Math.random(), // número aleatório
      text: taskName,
      isChecked: false,
    };

    // nextState => [...nextState, newTask]
    setTasks((nextState) => {
      const newState = [...nextState, newTask];
      return newState;
    });

    console.log("Tasks: ", tasks);
    setTaskName("");
  }

  function removeTask(id: number) {
    setTasks((e) => e.filter((task) => task.id !== id));
  }

  function changeTaskStatus(id: number) {
    setTasks((e) =>
      e.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  const tasksCompleted = tasks.filter((task) => task.isChecked == true).length;

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            value={taskName != "Nova Tarefa" ? taskName : ""}
            placeholder="Adicione uma nova tarefa"
          />
          <Button onClick={handleNewAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.statusTarefas}>
          <p>{tasksCompleted} tarefa(s) concluída(s)</p>
          <p>{tasks.length - tasksCompleted} tarefa(s) pendente(s)</p>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map(function nomeDaFuncao(task) {
                return (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={removeTask}
                    toggleTaskStatus={changeTaskStatus}
                  />
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}
