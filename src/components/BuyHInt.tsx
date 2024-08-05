import {AppContext, AxiosContext} from "@/components/AppState"
import {useContext, useEffect, useState} from "react"
import XButton, {XFlourish} from "@/components/XButton"
import {useNotification} from "@/hooks/useNotification";

import {useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract} from 'wagmi'
import {marketplace_abi} from "@/const/abis/marketplace";
import {erc20_abi} from "@/const/abis/erc20";
import {parseEther} from 'viem'
import usePrice from "@/hooks/usePrice";

export default function BuyHint() {
    const [appState, setAppState] = useContext(AppContext);
    const axios = useContext(AxiosContext);
    const notify = useNotification();
    const {hintPrice, balance} = usePrice();
    const {data: hash, error, isPending, writeContract} = useWriteContract();
    const [hashes, setHashes] = useState<string[]>([]);
    const [lastHash, setLastHash] = useState("" as `0x${string}`);

    const questString = `quest${appState.hintToBuy.quest}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10';
    const subQString = `subQ${appState.hintToBuy.subQ}` as 'subQ1' | 'subQ2' | 'subQ3';

    const buyHint = async () => {
        setHashes([]);
        setLastHash("" as `0x${string}`);
        if (!balance || !hintPrice || balance < hintPrice) {
            return notify("fail", "Insufficient token balance");
        }
        writeContract({
            address: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
            abi: erc20_abi,
            functionName: 'approve',
            args: [
                process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
                parseEther(hintPrice.toString())
            ]
        });

    };
    const {isSuccess: isConfirmed} = useWaitForTransactionReceipt({hash})
    if (isConfirmed) {
        setHashes((prevHashes) => [...prevHashes, hash as `0x${string}`]);
        setLastHash(hash as `0x${string}`);
        writeContract({
            address: process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
            abi: marketplace_abi,
            functionName: 'buyHint',
            args: []
        });
    }
    useEffect(() => {
        const buyHint = async () => {
            try {
                const result = await axios.post("/quest/buy_hint", {market_hash: lastHash, questIdx: appState.pwToEnter.quest, subQuestIdx: appState.pwToEnter.subQ, hintPrice});
                notify("success", result.data.hint);
                setAppState({
                    buyingHint: false,
                    [questString]: {
                        ...appState[questString],
                        [subQString]: 'hinted'
                    },
                });
            } catch (err: any) {
                notify("fail", err.response.data.msg);
            }
        };
        if (hashes.length === 2) {
            buyHint();
        }
    }, [hashes]);


    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px] border border-[#dab655]">
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
                           style={{transform: 'scaleX(-1)'}}/>
                <div className="absolute bottom-0 w-full flex flex-row items-center">
                    <div className="rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-2 lg:p-4 rounded-2xl text-2xl"
                                style={{background: 'var(--dark-fade)', color: '#dab655'}}
                                onClick={buyHint}>
                            Buy for $5
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
