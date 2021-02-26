import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import styles from '../styles/components/Profile.module.css';


export function Profile(){

    const {level} = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/jvccorsi.png" alt="Corsi_Png"/>
           <div> 
                <strong>João Victor Corsi Ferreira</strong>
                 <p>
                     <img src="icons/level.svg" alt="Level"/>
                     Level {level}</p>
            </div>  
        </div>
    );

}