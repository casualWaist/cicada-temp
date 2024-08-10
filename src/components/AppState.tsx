'use client'

import {createContext, ReactNode, useEffect, useState} from "react"
import axios from "axios";

export type SubQuestStatus = 'unavailable' | 'started' | 'hinted' | 'completed'
export type QuestStatus = {
    status: 'unavailable' | 'locked' | 'started' | 'completed'
    subQ1: SubQuestStatus
    subQ2: SubQuestStatus
    subQ3: SubQuestStatus,
    vaultCode: string | number,
    latitude: number,
    longitude: number,
    ytLink: string
}
export type SQWin = {
    lat: number
    lon: number
    ytLink: string
    mapX: number
    mapY: number
}
export type AppState = {
    section: 'landing' | 'map' | 'vaults' | 'quests'
    subSection: 'none' | 'rev' | 'feature'
    moveFunction: () => void
    walletConnected: boolean
    jackpot: number
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
    showQuestWin: boolean
    questWinToShow: {
        vaultCode: number | string
        lat: number
        lon: number
        ytLink: string
    }
    buyingSQ: boolean
    numberSQSpins: number
    sideQuestWins: SQWin[]
    showSQWin: boolean
    sQWinToShow: SQWin
    buyingSkip: boolean
    skipToBuy: 2 | 3 | 4
    skipsAvailable: boolean
    notify: boolean
    noteText: string
    noteStyle: 'alert' | 'info' | 'success' | 'fail'
    tutorialView: boolean
    tutorial: 'quest' | 'vault' | 'sideQuest'
    folderTutorial: boolean
    isMobile: boolean
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
    walletAddress: string,
    joinBefore: number
}

type AppStateContext = [AppState, (objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) => void]
export const AppContext = createContext<AppStateContext>(null!)

export function AppStateWrapper({children}: { children: ReactNode }) {
    const [appState, _setAppState] = useState<AppState>({
        section: 'landing',
        subSection: 'none',
        moveFunction: () => {
        },
        walletConnected: false,
        jackpot: 0.00,
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
        showQuestWin: false,
        questWinToShow: {
            vaultCode: 0,
            lat: 0,
            lon: 0,
            ytLink: ''
        },
        buyingSQ: false,
        numberSQSpins: 0,
        sideQuestWins: [],
        showSQWin: false,
        sQWinToShow: {
            lat: 0,
            lon: 0,
            ytLink: '',
            mapX: 0,
            mapY: 0
        },
        buyingSkip: false,
        skipToBuy: 2,
        skipsAvailable: false,
        notify: false,
        noteText: 'Success!',
        noteStyle: 'success',
        tutorialView: false,
        tutorial: 'quest',
        folderTutorial: true,
        isMobile: false,
        quest1: {
            status: 'started',
            subQ1: 'started',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest2: {
            status: 'locked',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest3: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest4: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest5: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest6: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest7: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest8: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest9: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        quest10: {
            status: 'unavailable',
            subQ1: 'unavailable',
            subQ2: 'unavailable',
            subQ3: 'unavailable',
            vaultCode: "",
            latitude: 0,
            longitude: 0,
            ytLink: ""
        },
        walletAddress: '',
        joinBefore: 0
    });

    const [walletAddress, setWalletAddress] = useState('');

    const setAppState = ((objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) =>
        _setAppState((prevState) =>
            ({
                ...prevState,
                ...(typeof objOrFunc === 'function' ? objOrFunc(prevState) : objOrFunc)
            })))

    useEffect(() => {
        setAppState({isMobile: /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)})
    }, [])

    return <AppContext.Provider value={[
        appState,
        setAppState
    ]}>
        {children}
    </AppContext.Provider>
}

export const AxiosInstance = axios.create({
    baseURL: process.env.SERVER_API_ADDRESS,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
});

export const AxiosContext = createContext(AxiosInstance);

export const AxiosProvider = ({children}: { children: ReactNode }) => (
    <AxiosContext.Provider value={AxiosInstance}>
        {children}
    </AxiosContext.Provider>
);
