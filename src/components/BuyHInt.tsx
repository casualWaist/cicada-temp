import {AppContext} from "@/components/AppState"
import {useContext} from "react"
import XButton, {XFlourish} from "@/components/XButton"

export default function BuyHint() {
    const [appState, setAppState] = useContext(AppContext)
    const questString = `quest${appState.hintToBuy.quest}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
    const subQString = `subQ${appState.hintToBuy.subQ}` as 'subQ1' | 'subQ2' | 'subQ3'

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-5xl">Buy Hint</h1>
                <h2 className="text-2xl">{
                    `Hint for Quest ${appState.hintToBuy.quest} Page ${appState.hintToBuy.subQ}`
                }</h2>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0"
                             onClick={() => setAppState({buyingHint: false})}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{ transform: 'scaleX(-1)'}} />
                <div className="absolute bottom-0 w-full flex flex-row items-center">
                    <div className="rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-4 rounded-2xl text-2xl"
                                style={{background: 'var(--dark-fade)', color: '#dab655'}}
                                onClick={
                                    () => {
                                        setAppState({
                                            buyingHint: false,
                                            [questString]: {
                                                ...appState[questString],
                                                [subQString]: 'hinted'
                                            },
                                            notify: true,
                                            noteText: 'Purchase Successful',
                                            noteStyle: 'success'
                                        })
                                    }
                                }>
                            Buy for $5
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
