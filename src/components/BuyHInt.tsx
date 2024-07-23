import {AppContext} from "@/components/AppState"
import {useContext} from "react"

export default function BuyHint() {
    const [appState, setAppState] = useContext(AppContext)

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute bg-teal-400 flex flex-col items-center justify-center w-3/4 h-3/4 max-w-[300px] max-h-[600px]">
            <h1 className="text-5xl">Buy Hint</h1>
            <div className="absolute top-0 w-full">
                <button className="absolute right-0 p-4" onClick={() => setAppState({buyingHint: false})}>
                    X
                </button>
            </div>
            <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
                <button className="p-6 bg-red-400 rounded-3xl">
                    Buy for $5
                </button>
            </div>
        </div>
    </div>
}