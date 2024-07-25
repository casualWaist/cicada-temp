import {AppContext} from "@/components/AppState"
import {useContext} from "react"

export default function BuyLives() {
    const [appState, setAppState] = useContext(AppContext)

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute bg-teal-400 flex flex-col items-center justify-center w-3/4 h-3/4 max-w-[300px] max-h-[600px]">
            <h1 className="text-5xl">Buy Lives</h1>
            <div className="absolute top-0 w-full">
                <button className="absolute right-0 p-4" onClick={() => setAppState({
                    buyingLives: false
                })}>
                    X
                </button>
            </div>
            <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
                <button className="p-6 bg-red-400 rounded-3xl"
                        onClick={() => {
                            setAppState({
                                userLives: appState.userLives + 5 as 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0,
                                buyingLives: false
                            })}}>
                    Buy 5 Lives for $5
                </button>
            </div>
        </div>
    </div>
}
