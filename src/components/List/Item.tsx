import { Trash, CheckCircle, Circle } from '@phosphor-icons/react'

import { ITask } from '../../App'

import styles from './Item.module.css'

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {

  const paragraphCheckedClassname = data.isChecked
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div className={styles.taskContent}>
        <button
          onClick={() => toggleTaskStatus({ id: data.id, value: !data.isChecked })}
          className={styles.checkButton}
        >
          {data.isChecked ? (
            <CheckCircle size={16} weight="fill" color="#4EA8DE" />
          ) : (
            <Circle size={16} weight="bold" color="#4EA8DE" />
          )}
        </button>

        <span className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
          {data.text}
        </span>
      </div>

      {/* Botão de remover tarefa */}
      <button onClick={() => removeTask(data.id)}>
        <Trash size={16} color="#808080" />
      </button>
    </div>

  )
}
