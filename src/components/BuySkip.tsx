import {useContext} from "react"
import {AppContext} from "@/components/AppState"

export default function BuySkip() {
    const [appState, setAppState] = useContext(AppContext)
    const vaultToActivate = `quest${appState.skipToBuy + 1}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest10'
    const vaultToOpen = `quest${appState.skipToBuy}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest10'
    const questString = `quest${appState.skipToBuy - 1}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
    let buttonText = '$10'
    if (appState.skipToBuy === 3) {
        buttonText = '$20'
    }
    if (appState.skipToBuy === 4) {
        buttonText = '$30'
    }

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div
            className="absolute bg-teal-400 flex flex-col items-center justify-center w-3/4 h-3/4 max-w-[300px] max-h-[600px]">
            <h1 className="text-5xl">Buy Skip</h1>
            <h2 className="text-2xl">{
                `Skip Vault ${appState.skipToBuy}`
            }</h2>
            <div className="absolute top-0 w-full">
                <button className="absolute right-0 p-4" onClick={() => setAppState({
                    buyingSkip: false
                })}>
                    X
                </button>
            </div>
            <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
                <button className="p-6 bg-red-400 rounded-3xl" onClick={
                    () => {
                        setAppState({
                            buyingSkip: false,
                            [vaultToActivate]: {
                                ...appState[vaultToActivate],
                                status: 'locked'
                            },
                            [vaultToOpen]: {
                                ...appState[vaultToOpen],
                                status: 'started',
                                subQ1: 'started',
                            },
                            [questString]: {
                                ...appState[questString],
                                status: 'completed',
                                subQ1: 'completed',
                                subQ2: 'completed',
                                subQ3: 'completed'
                            }
                        })
                    }
                }>
                    {`Buy for ${buttonText}`}
                </button>
            </div>
        </div>
    </div>
}
