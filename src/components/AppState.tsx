'use client'

import {createContext, ReactNode, useState} from "react"
import axios from "axios";

export type SubQuestStatus = 'unavailable' | 'started' | 'hinted' | 'completed'
export type QuestStatus = {
    status: 'unavailable' | 'locked' | 'started' | 'completed'
    subQ1: SubQuestStatus
    pw1: string
    subQ2: SubQuestStatus
    pw2: string
    subQ3: SubQuestStatus
    pw3: string
}
export type SQWin = {
    lat: number
    lon: number
    mapX: number
    mapY: number
}
export type AppState = {
    section: 'landing' | 'map' | 'vaults' | 'quests'
    subSection: 'none' | 'rev' | 'feature'
    moveFunction: () => void
    walletConnected: boolean
    userLives: 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0
    buyingLives: boolean
    buyingHint: boolean
    hintToBuy: {
        quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
        subQ: 1 | 2 | 3
    }
    enteringPassword: boolean
    pwToEnter: {
        quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
        subQ: 1 | 2 | 3
    }
    buyingSQ: boolean
    numberSQSpins: number
    sideQuestWins: SQWin[]
    buyingSkip: boolean
    skipToBuy: 2 | 3 | 4
    skipsAvailable: boolean
    quest1: QuestStatus
    quest2: QuestStatus
    quest3: QuestStatus
    quest4: QuestStatus
    quest5: QuestStatus
    quest6: QuestStatus
    quest7: QuestStatus
    quest8: QuestStatus
    quest9: QuestStatus
    quest10: QuestStatus
    walletAddress: string
}

type AppStateContext = [ AppState, (objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) => void ]
export const AppContext = createContext<AppStateContext>(null!)

export function AppStateWrapper({ children }: { children: ReactNode }){
    const [appState, _setAppState] = useState<AppState>({
        section: 'landing',
        subSection: 'none',
        moveFunction: () => {},
        walletConnected: false,
        userLives: 10,
        buyingLives: false,
        buyingHint: false,
        hintToBuy: {
            quest: 1,
            subQ: 1
        },
        enteringPassword: false,
        pwToEnter: {
            quest: 1,
            subQ: 1
        },
        buyingSQ: false,
        numberSQSpins: 0,
        sideQuestWins: [],
        buyingSkip:false,
        skipToBuy: 2,
        skipsAvailable: true,
        quest1: {
            status: 'started',
            subQ1: 'started',
            pw1: 'q1p1',
            subQ2: 'unavailable',
            pw2: 'q1p2',
            subQ3: 'unavailable',
            pw3: 'q1p3'
        },
        quest2: {
            status: 'locked',
            subQ1: 'unavailable',
            pw1: 'q2p1',
            subQ2: 'unavailable',
            pw2: 'q2p2',
            subQ3: 'unavailable',
            pw3: 'q2p3'
        },
        quest3: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q3p1',
            subQ2: 'unavailable',
            pw2: 'q3p2',
            subQ3: 'unavailable',
            pw3: 'q3p3'
        },
        quest4: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q4p1',
            subQ2: 'unavailable',
            pw2: 'q4p2',
            subQ3: 'unavailable',
            pw3: 'q4p3'
        },
        quest5: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q5p1',
            subQ2: 'unavailable',
            pw2: 'q5p2',
            subQ3: 'unavailable',
            pw3: 'q5p3'
        },
        quest6: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q6p1',
            subQ2: 'unavailable',
            pw2: 'q6p2',
            subQ3: 'unavailable',
            pw3: 'q6p3'
        },
        quest7: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q7p1',
            subQ2: 'unavailable',
            pw2: 'q7p2',
            subQ3: 'unavailable',
            pw3: 'q7p3'
        },
        quest8: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q8p1',
            subQ2: 'unavailable',
            pw2: 'q8p2',
            subQ3: 'unavailable',
            pw3: 'q8p3'
        },
        quest9: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q9p1',
            subQ2: 'unavailable',
            pw2: 'q9p2',
            subQ3: 'unavailable',
            pw3: 'q9p3'
        },
        quest10: {
            status: 'unavailable',
            subQ1: 'unavailable',
            pw1: 'q10p1',
            subQ2: 'unavailable',
            pw2: 'q10p2',
            subQ3: 'unavailable',
            pw3: 'q10p3'
        },
        walletAddress: ''
    });

    const [walletAddress, setWalletAddress] = useState('');

    const setAppState = ((objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) =>
        _setAppState((prevState) =>
            ({
                ...prevState,
                ...(typeof objOrFunc === 'function' ? objOrFunc(prevState) : objOrFunc)
            })))

    return <AppContext.Provider value={[
        appState,
        setAppState
    ]}>
        {children}
    </AppContext.Provider>
}

export const AxiosInstance = axios.create({
    baseURL: process.env.SERVER_API_ADDRESS, // Replace with your API base URL
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        account_address: ""
    },
});

export const AxiosContext = createContext(AxiosInstance);

export const AxiosProvider = ({ children }: { children: ReactNode }) => (
    <AxiosContext.Provider value={AxiosInstance}>
        {children}
    </AxiosContext.Provider>
);
