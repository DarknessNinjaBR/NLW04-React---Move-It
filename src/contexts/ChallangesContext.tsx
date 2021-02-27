import { createContext, useState, ReactNode, useEffect } from 'react';
import challanges from '../../challenges.json';
import { CompletedChallanges } from '../components/CompletedChallenges';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallange: Challenge;
    levelUp: () => void;
    startNewChallange: () => void;
    resetChallange: () => void;
    completeChallange: () => void;
}

interface ChallangesProviderProps{
    children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallengesContextData);

export function ChallangesProvider({children}: ChallangesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [completedChallanges, setChallangesCompleted] = useState(0);

    const [activeChallange, setActiveChallange] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
      setLevel(level + 1);
    }

    function startNewChallange(){
        const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
        const challange = challanges[randomChallangeIndex];

        setActiveChallange(challange);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉🔥', {
                body: `Valendo ${challange.amount}xp!!🆙`
            })
        }
    }

    function resetChallange(){
        setActiveChallange(null);
    }

    function completeChallange(){
        if(!activeChallange){
            return;
        }

        const {amount} = activeChallange;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallange(null);
        setChallangesCompleted(completedChallanges + 1)

    }

    return (
        <ChallangesContext.Provider value={{
            level, 
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted: completedChallanges, 
            levelUp, 
            startNewChallange,
            activeChallange,
            resetChallange,
            completeChallange
            }}>
            {children}
        </ChallangesContext.Provider>
    );
}