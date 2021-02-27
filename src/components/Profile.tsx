import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level } = useContext(ChallangesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/DarknessNinjaBR.png" alt="DNBR"/>
            <div>
                <strong>Pedro Gomes Antunes</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}