import {FilePage} from "@/components/FileFolder"
import React, {useContext, useEffect, useState} from "react"
import {AppContext} from "@/components/AppState"
import {useTexture} from "@react-three/drei"

export default function QuestTwo({active, open}:
    {
        open: boolean
        active: boolean
    }) {
    const [appState, setAppState] = useContext(AppContext)
    const [activePage, setActivePage] = useState(1 as 1|2|3)
    const playButton = useTexture('/ButtonTextures/PlayButton.webp')
    const subQ1Tex = useTexture('/SubQuestTextures/Q2sQ1Texture.webp')
    const subQ2Tex = useTexture('/SubQuestTextures/Q2sQ2Texture.webp')
    const sQ2Pic = useTexture('/SubQuestTextures/Q2sQ2Image.webp')
    const subQ3Tex = useTexture('/SubQuestTextures/Q2sQ3Texture.webp')
    const sQ3Pic = useTexture('/SubQuestTextures/Q2sQ3Image.webp')

    useEffect(() => {
        if (!open) setActivePage(1)
    }, [open])

    return <>
        {!active && <mesh position={[0, 0.004, 0.001]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[0.2, 0.29]}/>
            <meshBasicMaterial color={'#fff'}/>
        </mesh>}
        <group visible={active}>
            <FilePage page={1}
                      quest={2}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest2.subQ2 !== 'unavailable')
                              setActivePage(2)
                      }}
                      position={[-0.115, 0.004, -0.002]}>
                <mesh position={[0.115, 0.000025, -0.025]} rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ1Tex} transparent/>
                </mesh>
                <mesh position={[0.07, 0.000025, 0.1]}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 1) {
                              window.open('https://audio.com/cicada/audio/slater-mill-virtual-tour', '_blank')
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.1, 0.05]}/>
                    <meshBasicMaterial map={playButton} transparent/>
                </mesh>
            </FilePage>
            <FilePage page={2}
                      quest={2}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest2.subQ3 !== 'unavailable') {
                              setActivePage(3)
                          }
                      }}
                      position={[-0.108, 0.003, 0.001]}>
                <mesh position={[0.115, 0.000025, -0.025]}
                      visible={activePage === 2}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ2Tex} transparent/>
                </mesh>
                <mesh position={[0.085, 0.000025, 0.08]}
                      visible={activePage === 2}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 2) {
                              setAppState({
                                  imageView: true,
                                  imageToView: {
                                      quest: 2,
                                      subQ: 2
                                  }
                              })
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.12, 0.08]}/>
                    <meshBasicMaterial map={sQ2Pic}/>
                </mesh>
            </FilePage>
            <FilePage page={3}
                      quest={2}
                      activePage={activePage}
                      turnThePage={() => setActivePage(1)}
                      position={[-0.118, 0.0025, 0]}>
                <mesh position={[0.115, 0.000025, -0.025]}
                      visible={activePage === 3}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ3Tex} transparent/>
                </mesh>
                <mesh position={[0.085, 0.000025, 0.1]}
                      visible={activePage === 3}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 3) {
                              setAppState({
                                  imageView: true,
                                  imageToView: {
                                      quest: 2,
                                      subQ: 3
                                  }
                              })
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.08, 0.0668]}/>
                    <meshBasicMaterial map={sQ3Pic}/>
                </mesh>
            </FilePage>
        </group>
    </>
}
