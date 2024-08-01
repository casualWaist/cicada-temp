import {useContext, useRef} from "react"
import {AppContext} from "@/components/AppState"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"

export default function Notifications() {
    const [appState, setAppState] = useContext(AppContext)
    const container = useRef<HTMLDivElement>(null!)
    const timelineRef = useRef<gsap.core.Timeline>()

    useGSAP(() => {
        if (timelineRef.current) timelineRef.current.kill()
            const tl = gsap.timeline();
            tl.fromTo(container.current,
                {y: '-100%'},
                {y: '0%', duration: 1, ease: 'power2.out'}
            )
                .to(container.current, {duration: 3.5})
                .to(container.current,
                    {y: '-100%', duration: 1, ease: 'power2.in'}
                )
                .call(() => setAppState({notify: false}));
            timelineRef.current = tl;

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill()
            }
        }
    }, {dependencies: [appState.notify, appState.noteText], scope: container})

    if (appState.noteStyle === 'alert') return (
        <div ref={container} className="pointer-events-none absolute top-0 w-full flex justify-center">
            <div className="p-2 max-w-[300px] text-2xl">
                <div className="bg-red-500 text-white p-2 rounded-md">
                    <p className="text-center whitespace-pre-line">
                        {appState.noteText}
                    </p>
                </div>
            </div>
        </div>
    )

    if (appState.noteStyle === 'success') return (
        <div ref={container} className="pointer-events-none absolute top-0 w-full flex justify-center">
            <div className="p-2 max-w-[300px] text-2xl">
                <div className="bg-green-500 text-white p-2 rounded-md">
                    <p className="text-center whitespace-pre-line">
                        {appState.noteText}
                    </p>
                </div>
            </div>
        </div>
    )

    if (appState.noteStyle === 'fail') return (
        <div ref={container} className="pointer-events-none absolute top-0 w-full flex justify-center">
            <div className="p-2 max-w-[300px] text-2xl">
                <div className="bg-red-500 text-white p-2 rounded-md">
                    <p className="text-center whitespace-pre-line">
                        {appState.noteText}
                    </p>
                </div>
            </div>
        </div>
    )

    return <div ref={container} className="pointer-events-none absolute top-0 w-full flex justify-center">
        <div className="p-[0.5px] mt-6 rounded-md max-w-[300px] text-2xl goldShine">
            <div className="darkFade text-white p-2 rounded-md">
                <p className="text-center whitespace-pre-line">
                    {appState.noteText}
                </p>
            </div>
        </div>
    </div>
}
