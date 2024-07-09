'use client'

import {createContext, ReactNode, useState} from "react"

export type VaultStatus = 'unavailable' | 'locked' | 'unlocked'

export type AppState = {
    section: 'landing' | 'map' | 'vaults' | 'quests'
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
}
type AppStateContext = [ AppState, (objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) => void ]
export const AppContext = createContext<AppStateContext>(null!)

export function AppStateWrapper({ children }: { children: ReactNode }){

    const [appState, _setAppState] = useState<AppState>({
        section: 'landing',
        vault1: 'unlocked',
        vault2: 'unavailable',
        vault3: 'unavailable',
        vault4: 'unavailable',
        vault5: 'unavailable',
        vault6: 'unavailable',
        vault7: 'unavailable',
        vault8: 'unavailable',
        vault9: 'unavailable',
        vault10: 'unavailable'
    })
    const setAppState = ((objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) =>
        _setAppState((prevState) =>
            ({
                ...prevState,
                ...(typeof objOrFunc === 'function' ? objOrFunc(prevState) : objOrFunc)
            })))

    return <AppContext.Provider value={[appState, setAppState]}>
        {children}
    </AppContext.Provider>

}
