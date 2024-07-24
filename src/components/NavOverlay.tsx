import {useContext} from "react"
import {AppContext} from "@/components/AppState"
import ArrowSVG from "@/components/ArrowSVG"
import DoorsSVG from "@/components/DoorsSVG"
import {Amatic_SC} from "next/font/google"

const amatic = Amatic_SC({subsets: ['latin'], weight: ['400', '700']})

export default function NavOverlay() {
    const [appState, setAppState] = useContext(AppContext)

    if (appState.section === 'landing') return null

    if (appState.section === 'map' && appState.subSection === 'none') return null

    if (appState.section === 'map' && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
            <button className="absolute pointer-events-auto"
                    onClick={() => {
                        appState.moveFunction()
                        setAppState({
                            moveFunction: () => {},
                            subSection: "none"
                        })
                    }}>
                <ArrowSVG width={100} height={100} className=""/>
            </button>
        </div>

    if (appState.section === 'vaults'
        && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
            <button className="absolute pointer-events-auto bottom-0 right-0"
                    onClick={() => setAppState({section: 'map'})}>
                <DoorsSVG width={100} height={100}/>
            </button>
        </div>

    if (appState.section === 'vaults'
        && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
            <button className="absolute pointer-events-auto"
                    onClick={() => {
                        appState.moveFunction()
                        setAppState({
                            moveFunction: () => {},
                            subSection: "none"
                        })
                    }}>
                <ArrowSVG width={100} height={100}/>
            </button>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
            <div className={`absolute left-0 flex h-full items-center ${amatic.className}`}>
                <button className="pointer-events-auto bg-neutral-800 rounded-xl p-6 text-xl"
                        onClick={() => appState.moveFunction()}>
                    Side Quests
                </button>
            </div>
            <button className="absolute pointer-events-auto bottom-0"
                    onClick={() => setAppState({section: 'map'})}>
                <DoorsSVG width={100} height={100}/>
            </button>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'rev')
        return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
            <div className={`absolute right-0 flex h-full items-center ${amatic.className}`}>
                <button className="pointer-events-auto bg-neutral-800 rounded-xl p-6 text-xl"
                        onClick={() => appState.moveFunction()}>
                    Desk
                </button>
            </div>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
            <button className="pointer-events-auto rounded-xl p-6 text-xl"
                    onClick={() => appState.moveFunction()}>
                <ArrowSVG width={100}
                          height={100}
                          className="pointer-events-auto"/>
            </button>
        </div>

    return <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
        <ArrowSVG width={100}
                  height={100}
                  className="pointer-events-auto"
                  onClick={() => setAppState({section: 'map'})}/>
        <DoorsSVG width={100}
                  height={100}
                  className="pointer-events-auto"
                  onClick={() => setAppState({section: 'map'})}/>
    </div>
}
