'use client'

import {createContext, ReactNode, useState} from "react"
import axios from "axios";

export type VaultStatus = 'unavailable' | 'locked' | 'unlocked'

export type AppState = {
    section: 'landing' | 'map' | 'vaults' | 'quests'
    walletConnected: boolean
    buyingHint: boolean
    vault1: VaultStatus
    vault2: VaultStatus
    vault3: VaultStatus
    vault4: VaultStatus
    vault5: VaultStatus
    vault6: VaultStatus
    vault7: VaultStatus
    vault8: VaultStatus
    vault9: VaultStatus
    vault10: VaultStatus
    walletAddress: string
}

type AppStateContext = [ AppState, (objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) => void ]
export const AppContext = createContext<AppStateContext>(null!)

export function AppStateWrapper({ children }: { children: ReactNode }){
    const [appState, _setAppState] = useState<AppState>({
        section: 'landing',
        walletConnected: false,
        buyingHint: false,
        vault1: 'unlocked',
        vault2: 'unavailable',
        vault3: 'unavailable',
        vault4: 'unavailable',
        vault5: 'unavailable',
        vault6: 'unavailable',
        vault7: 'unavailable',
        vault8: 'unavailable',
        vault9: 'unavailable',
        vault10: 'unavailable',
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
