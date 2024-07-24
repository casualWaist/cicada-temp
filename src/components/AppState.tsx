'use client'

import {createContext, ReactNode, useState} from "react"
import axios from "axios";

export type SubQuestStatus = 'unavailable' | 'started' | 'hinted' | 'completed'
export type QuestStatus = {
    status: 'unavailable' | 'locked' | 'started' | 'completed'
    subQ1: SubQuestStatus
    subQ2: SubQuestStatus
    subQ3: SubQuestStatus
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
    buyingHint: boolean
    hintToBuy: {
        quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
        subQ: 1 | 2 | 3
    }
    buyingSQ: boolean
    numberSQSpins: number
    sideQuestWins: SQWin[]
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
        buyingHint: false,
        hintToBuy: {
            quest: 1,
            subQ: 1
        },
        buyingSQ: false,
        numberSQSpins: 0,
        sideQuestWins: [],
        quest1: {
            status: 'started',
            subQ1: 'started',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest2: {
            status: 'locked',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest3: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest4: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest5: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest6: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest7: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest8: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest9: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
        },
        quest10: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable'
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
