
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className={styles.container}> 
            <div className={styles.bar} style={{width: `${progress}%`}} />
        </div>
    );
}