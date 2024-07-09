'use client'

import {AppContext, AppStateWrapper} from "@/components/AppState"
import Landing from "@/components/Landing"
import {useContext} from "react"
import {Canvas} from "@react-three/fiber"
import HouseModel from "@/components/HouseModel"

export default function AppNav() {

    return <AppStateWrapper>
        <AppTrack/>
    </AppStateWrapper>
}

function AppTrack() {
    const [appState, setAppState] = useContext(AppContext)

    return <div className="absolute w-full h-full">
        <Canvas>
            { appState.section === 'landing' ? <Landing/> : <HouseModel/> }
            { appState.section === 'landing' ? null : <>
                <directionalLight intensity={2.5} position={[5, 2, 2]}/>
                <directionalLight intensity={5.5} position={[-2, 5, -2]}/>
            </> }
        </Canvas>
        { appState.section === 'landing' ?
            <div className="absolute top-0 w-full py-16 flex items-center justify-center">
                <button onClick={() => setAppState({section: 'ext'})}>
                    Connect Wallet
                </button>
            </div>
            : null
        }
        { appState.section === 'ext' ?
            <div className="absolute top-0 w-full py-16 flex items-center justify-center">
                <button onClick={() => setAppState({section: 'map'})}>
                    Go Inside
                </button>
            </div>
            : null
        }
        { appState.section === 'map' || appState.section === 'vaults' || appState.section === 'quests' ?
            <div className="absolute top-0 w-full py-16 flex items-center justify-center">
                <button className="px-6" onClick={() => setAppState({section: 'vaults'})}>
                    Vaults
                </button>
                <button className="px-6" onClick={() => setAppState({section: 'map'})}>
                    Map Room
                </button>
                <button className="px-6" onClick={() => setAppState({section: 'quests'})}>
                    Quests
                </button>
            </div>
            : null
        }
    </div>

}
