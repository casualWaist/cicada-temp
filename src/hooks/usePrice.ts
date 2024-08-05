import {useBalance, useReadContract} from 'wagmi';
import {marketplace_abi} from "@/const/abis/marketplace";
import {useContext} from "react";
import {AppContext} from "@/components/AppState";

const usePrice = () => {
    const [appState, setAppState] = useContext(AppContext);
    const {data: hintPrice} = useReadContract({
        abi: marketplace_abi,
        address: process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'hintPrice',
    });

    const {data: healthPrice} = useReadContract({
        abi: marketplace_abi,
        address: process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'healthPrice',
    });

    const {data: skipQuestPrice} = useReadContract({
        abi: marketplace_abi,
        address: process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'skipQuestPricePerQuest',
    });
    const {data: sideQuestPrice} = useReadContract({
        abi: marketplace_abi,
        address: process.env.MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'sideQuestPrice',
    });

    const {data: balance} = useBalance({
        address: appState.walletAddress as `0x${string}`,
        token: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    });

    let tokenBalance = balance?.formatted;

    return {
        hintPrice: (hintPrice && Number(hintPrice.toString()) / 10 ** 18),
        healthPrice: (healthPrice && Number(healthPrice.toString()) / 10 ** 18),
        skipQuestPrice: (skipQuestPrice && Number(skipQuestPrice.toString()) / 10 ** 18),
        sideQuestPrice: (sideQuestPrice && Number(sideQuestPrice.toString()) / 10 ** 18),
        balance: tokenBalance
    };
};

export default usePrice;