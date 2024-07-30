import {useContext} from "react"
import {AppContext} from "@/components/AppState"
import XButton, {XFlourish} from "@/components/XButton"

export default function BuySQChance() {
    const [appState, setAppState] = useContext(AppContext)

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-4xl">Buy SideQuest Chance</h1>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0"
                             onClick={() => setAppState({buyingSQ: false})}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{transform: 'scaleX(-1)'}}/>
                <div className="absolute bottom-0 w-full flex flex-row items-center">
                    <div className="rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-2 lg:p-4 text-[#dab665] darkFade rounded-2xl text-2xl"
                                onClick={() => setAppState((prev) => {
                                    return {
                                        buyingSQ: false,
                                        numberSQSpins: prev.numberSQSpins + 1,
                                        notify: true,
                                        noteText: `You have ${appState.numberSQSpins + 1} SideQuest ${
                                            appState.numberSQSpins > 1 ? 'Spins' : 'Spin'
                                        }`,
                                        noteStyle: 'success'
                                    }
                                })}
                        >
                            Buy for $5
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
