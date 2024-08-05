import {FilePage} from "@/components/FileFolder"
import React, {useContext, useEffect, useState} from "react"
import {AppContext} from "@/components/AppState"
import {useTexture} from "@react-three/drei"

export default function QuestOne({active, open}:
    {
        active: boolean
        open: boolean
    }) {
    const [appState, setAppState] = useContext(AppContext)
    const [activePage, setActivePage] = useState(1 as 1|2|3)
    const subQ1Tex = useTexture('/SubQuestTextures/Q1sQ1Texture.webp')
    const ffPic = useTexture('/SubQuestTextures/Q1sQ1Image.webp')
    const subQ2Tex = useTexture('/SubQuestTextures/Q1sQ2Texture.webp')
    const subQ3Tex = useTexture('/SubQuestTextures/Q1sQ3Texture.webp')

    useEffect(() => {
        if (!open) setActivePage(1)
    }, [open])

    return <>
        {!active && <mesh position={[0, 0.004, 0.002]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[0.2, 0.29]}/>
            <meshBasicMaterial color={'#fff'}/>
        </mesh>}
        <group visible={active}>
            <FilePage page={1}
                      quest={1}
                      activePage={activePage}
                      turnThePage={() => {
                         if (appState.quest1.subQ2 !== 'unavailable')
                             setActivePage(2)
                      }}
                      position={[-0.117, 0.004, -0.002]}>
                <mesh position={[0.115, 0.000025, -0.035]} rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ1Tex} transparent/>
                </mesh>
                <mesh position={[0.085, 0.000025, 0.1]}
                      onClick={(event) => {
                          event.stopPropagation()
                          setAppState({
                          imageView: true,
                          imageToView: {
                              quest: 1,
                              subQ: 1}
                      })}}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.08, 0.06]}/>
                    <meshBasicMaterial map={ffPic}/>
                </mesh>
            </FilePage>
            <FilePage page={2}
                      quest={1}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest1.subQ3 !== 'unavailable') {
                              setActivePage(3)
                          }
                      }}
                      position={[-0.113, 0.003, 0.001]}>
                <mesh position={[0.115, 0.000025, -0.025]}
                      visible={activePage === 2}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ2Tex} transparent/>
                </mesh>
            </FilePage>
            <FilePage page={3}
                      quest={1}
                      activePage={activePage}
                      turnThePage={() => setActivePage(1)}
                      position={[-0.119, 0.0025, 0]}>
                <mesh position={[0.115, 0.000025, -0.025]}
                      visible={activePage === 3}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ3Tex} transparent/>
                </mesh>
            </FilePage>
        </group>
    </>
}
