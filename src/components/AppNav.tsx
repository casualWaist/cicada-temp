'use client'

import {
  AxiosContext,
  AppContext,
  AppStateWrapper,
  AxiosProvider,
  AxiosInstance
} from '@/components/AppState'
import Landing from '@/components/Landing'
import { useContext, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import HouseModel from '@/components/HouseModel'
import { Web3ModalProvider } from './Web3ModalProvider'
import { useAccount, useWriteContract } from 'wagmi'
//import { marketplace_abi } from "@/const/abis/marketplace";
import BuyHint from "@/components/BuyHInt"
import BuySQChance from "@/components/BuySQChance"
// import { postData } from "@/actions/commonAction"

export default function AppNav () {
  return (
    <AppStateWrapper>
      <AxiosProvider>
        <Web3ModalProvider>
          <AppTrack />
        </Web3ModalProvider>
      </AxiosProvider>
    </AppStateWrapper>
  )
}

function AppTrack () {
  const [appState, setAppState] = useContext(AppContext)
  const axios = useContext(AxiosContext)
  const account = useAccount()
  const { writeContract } = useWriteContract()

  useEffect(() => {
    const registerWalletAddress = async () => {
      try {
        const response = await axios.post('/auth/register_wallet_address', {});
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    if (account.isConnected && account.address) {
      setAppState({ walletAddress: account.address });
      setAppState({ walletConnected: true });
      AxiosInstance.defaults.headers.account_address = account.address;
      // registerWalletAddress();
    }

    if (!account.isConnected) {
      setAppState({ walletConnected: false })
    }
  }, [account.isConnected])
  return (
    <div className='absolute w-full h-full'>
      <Canvas>
        {appState.section === 'landing' ? <Landing /> : <HouseModel />}
      </Canvas>

      {appState.section === 'landing' ? (
        <div className='absolute top-0 w-full py-16 flex flex-col items-center justify-center'>
          <w3m-button label='Connect Wallet' />
          {appState.walletConnected && (
            <button onClick={() => setAppState({ section: 'map' })}>
              Enter
            </button>
          )}
        </div>
      ) : null}

      {appState.buyingHint && <BuyHint />}
      {appState.buyingSQ && <BuySQChance />}

    </div>
  )
}
