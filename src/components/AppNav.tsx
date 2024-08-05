'use client'

import {
    AppContext,
    AppStateWrapper,
    AxiosProvider,
} from '@/components/AppState'
import Landing from '@/components/Landing'
import {useContext} from 'react'
import {Canvas} from '@react-three/fiber'
import HouseModel from '@/components/HouseModel'
import {Web3ModalProvider} from './Web3ModalProvider'
import BuyHint from "@/components/BuyHInt"
import BuySQChance from "@/components/BuySQChance"
import NavOverlay from "@/components/NavOverlay"
import EnterQPass from "@/components/EnterQPass"
import BuyLives from "@/components/BuyLives"
import BuySkip from "@/components/BuySkip"
import {Amatic_SC} from "next/font/google"
import Notifications from "@/components/Notifications"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import Tutorials from "@/components/Tutorials"
import ImageViewer from "@/components/ImageViewer"
import SideQuestWin from "@/components/SideQuestWin"
import QuestWin from "@/components/QuestWin"

const amatic = Amatic_SC({subsets: ['latin'], weight: ['400', '700']})
gsap.registerPlugin(useGSAP)

export default function AppNav() {
    return (
        <AppStateWrapper>
            <AxiosProvider>
                <Web3ModalProvider>
                    <AppTrack/>
                </Web3ModalProvider>
            </AxiosProvider>
        </AppStateWrapper>
    )
}

function AppTrack() {
    const [appState, setAppState] = useContext(AppContext);

    return (
        <div className={`fixed overflow-hidden bg-black w-full h-full ${amatic.className}`}>
            <Canvas>
                {appState.section === 'landing' ? <Landing/> : <HouseModel/>}
            </Canvas>

            {appState.section === 'landing' ? (
                <div className='absolute top-0 w-full py-16 flex flex-col items-center justify-center'>
                    <button className={`p-5 text-2xl ${amatic.className}`}
                            onClick={() => setAppState({section: 'map'})}>
                        Enter
                    </button>
                </div>
            ) : null}

            <NavOverlay/>
            {appState.tutorialView && <Tutorials/>}
            {appState.buyingHint && <BuyHint/>}
            {appState.buyingSQ && <BuySQChance/>}
            {appState.enteringPassword && <EnterQPass/>}
            {appState.buyingLives && <BuyLives/>}
            {appState.buyingSkip && <BuySkip/>}
            {appState.showQuestWin && <QuestWin/>}
            {appState.showSQWin && <SideQuestWin/>}
            {appState.imageView && <ImageViewer/>}
            {appState.notify && <Notifications/>}

        </div>
    )
}
