import { PlusCircle } from '@phosphor-icons/react'
import { useState } from 'react'

import styles from './App.module.css'

import { Button } from './components/Button'
import { Header, Header2 } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/List/Empty'
import { Header as ListHeader } from './components/List/Header'
import { Item } from './components/List/Item'

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue] = useState('');
  const [deletedTasksCount, setDeletedTasksCount] = useState(0);


  const addTask = () => {
    const trimmedValue = inputValue.trim(); // Remove espaços desnecessários
  
    if (!trimmedValue) {
      alert("⚠️ A atividade está em branco! Digite algo antes de adicionar.");
      return;
    }
  
    // Verifica se já existe uma tarefa com o mesmo texto (ignorando maiúsculas/minúsculas)
    const taskExists = tasks.some(task => task.text.toLowerCase() === trimmedValue.toLowerCase());
    if (taskExists) {
      alert("⚠️ Essa atividade já existe! Tente adicionar uma diferente.");
      return;
    }
  
    const newTask: ITask = {
      id: Date.now(), // Garante um ID único baseado no tempo
      text: trimmedValue,
      isChecked: false, // A nova tarefa começa como não concluída
    };
  
    setTasks(prevTasks => [...prevTasks, newTask]); // Adiciona ao estado
    setInputValue(''); // Limpa o campo de input
  };

  const removeTask = (taskId:number) =>{
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setDeletedTasksCount(prevCount => prevCount + 1); // Incrementa o contador de excluídos
  }
  
  
  
  

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={addTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={tasks.filter(task => task.isChecked).length}
            deletedTasksCount={deletedTasksCount} // Passando o número de tarefas excluídas           
            />
            
            


          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}                  
                  removeTask={() => removeTask(task.id)} 
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
