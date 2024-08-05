import {AppContext, AxiosContext} from "@/components/AppState"
import {useCallback, useContext, useEffect, useState} from "react"
import XButton, {XFlourish} from "@/components/XButton"
import {useNotification} from "@/hooks/useNotification";

import {useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract} from 'wagmi'
import {marketplace_abi} from "@/const/abis/marketplace";
import {erc20_abi} from "@/const/abis/erc20";
import {parseEther} from 'viem'
import usePrice from "@/hooks/usePrice";

export default function BuyLives() {
    const [appState, setAppState] = useContext(AppContext);
    const axios = useContext(AxiosContext);
    const notify = useNotification();

    const {healthPrice, balance} = usePrice();
    const {data: hash, error, isPending, writeContract} = useWriteContract();
    const [hashes, setHashes] = useState<string[]>([]);
    const [lastHash, setLastHash] = useState("" as `0x${string}`);

    const buyLives = async () => {
        setHashes([]);
        setLastHash("" as `0x${string}`);

        if (!balance || !healthPrice || balance < healthPrice) {
            return notify("fail", "Insufficient token balance");
        }
        writeContract({
            address: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
            abi: erc20_abi,
            functionName: 'approve',
            args: [
                process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
                parseEther((Number(healthPrice) * 5).toString())
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
                functionName: 'buyHealth',
            args: [5]
        });
    }

    useEffect(() => {
        const buyLives = async () => {
            try {
                const result = await axios.post("/quest/buy_lives", { market_hash: lastHash, healthPrice });
                notify("success", `Purchase Successful`);
                setAppState({
                    userLives: result.data.live_count,
                    buyingLives: false,
                });
            } catch (err: any) {
                notify("fail", err.response.data.msg);
            }
        };
        if (hashes.length === 2) {
            buyLives();
        }
    }, [hashes]);

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-5xl">Buying Lives</h1>
                <div className="absolute top-0 w-full">
                    <XFlourish className="absolute top-0 w-full h-[100px]"/>
                    <XButton className="absolute right-0" onClick={() => setAppState({
                        buyingLives: false
                    })}/>
                </div>
                <XFlourish className="absolute bottom-0 w-full h-[100px]"
                           style={{transform: 'scaleX(-1)'}}/>
                <div className="absolute bottom-0 w-full flex flex-row items-center">
                    <div className="rounded-2xl p-[1px] m-6"
                         style={{background: 'var(--gold-shine)'}}>
                        <button className="p-2 lg:p-4 text-[#dab655] darkFade rounded-2xl"
                                onClick={buyLives}>
                            Buy 5 Lives for $5
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
