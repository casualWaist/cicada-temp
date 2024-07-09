'use client'

import {createContext, ReactNode, useState} from "react"

export type AppState = {
    section: 'landing' | 'ext' | 'map' | 'vaults' | 'quests'
}
type AppStateContext = [ AppState, (objOrFunc: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) => void ]
export const AppContext = createContext<AppStateContext>(null!)

export function AppStateWrapper({ children }: { children: ReactNode }){

    const [appState, _setAppState] = useState<AppState>({
        section: 'landing'
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
