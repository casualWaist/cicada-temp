import React, { useContext, useEffect, useState } from "react"
import { AppContext } from '@/components/AppState'
import { useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { marketplace_abi } from "@/const/abis/marketplace";
import { erc20_abi } from "@/const/abis/erc20";
import { HINT_PRICE } from "@/const/abis";
import { parseEther } from 'viem'

export default function ConnectButtons() {
    const [appState, setAppState] = useContext(AppContext)
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    const { data, refetch } = useBalance({
        address: appState.walletAddress as `0x${string}`,
        token: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    })

    let tokenBalance = data?.formatted

    const buyHint = async() => {
        if (Number(tokenBalance) < HINT_PRICE) {
            alert('insufficient token balance')
            return
        }

        writeContract({
            address: process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`,
            abi: erc20_abi,
            functionName: 'approve',
            args: [ process.env.MARKETPLACE_CONTRACT_ADDRES as `0x${string}`, parseEther('100') ]
        })

    }
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })

    if (isConfirmed) {
        writeContract({
            address: process.env.MARKETPLACE_CONTRACT_ADDRES as `0x${string}`,
            abi: marketplace_abi,
            functionName: 'buyHint',
            args: []
        })
    }

    return (
        <>
            <mesh position={[-1, 2, -12]}
                onClick={() => {

                }}
            >
                <planeGeometry args={[0.5, 0.25]}/>
                <meshBasicMaterial color="red"/>
            </mesh>
            <mesh position={[1, 2, -12]}
            onClick={() => {
                buyHint()
            }}>
                <planeGeometry args={[0.5, 0.25]}/>
                <meshBasicMaterial color="blue"/>
            </mesh>
            <mesh position={[-2, 2, -12]}
                    onClick={buyHint}>
                <planeGeometry args={[0.5, 0.25]}/>
                <meshBasicMaterial color="green"/>
            </mesh>
            <mesh position={[2, 2, -12]}
                    onClick={() => {

                    }}>
                <planeGeometry args={[0.5, 0.25]}/>
                <meshBasicMaterial color="yellow"/>
            </mesh>
        </>
    )
}
