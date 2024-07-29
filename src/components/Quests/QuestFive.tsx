import {FilePage} from "@/components/FileFolder"
import React, {useContext, useState} from "react"
import {AppContext} from "@/components/AppState"
import {useTexture} from "@react-three/drei"

export default function QuestFive({active}:
    {
        active: boolean
    }) {
    const [appState, setAppState] = useContext(AppContext)
    const [activePage, setActivePage] = useState(1 as 1|2|3)
    const subQ1Tex = useTexture('/SubQuestTextures/Q5sQ1Texture.webp')
    const subQ2Tex = useTexture('/SubQuestTextures/Q5sQ2Texture.webp')
    const subQ3Tex = useTexture('/SubQuestTextures/Q5sQ3Texture.webp')

    if (!active) return <mesh position={[0, 0.004, 0.005]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[0.2, 0.3]}/>
        <meshBasicMaterial color={'#fff'}/>
    </mesh>

    return <>
        <FilePage page={1}
                  quest={5}
                  activePage={activePage}
                  turnThePage={() => {
                      if (appState.quest5.subQ2 !== 'unavailable')
                        setActivePage(2)
                  }}
                  position={[-0.115, 0.004, -0.002]}>
            <mesh position={[0.115, 0.000025, -0.025]} rotation={[-Math.PI * 0.5, 0, 0]}>
                <planeGeometry args={[0.2, 0.2]}/>
                <meshBasicMaterial map={subQ1Tex}/>
            </mesh>
        </FilePage>
        <FilePage page={2}
                  quest={5}
                  activePage={activePage}
                  turnThePage={() => {
                      if (appState.quest5.subQ3 !== 'unavailable') {
                          setActivePage(3)
                      }
                  }}
                  position={[-0.108, 0.003, 0.001]}>
            {activePage === 2 && <mesh position={[0.115, 0.000025, -0.025]} rotation={[-Math.PI * 0.5, 0, 0]}>
                <planeGeometry args={[0.2, 0.2]}/>
                <meshBasicMaterial map={subQ2Tex}/>
            </mesh>}
        </FilePage>
        <FilePage page={3}
                  quest={5}
                  activePage={activePage}
                  turnThePage={() => setActivePage(1)}
                  position={[-0.118, 0.0025, 0]}>
            {activePage === 3 && <mesh position={[0.115, 0.000025, -0.025]} rotation={[-Math.PI * 0.5, 0, 0]}>
                <planeGeometry args={[0.2, 0.2]}/>
                <meshBasicMaterial map={subQ3Tex}/>
            </mesh>}
        </FilePage>
    </>
}