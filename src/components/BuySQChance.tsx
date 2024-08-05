import {useContext, useEffect, useState} from "react"
import {AppContext, AxiosContext} from "@/components/AppState"
import XButton, {XFlourish} from "@/components/XButton"
import {useNotification} from "@/hooks/useNotification";

import {useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract} from 'wagmi'
import {marketplace_abi} from "@/const/abis/marketplace";
import {erc20_abi} from "@/const/abis/erc20";
import {parseEther} from 'viem'
import usePrice from "@/hooks/usePrice";

export default function BuySQChance() {
    const [appState, setAppState] = useContext(AppContext)
    const axios = useContext(AxiosContext);
    const notify = useNotification();
    const {sideQuestPrice, balance} = usePrice();
    const {data: hash, error, isPending, writeContract} = useWriteContract();
    const [hashes, setHashes] = useState<string[]>([]);
    const [lastHash, setLastHash] = useState("" as `0x${string}`);

    const buySideQuestChance = async () => {
        setHashes([]);
        setLastHash("" as `0x${string}`);
        if (!balance || !sideQuestPrice || balance < sideQuestPrice) {
            return notify("fail", "Insufficient token balance");
        }
        writeContract({
            address: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
            abi: erc20_abi,
            functionName: 'approve',
            args: [
                process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
                parseEther(sideQuestPrice.toString())
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
            functionName: 'buySideQuest',
            args: []
        });
    }

    useEffect(() => {
        const buySideQuest = async () => {
            try {
                const result = await axios.post("/quest/buy_side_quest_chance", {market_hash: lastHash, sideQuestPrice});
                notify("success", `You have 1 SideQuest Spin`);
                setAppState((prev) => {
                    return {buyingSQ: false, numberSQSpins: 1,}
                })
            } catch (err : any) {
                notify("fail", err.response.data.msg);
                setAppState((prev) => {
                    return {buyingSQ: false, numberSQSpins: 1,}
                })
            }
        };
        if (hashes.length === 2) {
            buySideQuest();
        }
    }, [hashes]);

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-4xl">Buy SideQuest Chance</h1>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0"
                             onClick={() => setAppState({buyingSQ: false})}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{transform: 'scaleX(-1)'}}/>
                <div className="absolute bottom-0 w-full flex flex-row items-center">
                    <div className="rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-2 lg:p-4 text-[#dab665] darkFade rounded-2xl text-2xl" onClick={buySideQuestChance}>
                            Buy for $5
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
