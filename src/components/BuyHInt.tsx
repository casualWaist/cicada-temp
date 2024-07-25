import {AppContext} from "@/components/AppState"
import {useContext} from "react"

export default function BuyHint() {
    const [appState, setAppState] = useContext(AppContext)
    const questString = `quest${appState.pwToEnter.quest}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
    const subQString = `subQ${appState.pwToEnter.subQ}` as 'subQ1' | 'subQ2' | 'subQ3'

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute bg-teal-400 flex flex-col items-center justify-center w-3/4 h-3/4 max-w-[300px] max-h-[600px]">
            <h1 className="text-5xl">Buy Hint</h1>
            <h2 className="text-2xl">{
                `Hint for Quest ${appState.hintToBuy.quest} Page ${appState.hintToBuy.subQ}`
            }</h2>
            <div className="absolute top-0 w-full">
                <button className="absolute right-0 p-4" onClick={() => setAppState({buyingHint: false})}>
                    X
                </button>
            </div>
            <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
                <button className="p-6 bg-red-400 rounded-3xl" onClick={
                    () => {
                        setAppState({
                            buyingHint: false,
                            [questString]: {
                                ...appState[questString],
                                [subQString]: 'hinted'
                            }
                        })
                    }
                }>
                    Buy for $5
                </button>
            </div>
        </div>
    </div>
}
