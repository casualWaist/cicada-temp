import {useContext, useRef} from "react"
import {AppContext} from "@/components/AppState"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {Amatic_SC} from "next/font/google"

const amatic = Amatic_SC({subsets: ['latin'], weight: ['400', '700']})

export default function Notifications() {
    const [appState, setAppState] = useContext(AppContext)
    const container = useRef<HTMLDivElement>(null!)

    useGSAP(() => {
            const tl = gsap.timeline();
            tl.fromTo(container.current,
                {y: '-100%'},
                {y: '0%', duration: 1, ease: 'power2.out'}
            )
                .to(container.current, {duration: 5})
                .to(container.current,
                    {y: '-100%', duration: 1, ease: 'power2.in'}
                )
                .call(() => setAppState({...appState, notify: false}));
        },
        {dependencies: [appState.notify], scope: container})

    if (appState.noteStyle === 'alert') return (
        <div ref={container} className="absolute top-0 w-full flex justify-center">
            <div className={`p-2 max-w-[300px] text-2xl ${amatic.className}`}>
                <div className="bg-red-500 text-white p-2 rounded-md">
                    <p className="text-center">
                        {appState.noteText}
                    </p>
                </div>
            </div>
        </div>
    )

    if (appState.noteStyle === 'success') return (
        <div ref={container} className="absolute top-0 w-full flex justify-center">
            <div className={`p-2 max-w-[300px] text-2xl ${amatic.className}`}>
                <div className="bg-green-500 text-white p-2 rounded-md">
                    <p className="text-center">
                        {appState.noteText}
                    </p>
                </div>
            </div>
        </div>
    )

    if (appState.noteStyle === 'fail') return (
        <div ref={container} className="absolute top-0 w-full flex justify-center">
            <div className={`p-2 max-w-[300px] text-2xl ${amatic.className}`}>
                <div className="bg-red-500 text-white p-2 rounded-md">
                    <p className="text-center">
                        {appState.noteText}
                    </p>
                </div>
            </div>
        </div>
    )

    return <div ref={container} className="absolute top-0 w-full flex justify-center">
        <div className={`p-2 max-w-[300px] text-2xl ${amatic.className}`}>
            <div className="bg-green-500 text-white p-2 rounded-md"
                 style={{
                     border: '15px solid',
                     borderImageSlice: '400 fill',
                     borderImageOutset: '0px',
                     borderImage: "url('/ButtonTextures/artDecoFlourish.svg')"
                 }}>
                <p className="text-center">
                    {appState.noteText}
                </p>
            </div>
        </div>
    </div>
}
