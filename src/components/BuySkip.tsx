import {useContext, useEffect, useState} from "react"
import {AppContext, AxiosContext} from "@/components/AppState"
import XButton, {XFlourish} from "@/components/XButton"
import {useNotification} from "@/hooks/useNotification";

import {useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract} from 'wagmi'
import {marketplace_abi} from "@/const/abis/marketplace";
import {erc20_abi} from "@/const/abis/erc20";
import {parseEther} from 'viem'
import usePrice from "@/hooks/usePrice";

export default function BuySkip() {
    const [appState, setAppState] = useContext(AppContext);
    const axios = useContext(AxiosContext);
    const notify = useNotification();

    const {skipQuestPrice, balance} = usePrice();
    const {data: hash, error, isPending, writeContract} = useWriteContract();
    const [hashes, setHashes] = useState<string[]>([]);
    const [lastHash, setLastHash] = useState("" as `0x${string}`);

    const vaultToActivate = `quest${appState.skipToBuy + 1}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest10';
    const vaultToOpen = `quest${appState.skipToBuy}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest10';
    const questString = `quest${appState.skipToBuy - 1}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10';
    let buttonText = '$10';
    if (appState.skipToBuy === 3) {
        buttonText = '$20';
    }
    if (appState.skipToBuy === 4) {
        buttonText = '$30';
    }

    const buySkip = async () => {
        setHashes([]);
        setLastHash("" as `0x${string}`);
        let realPrice = Number(skipQuestPrice) * (appState.skipToBuy - 1)
        if (!balance || !realPrice || Number(balance) < realPrice) {
            return notify("fail", "Insufficient token balance");
        }
        writeContract({
            address: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
            abi: erc20_abi,
            functionName: 'approve',
            args: [
                process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
                parseEther(realPrice.toString())
            ]
        });
        /**/
    };
    const {isSuccess: isConfirmed} = useWaitForTransactionReceipt({hash})
    if (isConfirmed) {
        setHashes((prevHashes) => [...prevHashes, hash as `0x${string}`]);
        setLastHash(hash as `0x${string}`);
        writeContract({
            address: process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
            abi: marketplace_abi,
            functionName: 'skipQuest',
            args: [appState.skipToBuy - 1]
        });
    }

    useEffect(() => {
        const buySkipVault = async () => {
            try {
                const result = await axios.post("/vault/buy_skip", {market_hash: lastHash, vault: vaultToOpen, skipQuestPrice});
                notify("success", `Purchase Successful`);
                setAppState({
                    buyingSkip: false,
                    [vaultToActivate]: {
                        ...appState[vaultToActivate],
                        status: 'locked'
                    },
                    [vaultToOpen]: {
                        ...appState[vaultToOpen],
                        status: 'started',
                        subQ1: 'started',
                    },
                    [questString]: {
                        ...appState[questString],
                        status: 'completed',
                        subQ1: 'completed',
                        subQ2: 'completed',
                        subQ3: 'completed'
                    },
                    notify: true,
                    noteText: `Vault ${appState.skipToBuy} Skipped.\nFind the new Quest on the Desk.`,
                    noteStyle: 'success'
                });
                let response = await axios.get("/quest/get_quest_status");
                setAppState({...response.data});
            } catch (err : any) {
                notify("fail", err.response.data.msg);
            }
        };
        if (hashes.length === 2) {
            buySkipVault();
        }
    }, [hashes]);

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-5xl">Buy Skip</h1>
                <h2 className="text-2xl">{
                    `Skip Vault ${appState.skipToBuy}`
                }</h2>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0" onClick={() => setAppState({
                        buyingSkip: false
                    })}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{transform: 'scaleX(-1)'}}/>
                <div className="absolute bottom-0 w-full">
                    <div className="w-fit rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-2 lg:p-4 text-[#dab655] darkFade rounded-2xl text-2xl" onClick={buySkip}>
                            {`Buy for ${buttonText}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
