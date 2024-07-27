import {AppContext} from "@/components/AppState"
import {useContext} from "react"
import XButton, {XFlourish} from "@/components/XButton"

export default function BuyLives() {
    const [appState, setAppState] = useContext(AppContext)

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-5xl">Buying Lives</h1>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0" onClick={() => setAppState({
                        buyingLives: false
                    })}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{ transform: 'scaleX(-1)'}} />
                <div className="absolute bottom-0 w-full flex flex-row items-center">
                    <div className="rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-4 darkFade rounded-2xl"
                                onClick={() => {
                                    setAppState({
                                        userLives: appState.userLives + 5 as 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0,
                                        buyingLives: false,
                                        notify: true,
                                        noteText: `Purchase Successful`,
                                        noteStyle: 'success'
                                    })}}>
                            Buy 5 Lives for $5
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
