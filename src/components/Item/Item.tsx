import { Trash, Check } from '@phosphor-icons/react'

import { ITask } from '../../App'

import styles from './Item.module.css'

interface Props {
  data: ITask
  handleDeleteTask: (id: number) => void
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Item({ data,handleDeleteTask }: Props) {

  const checkboxCheckedClassname = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassname = data.isChecked
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={() => {}}>
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button onClick={() => handleDeleteTask(data.id)}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}
