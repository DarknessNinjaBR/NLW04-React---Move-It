import { stringify } from 'querystring';
import {useState, useEffect, useContext} from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeOut: NodeJS.Timeout;

export function Countdown(){
    const {startNewChallange} = useContext(ChallangesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeOut);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeOut = setTimeout(() => {
                setTime(time -1);
            }, 1000);
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallange();
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>    
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>    
            </div>

            {hasFinished ? (
                 <button className={styles.countdownButton} disabled>
                 Ciclo encerrrado
             </button>

            ) : (
                <>
                {isActive ? (
                <button type="button" onClick={resetCountdown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                    Abandonar ciclo
                </button>

            ):(

            <button type="button" onClick={startCountdown} className={styles.countdownButton}>
                    Iniciar um ciclo 
            </button>
                    
            )}
                </>
            )}

            

        </div>
            
    );
}