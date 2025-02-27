import { Trash, Check } from '@phosphor-icons/react'
import { ITask } from '../../App'
import styles from './Item.module.css'

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: (id: number, value: boolean) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  const checkboxCheckedClassname = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']

  const paragraphCheckedClassname = data.isChecked
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor={`checkbox-${data.id}`}>
          <input
            id={`checkbox-${data.id}`} // Cada input tem um ID único
            type="checkbox"
            checked={data.isChecked}
            readOnly
            onClick={() => toggleTaskStatus(data.id, !data.isChecked)}
          />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      {/* Corrigida a função removeTask */}
      <button onClick={() => removeTask(data.id)} title="Remover tarefa">
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}
