import { PlusCircle } from "@phosphor-icons/react";

import styles from "./App.module.css";
import { useState } from "react";
import { Button, Empty, Header, Input, Item } from "./components";
import { HeaderList } from "./components/HeaderList/HeaderList"; // Exibe os contadores de tarefas criadas e concluídas

export interface ITask {  // Interface de uma tarefa, contendo id, texto e status de conclusão
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

    const newTask: ITask = { //Cria um novo objeto de tarefa, o texto e status false para não concluida 
      id: Date.now(),
      text: inputName,
      isChecked: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setInputName("");
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));  // Filtra a lista de tarefas removendo a que possui o id passado
  };

  const toggleTaskStatus = (id: number) => {   // Função para alternar o status de conclusão de uma tarefa
    setTasks((prevTasks) =>  // Mapeia a lista de tarefas e inverte o valor para a  tarefa que corresponde ao id
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
          {/* Componente HeaderList exibe os contadores de tarefas criadas e concluídas */}
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