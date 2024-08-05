import {useContext, useEffect} from "react"
import {AppContext, AppState, AxiosContext, AxiosInstance} from "@/components/AppState"
import ArrowSVG from "@/components/ArrowSVG"
import DoorsSVG from "@/components/DoorsSVG"
import LivesSVG from "@/components/LivesSVG"
import JackpotSVG from "@/components/JackpotSVG"
import useAuth from "@/hooks/useAuth"
import {useAccount, useWriteContract} from "wagmi"
import {useNotification} from "@/hooks/useNotification"

export default function NavOverlay() {
    const [appState, setAppState] = useContext(AppContext)
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
        AxiosInstance.defaults.headers.Authorization = "";
        const registerWalletAddress = async (wallet_address : string) => {
            try {
                const response = await axios.post('/auth/register_wallet_address', {wallet_address});
            } catch (error: any) {
                notify('fail', error.response ? error.response.data.msg : 'axios error');
            }
        }
        if (account.isConnected && account.address) {
            setAppState({walletAddress: account.address});
            setAppState({walletConnected: true});
            registerWalletAddress(account.address);
        }

        if (!account.isConnected) {
            setAppState({walletConnected: false})
        }
    }, [account.isConnected]);

    const signIn = async () => {
        try {
            const response = await axios.post('/auth/sign_in_with_wallet', {wallet_address: account.address});
            localStorage.setItem("cicada_token", `${response.data.token}`);
            AxiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            setAppState((prevState: AppState) => ({
                ...prevState,
                walletConnected: true,
            }));
        } catch (error: any) {
            console.log(error);
            notify('fail', error.response.data.msg);
        }
    };

    if (appState.section === 'landing') return null

    if (appState.section === 'map' && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
        </div>

    if (appState.section === 'map' && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
            <button className="absolute pointer-events-auto"
                    onClick={() => {
                        appState.moveFunction()
                        setAppState({
                            moveFunction: () => {
                            },
                            subSection: "none"
                        })
                    }}>
                <ArrowSVG className="pointer-events-auto w-[100px] h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'vaults'
        && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
            <button className="absolute pointer-events-auto bottom-0 right-0 p-6"
                    onClick={() => setAppState({section: 'map'})}>
                <DoorsSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'vaults'
        && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
            <button className="absolute pointer-events-auto p-1 lg:p-6"
                    onClick={() => {
                        appState.moveFunction()
                        setAppState({
                            moveFunction: () => {
                            },
                            subSection: "none"
                        })
                    }}>
                <ArrowSVG className="pointer-events-auto w-[100px] h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'none')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
            <div className="absolute left-8 flex h-full items-center">
                <div className="p-[0.5px] lg:p-[1px] rounded lg:rounded-xl"
                     style={{
                         background: 'var(--gold-shine)'
                     }}>
                    <button className="pointer-events-auto p-1 lg:p-4 rounded text-lg lg:rounded-xl lg:text-xl"
                            style={{
                                color: '#dab655',
                                background: 'var(--dark-fade)'
                            }}
                            onClick={() => appState.moveFunction()}>
                        Side Quests
                    </button>
                </div>
            </div>
            <button className="absolute pointer-events-auto bottom-0 p-6"
                    onClick={() => setAppState({section: 'map'})}>
                <DoorsSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"/>
            </button>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'rev')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
            <div className="absolute right-0 flex h-full items-center">
                <div className="p-[0.5px] lg:p-[1px] m-4 rounded lg:rounded-xl"
                     style={{
                         background: 'var(--gold-shine)'
                     }}>
                    <button
                        className="pointer-events-auto p-1 px-2 lg:p-4 lg:px-6 rounded text-lg lg:rounded-xl lg:text-xl"
                        style={{
                            color: '#dab655',
                            background: 'var(--dark-fade)'
                        }}
                        onClick={() => appState.moveFunction()}>
                        Desk
                    </button>
                </div>
            </div>
        </div>

    if (appState.section === 'quests'
        && appState.subSection === 'feature')
        return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {appState.walletConnected ?
                <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4 lg:p-0">
                    <JackpotSVG value={appState.jackpot}
                                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                    <LivesSVG lives={appState.userLives}
                              className="px-2 lg:p-4 w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                    />
                </div>
                : <div className="absolute flex flex-row justify-end right-0 w-screen max-w-[200px] p-4">
                    <w3m-button label='Connect Wallet'/>
                </div>
            }
            <button className="pointer-events-auto rounded-xl p-1 lg:p-6 text-xl"
                    onClick={() => appState.moveFunction()}>
                <ArrowSVG className="pointer-events-auto w-[100px] h-[100px]"/>
            </button>
        </div>

    return <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <ArrowSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                  onClick={() => setAppState({section: 'map'})}/>
        <DoorsSVG className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                  onClick={() => setAppState({section: 'map'})}/>
    </div>
}
