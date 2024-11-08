'use client'

import {AppContext, AppState, AppStateWrapper, AxiosContext, AxiosInstance, AxiosProvider} from "@/components/AppState"

import Landing from '@/components/Landing'
import {useContext, useEffect} from 'react'
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
import SideQuestWin from "@/components/SideQuestWin"
import QuestWin from "@/components/QuestWin"
import useAuth from "@/hooks/useAuth";
import {useAccount, useWriteContract} from "wagmi";
import {useNotification} from "@/hooks/useNotification";
import {getAxiosErrorMsg} from "@/utils/errorHandler";

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
    const isAuthenticated = useAuth();
    const axios = useContext(AxiosContext);
    const account = useAccount();
    const notify = useNotification();
    const {writeContract} = useWriteContract();

    /*useEffect(() => {
        if (!isAuthenticated && appState.section !== "landing") {
            notify('alert', 'Please select your wallet and click Enter.');
            //setAppState({section: "landing"});
        }
    }, [isAuthenticated, appState.section]);*/

    useEffect(() => {
        const registerWalletAddress = async (wallet_address : string) => {
            try {
                const response = await axios.post('/auth/register_wallet_address', {wallet_address});
                localStorage.setItem("cicada_token", `${response.data.token}`);
                AxiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                setAppState({walletAddress: account.address, walletConnected: true, joinBefore: response.data.joinBefore});
            } catch (error: any) {
                notify('fail', getAxiosErrorMsg(error));
            }
        }
        if (account.isConnected && account.address) {
            registerWalletAddress(account.address);
        }

        if (!account.isConnected) {
            setAppState({walletConnected: false, walletAddress: ""});
            localStorage.removeItem("cicada_token");
            AxiosInstance.defaults.headers.Authorization = null;
        }
    }, [account.isConnected]);

    /*const signIn = async () => {
        if (!account.isConnected) {
            setAppState((prevState: AppState) => ({
                ...prevState,
                section: "map",
            }));
            return;
        }
        try {
            const response = await axios.post('/auth/sign_in_with_wallet', {wallet_address: account.address});
            localStorage.setItem("cicada_token", `${response.data.token}`);
            AxiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            setAppState((prevState: AppState) => ({
                ...prevState,
                section: "map",
                walletConnected: true,
            }));
        } catch (error: any) {
            notify('fail', error.response.data.msg);
        }
    };*/

    return (
        <div className={`fixed overflow-hidden bg-black w-full h-full ${amatic.className}`}>
            <Canvas>
                {appState.section === 'landing' ? <Landing/> : <HouseModel/>}
            </Canvas>

            {appState.section === 'landing' ? (
                <div className='absolute top-0 w-full py-16 flex flex-col items-center justify-center'>
                    <button className={`p-5 text-2xl ${amatic.className}`}
                            onClick={() => setAppState({section: "map"})}>
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
            {appState.notify && <Notifications/>}
        </div>
    )
}
