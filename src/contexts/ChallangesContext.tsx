import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challanges from '../../challenges.json';
import { CompletedChallanges } from '../components/CompletedChallenges';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallangesProviderProps{
    children: ReactNode;
    level: number,
    currentExperience: number,
    completedChallanges: number
}

export const ChallangesContext = createContext({} as ChallengesContextData);

export function ChallangesProvider({
    children, 
    ...rest
}
    : ChallangesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [completedChallanges, setChallangesCompleted] = useState(rest.completedChallanges ?? 0);

    const [activeChallange, setActiveChallange] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('completedChallanges', String(completedChallanges));
    }, [level, currentExperience, completedChallanges])

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
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
            completeChallange,
            closeLevelUpModal,
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallangesContext.Provider>
    );
}