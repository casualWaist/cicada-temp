import {createWeb3Modal} from '@web3modal/wagmi/react'
import {defaultWagmiConfig} from '@web3modal/wagmi/react/config'

import {WagmiProvider} from 'wagmi'
import {bscTestnet, mainnet, sepolia} from 'wagmi/chains'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {http, createConfig} from 'wagmi'
import {ReactNode} from 'react'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '9a87296138c83c3d23ba441cca03009f'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, bscTestnet, sepolia] as const
const config = defaultWagmiConfig({
    transports: {
        [bscTestnet.id]: http(),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    chains,
    projectId,
    metadata,
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
})

export function Web3ModalProvider({children}: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}