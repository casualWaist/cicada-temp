import {AppContext} from "@/components/AppState"
import {useContext} from "react"
import Image from "next/image"

export default function Tutorials() {
    const [appState, setAppState] = useContext(AppContext)

    return <button className="fixed top-0 w-screen h-screen flex justify-center items-center"
                   onClick={() => setAppState({
                       tutorialView: false
                   })}>
        {appState.tutorial === 'vault' &&
            <div className="absolute w-3/4 h-3/4 max-w-[1024px] max-h-[727px]">
                <Image src="/VaultTutorial.webp"
                       className="max-w-3/4 max-h-3/4"
                       fill
                       objectFit={"contain"}
                       alt="Vault Tutorial"/></div>
        }
        {appState.tutorial === 'quest' &&
            <div className="absolute w-3/4 h-3/4 max-w-[1024px] max-h-[1024px]">
                <Image src="/QuestTutorial.webp"
                       className="max-w-3/4 max-h-3/4"
                       fill
                       objectFit={"contain"}
                       alt="Quest Tutorial"/></div>
        }
        {appState.tutorial === 'sideQuest' &&
            <div className="absolute w-3/4 h-3/4 max-w-[1024px] max-h-[768px]">
                <Image src="/SideQuestTutorial.webp"
                       className="max-w-3/4 max-h-3/4"
                       fill
                       objectFit={"contain"}
                       alt="Side Quest Tutorial"/></div>
        }
    </button>
}
