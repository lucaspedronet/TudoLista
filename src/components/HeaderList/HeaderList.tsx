import styles from './HeaderList.module.css'

type HeaderListProps = {
    count: number
    checkedCount: number
}

export function HeaderList({ count, checkedCount }: HeaderListProps) {
    return (
        <header className={styles.container}>
            <aside>
                <p>
                    Tarefas Criadas
                </p>
                <span>
                    {count}
                </span>
            </aside>
            <aside>
                <p>
                    Concluidas
                </p>
                <span>
                    {count === 0 ?
                        count :
                        `${checkedCount} de ${count}`
                    }
                </span>
            </aside>
        </header>
    )
}