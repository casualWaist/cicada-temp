import {AppContext} from "@/components/AppState"
import {useContext} from "react"
import Image from "next/image"

export default function ImageViewer() {
    const [appState, setAppState] = useContext(AppContext)

    return <button className="fixed top-0 w-screen h-screen flex justify-center items-center"
                   onClick={() => setAppState({
                       imageView: false
                   })}>
        <div className="w-full h-3/4 max-w-[497px] max-h-[497px]
            lg:max-h-[1024px] lg:max-w-[727px] flex justify-center items-center">
            <img src={`/SubQuestTextures/Q${appState.imageToView.quest}sQ${appState.imageToView.subQ}Image.webp`}
                 className=""
                 alt="Vault Tutorial"/>
        </div>

    </button>
}
