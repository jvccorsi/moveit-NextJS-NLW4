import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount:number;
}

interface ChallengeContextData  {
    level: number;
    currentExperience: number;
    challengeCompleted:number;
    levelUp: () => void;
    activeChallenge: Challenge;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    experienceToNextLevel: number;

}
interface ChallengeProviderProps{
    children:ReactNode;
    level:number;
    currentExperience:number;
    challengeCompleted:number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children, ...rest}:ChallengeProviderProps ){
   
    const [level, setLevel] = useState(rest.level ?? 1);
    const[currentExperience,setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const[challengeCompleted,setChallengeCompleted ] = useState(rest.challengeCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const [isLevelUpModalOpen,setisLevelUpModalOpen ] = useState(false);

    useEffect(() => {
        Notification.requestPermission();
    } , [] );

    useEffect(() => {
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengeCompleted',String(challengeCompleted));



    }, [level,currentExperience,challengeCompleted] );

    function levelUp(){
      setLevel(level+1);
      setisLevelUpModalOpen(true);
  
   }

   function closeLevelUpModal(){
       setisLevelUpModalOpen(false);
   }

   function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
        new Notification('Novo desafio 🎉',{
        body:`Valendo ${challenge.amount}xp!` 
    })
    }
   }

   function resetChallenge(){
       setActiveChallenge(null);
   }
   function completeChallenge(){
    if(!activeChallenge){
        return;
    }

    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
        finalExperience =  finalExperience - experienceToNextLevel;
        levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted+1);
    

}
    return (
        <ChallengeContext.Provider value ={{level,currentExperience,challengeCompleted,levelUp,startNewChallenge, activeChallenge,resetChallenge,experienceToNextLevel,completeChallenge,closeLevelUpModal}}>   
        {children}

       { isLevelUpModalOpen && <LevelUpModal/> }
         </ChallengeContext.Provider>
    );
}