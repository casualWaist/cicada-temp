import {FilePage} from "@/components/FileFolder"
import React, {useContext, useEffect, useState} from "react"
import {AppContext} from "@/components/AppState"
import {useTexture} from "@react-three/drei"

export default function QuestThree({active, open}:
    {
        open: boolean
        active: boolean
    }) {
    const [appState, setAppState] = useContext(AppContext)
    const [activePage, setActivePage] = useState(1 as 1|2|3)
    const subQ1Tex = useTexture('/SubQuestTextures/Q3sQ1Texture.webp')
    const sQ1Pic = useTexture('/SubQuestTextures/Q3sQ1Image.webp')
    const subQ2Tex = useTexture('/SubQuestTextures/Q3sQ2Texture.webp')
    const sQ2Pic = useTexture('/SubQuestTextures/Q3sQ2Image.webp')
    const subQ3Tex = useTexture('/SubQuestTextures/Q3sQ3Texture.webp')
    const sQ3Pic = useTexture('/SubQuestTextures/Q3sQ3Image.webp')
    const playButton = useTexture('/ButtonTextures/PlayButton.webp')

    useEffect(() => {
        if (!open) setActivePage(1)
    }, [open])

    return <>
        {!active && <mesh position={[0, 0.004, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[0.2, 0.3]}/>
            <meshBasicMaterial color={'#fff'}/>
        </mesh>}
        <group visible={active}>
            <FilePage page={1}
                      quest={3}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest3.subQ2 !== 'unavailable')
                              setActivePage(2)
                      }}
                      position={[-0.115, 0.004, -0.002]}>
                <mesh position={[0.115, 0.000025, -0.025]} rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ1Tex} transparent/>
                </mesh>
                <mesh position={[0.085, 0.000027, 0.08]}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 1) {
                              setAppState({
                                  imageView: true,
                                  imageToView: {
                                      quest: 3,
                                      subQ: 1
                                  }
                              })
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.0707, 0.1]}/>
                    <meshBasicMaterial map={sQ1Pic} transparent/>
                </mesh>
            </FilePage>
            <FilePage page={2}
                      quest={3}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest3.subQ3 !== 'unavailable') {
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
                <mesh position={[0.07, 0.000025, 0.1]}
                      visible={activePage === 2}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 2) {
                              setAppState({
                                  imageView: true,
                                  imageToView: {
                                      quest: 3,
                                      subQ: 2
                                  }
                              })
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.07, 0.0663]}/>
                    <meshBasicMaterial map={sQ2Pic}/>
                </mesh>
            </FilePage>
            <FilePage page={3}
                      quest={3}
                      activePage={activePage}
                      turnThePage={() => setActivePage(1)}
                      position={[-0.118, 0.0025, 0]}>
                <mesh position={[0.115, 0.000025, -0.025]}
                      visible={activePage === 3}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ3Tex} transparent/>
                </mesh>
                <mesh position={[0.06, 0.000025, 0.1]}
                      visible={activePage === 3}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 3) {
                              setAppState({
                                  imageView: true,
                                  imageToView: {
                                      quest: 3,
                                      subQ: 3
                                  }
                              })
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.09, 0.06]}/>
                    <meshBasicMaterial map={sQ3Pic}/>
                </mesh>
                <mesh position={[0.13, 0.000025, 0.1]}
                      visible={activePage === 3}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 3) {
                              window.open('https://www.youtube.com/watch?v=VOWS65WZ868', '_blank')
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.04, 0.02]}/>
                    <meshBasicMaterial map={playButton} transparent/>
                </mesh>
            </FilePage>
        </group>
    </>
}
