import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import styles from '../styles/components/CompletedChallenge.module.css';

export function CompletedChallenge(){
        const {challengeCompleted} = useContext(ChallengeContext);
    return(

    <div className={styles.CompletedChallengeContainer}>   
        <span>Desafios Completos</span>
        <span>{challengeCompleted}</span>

    </div>



    );

}