import AppNav from "@/components/AppNav"
import { Web3ModalProvider } from "@/components/Web3ModalProvider"


export default function Home() {

    // return <Web3ModalProvider>
    //     <main className="flex w-screen h-screen flex-col items-center justify-between">
    //         <AppNav />
    //     </main>
    // </Web3ModalProvider>
    return <main className="flex w-screen h-screen flex-col items-center justify-between">
        <AppNav />
    </main>
}
