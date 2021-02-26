
import { useContext } from 'react';
import { CountDownContext } from '../context/CountDownContext';
import styles from '../styles/components/CountDown.module.css';

export function CountDown(){
    
    const {
        minutes,
        seconds,
        hasFinished,
        IsActive,
        startCountdown,
        resetCountdown
    } = useContext(CountDownContext);

    const [minutesLeft, minutesRight] = String(minutes).padStart(2,'0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2,'0').split('');

   
    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                    <span>:</span>

                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
                { hasFinished ? (
                <button disabled className={styles.CountdownButton}> 
                      Ciclo encerrado
                 </button>
                ): (
                    <>
                    {IsActive ? (
                        <button type="button" className={`${styles.CountdownButton}  ${styles.CountdownButtonActive}`} onClick={resetCountdown}> 
                            Abandonar Ciclo
                        </button>
                        ) : (
                        <button type="button" className={styles.CountdownButton} onClick={startCountdown}> 
                            Iniciar um ciclo
                        </button>
                        )
                    }
                    </>
                )}
        </div>
    );


}