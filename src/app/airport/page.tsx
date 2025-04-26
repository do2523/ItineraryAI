import styles from '../../styles/Shared.module.css';

export default function Airport() {
    return (
        <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#F0F9FF]">
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <div className={styles['responsive-container']}>
                    <p className={styles['responsive-image']}>Test</p>
                    <div className={styles.question}>
                        Where are you flying to?
                        <div className={styles['input-box']}>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}