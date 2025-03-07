import { PlusCircle } from "@phosphor-icons/react";

import styles from "./App.module.css";
import { useState } from "react";
import { Button, Empty, Header, Input, Item } from "./components";
import { HeaderList } from "./components/HeaderList/HeaderList";

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState("");

  const handleAddTask = () => {
    const text = inputName.trim();

    if (text.length <= 0) {
      return setInputName("");
    }

    const existTask = tasks.find((t) => t.text === text);

    if (existTask) {
      return setInputName("");
    }

    const newTask: ITask = {
      id: Date.now(),
      text: inputName,
      isChecked: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setInputName("");
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <HeaderList
            tasksCounter={tasks.length}
            checkedTasksCounter={tasks.filter((task) => task.isChecked).length}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={toggleTaskStatus}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}
