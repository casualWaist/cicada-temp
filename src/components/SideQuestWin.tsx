import {useContext} from "react"
import {AppContext, AxiosContext} from "@/components/AppState"
import {useNotification} from "@/hooks/useNotification"
import XButton, {XFlourish} from "@/components/XButton"

export default function SideQuestWin() {
    const [appState, setAppState] = useContext(AppContext);

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px] border border-[#dab655]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                {!appState.isMobile && <h1 className="text-2xl lg:text-5xl">Your SideQuest</h1>}
                <h2 className="text-2xl">{
                    `Latitude: ${appState.sQWinToShow.lat}`
                }</h2>
                <h2 className="text-2xl">{
                    `Longitude: ${appState.sQWinToShow.lon}`
                }</h2>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0"
                             onClick={() => setAppState({showSQWin: false})}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{transform: 'scaleX(-1)'}}/>
                <a href={appState.sQWinToShow.ytLink} className="text-[#dab655]" target="_blank" rel="noopener noreferrer">
                    {appState.sQWinToShow.ytLink}
                </a>
            </div>
            {appState.isMobile && <h1 className="absolute top-0 p-2 text-2xl">Your SideQuest</h1>}
        </div>
    </div>
}
