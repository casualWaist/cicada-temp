import {useContext} from "react"
import {AppContext} from "@/components/AppState"
import ArrowSVG from "@/components/ArrowSVG"
import DoorsSVG from "@/components/DoorsSVG"
import LivesSVG from "@/components/LivesSVG"

export default function NavOverlay() {
    const [appState, setAppState] = useContext(AppContext)

    if (appState.section === 'landing') return null

    if (appState.section === 'map' && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                         className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
        </div>

    if (appState.section === 'map' && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                          className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
            <button className="absolute pointer-events-auto"
                    onClick={() => {
                        appState.moveFunction()
                        setAppState({
                            moveFunction: () => {
                            },
                            subSection: "none"
                        })
                    }}>
                <ArrowSVG className="pointer-events-auto w-[100px] h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'vaults'
        && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                          className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
            <button className="absolute pointer-events-auto bottom-0 right-0 p-6"
                    onClick={() => setAppState({section: 'map'})}>
                <DoorsSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'vaults'
        && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                          className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
            <button className="absolute pointer-events-auto p-1 lg:p-6"
                    onClick={() => {
                        appState.moveFunction()
                        setAppState({
                            moveFunction: () => {
                            },
                            subSection: "none"
                        })
                    }}>
                <ArrowSVG className="pointer-events-auto w-[100px] h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                          className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
            <div className="absolute left-8 flex h-full items-center">
                <div className="p-[0.5px] lg:p-[1px] rounded lg:rounded-xl"
                     style={{
                         background: 'var(--gold-shine)'
                     }}>
                    <button className="pointer-events-auto p-1 lg:p-4 rounded text-lg lg:rounded-xl lg:text-xl"
                            style={{
                                color: '#dab655',
                                background: 'var(--dark-fade)'
                            }}
                            onClick={() => appState.moveFunction()}>
                        Side Quests
                    </button>
                </div>
            </div>
            <button className="absolute pointer-events-auto bottom-0 p-6"
                    onClick={() => setAppState({section: 'map'})}>
                <DoorsSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'rev')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                          className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
            <div className="absolute right-0 flex h-full items-center">
                <div className="p-[0.5px] lg:p-[1px] m-4 rounded lg:rounded-xl"
                     style={{
                         background: 'var(--gold-shine)'
                     }}>
                    <button
                        className="pointer-events-auto p-1 px-2 lg:p-4 lg:px-6 rounded text-lg lg:rounded-xl lg:text-xl"
                        style={{
                            color: '#dab655',
                            background: 'var(--dark-fade)'
                        }}
                        onClick={() => appState.moveFunction()}>
                        Desk
                    </button>
                </div>
            </div>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute right-0 w-screen max-w-[100px] p-4 lg:p-0">
                <LivesSVG lives={appState.userLives}
                          className="lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
            </div>
            <button className="pointer-events-auto rounded-xl p-1 lg:p-6 text-xl"
                    onClick={() => appState.moveFunction()}>
                <ArrowSVG className="pointer-events-auto w-[100px] h-[100px]"/>
            </button>
        </div>

    return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <ArrowSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                  onClick={() => setAppState({section: 'map'})}/>
        <DoorsSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                  onClick={() => setAppState({section: 'map'})}/>
    </div>
}
