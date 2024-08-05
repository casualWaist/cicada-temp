import {AppContext} from "@/components/AppState"
import {useContext} from "react"
import Image from "next/image"

export default function ImageViewer() {
    const [appState, setAppState] = useContext(AppContext)

    return <button className="fixed top-0 w-screen h-screen flex justify-center items-center"
                   onClick={() => setAppState({
                       imageView: false
                   })}>
        <div className="absolute w-3/4 h-3/4 max-w-[1024px] max-h-[727px]">
                <Image src={`/SubQuestTextures/Q${appState.imageToView.quest}sQ${appState.imageToView.subQ}Image.webp`}
                       className="max-w-3/4 max-h-3/4"
                       fill
                       objectFit={"contain"}
                       alt="Vault Tutorial"/>
        </div>

    </button>
}
