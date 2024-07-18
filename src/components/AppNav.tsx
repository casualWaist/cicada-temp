'use client'

import {AppContext, AppStateWrapper} from "@/components/AppState"
import Landing from "@/components/Landing"
import {useContext} from "react"
import {Canvas} from "@react-three/fiber"
import HouseModel from "@/components/HouseModel"
import { Web3ModalProvider } from "./Web3ModalProvider"

export default function AppNav() {

    return <AppStateWrapper>
        {/*<Web3ModalProvider>
        </Web3ModalProvider>*/}
        <AppTrack />
    </AppStateWrapper>
}

function AppTrack() {
    const [appState, setAppState] = useContext(AppContext)

    return <div className="absolute w-full h-full">
        <Canvas>
            {appState.section === 'landing' ? <Landing /> : <HouseModel />}
        </Canvas>
        {appState.section === 'landing' ?
            <div className="absolute top-0 w-full py-16 flex flex-col items-center justify-center">
                <w3m-button label="Connect Wallet"/>
                <button onClick={() => setAppState({section: 'map'})}>
                    Enter
                </button>
            </div>
            : null
        }
    </div>
}
