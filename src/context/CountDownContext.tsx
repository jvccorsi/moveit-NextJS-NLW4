import { createContext,ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from '../context/ChallengeContext';

interface CountDownContexData{
    minutes:number; 
    seconds: number;
    hasFinished:boolean;
    IsActive:boolean;
    startCountdown: ()=>void;
    resetCountdown: ()=>void;
}

interface CountDownProviderProps{
    children:ReactNode;
}

export const CountDownContext = createContext({} as CountDownContexData);

let countdownTimeout: NodeJS.Timeout;

export function CountDownContextProvider({children}:CountDownProviderProps ){
    const {startNewChallenge} = useContext(ChallengeContext);

    const [time, setTime] = useState(25 * 60);
    const [IsActive, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;  

    function startCountdown(){
        setActive(true);
    }
    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(25*60);
        setHasFinished(false);
    }

    useEffect(() =>{
        if(IsActive && time>0){
            countdownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000);
        } else if (IsActive && time ==0){
            setHasFinished(true);
            setActive(false); 
            startNewChallenge();
        }
    }, [IsActive, time])

    return (
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            IsActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountDownContext.Provider>
    );
}
