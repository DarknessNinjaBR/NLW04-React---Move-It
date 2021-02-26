import { createContext, useState, ReactNode } from 'react';
import challanges from '../../challenges.json';

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
}

interface ChallangesProviderProps{
    children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallengesContextData);

export function ChallangesProvider({children}: ChallangesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallange, setActiveChallange] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    function levelUp(){
      setLevel(level + 1);
    }

    function startNewChallange(){
        const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
        const challange = challanges[randomChallangeIndex];
        setActiveChallange(challange);
    }

    function resetChallange(){
        setActiveChallange(null);
    }

    return (
        <ChallangesContext.Provider value={{
            level, 
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            levelUp, 
            startNewChallange,
            activeChallange,
            resetChallange
            }}>
            {children}
        </ChallangesContext.Provider>
    );
}