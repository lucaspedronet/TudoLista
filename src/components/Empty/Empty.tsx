import styles from './Empty.module.css';

export function Empty() {
  return (
    <div className={styles.container}>
      <img src="/clipboard.png" alt="ícone de prancheta" />
      <p>
        <strong
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: '#c6c6c6',
          }}
        >
          You don't have any tasks
        </strong>
        <strong
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: '#c6c6c6',
          }}
        >
          Create tasks and organize your to-do list
        </strong>
      </p>
    </div>
  );
}
