import {FilePage} from "@/components/FileFolder"
import React, {useContext, useEffect, useState} from "react"
import {AppContext} from "@/components/AppState"
import {useTexture} from "@react-three/drei"
import {SRGBColorSpace} from "three"

export default function QuestNine({active, open}:
    {
        open: boolean
        active: boolean
    }) {
    const [appState, setAppState] = useContext(AppContext)
    const [activePage, setActivePage] = useState(1 as 1|2|3)
    const subQ1Tex = useTexture('/SubQuestTextures/Q9sQ1Texture.webp')
    const sQ1Pic = useTexture('/SubQuestTextures/Q9sQ1Image.webp')
    const subQ2Tex = useTexture('/SubQuestTextures/Q9sQ2Texture.webp')
    const sQ2Pic = useTexture('/SubQuestTextures/Q9sQ2Image.webp')
    const subQ3Tex = useTexture('/SubQuestTextures/Q9sQ3Texture.webp')
    const sQ3Pic = useTexture('/SubQuestTextures/Q9sQ3Image.webp')
    const dlButton = useTexture('/ButtonTextures/DownloadButton.webp',
        (tex) => {tex.colorSpace = SRGBColorSpace})

    useEffect(() => {
        if (!open) setActivePage(1)
    }, [open])

    return <>
        {!active && <mesh position={[0.01, 0.004, 0.004]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[0.2, 0.28]}/>
            <meshBasicMaterial color={'#fff'}/>
        </mesh>}
        <group visible={active}>
            <FilePage page={1}
                      quest={9}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest9.subQ2 !== 'unavailable')
                              setActivePage(2)
                      }}
                      position={[-0.115, 0.004, -0.002]}>
                <mesh position={[0.115, 0.000025, -0.025]} rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ1Tex} transparent/>
                </mesh>
                <mesh position={[0.09, 0.000025, 0.1]}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.0609, 0.07]}/>
                    <meshBasicMaterial map={sQ1Pic}/>
                </mesh>
                <mesh position={[0.135, 0.000025, 0.125]}
                      onPointerEnter={() => {
                          document.body.style.cursor = 'pointer'
                      }}
                      onPointerLeave={() => {
                          document.body.style.cursor = 'default'
                      }}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 1) {
                              const link = document.createElement('a')
                              link.href = '/SubQuestTextures/Q9sQ1ImageHQ.png'
                              link.download = 'Q9sQ1ImageHQ.png'
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.015, 0.015]}/>
                    <meshBasicMaterial map={dlButton} transparent/>
                </mesh>
            </FilePage>
            <FilePage page={2}
                      quest={9}
                      activePage={activePage}
                      turnThePage={() => {
                          if (appState.quest9.subQ3 !== 'unavailable') {
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
                <mesh position={[0.075, 0.000025, 0.1]}
                      visible={activePage === 2}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.12, 0.0669]}/>
                    <meshBasicMaterial map={sQ2Pic}/>
                </mesh>
                <mesh position={[0.145, 0.000025, 0.125]}
                      visible={activePage === 2}
                      onPointerEnter={() => {
                          if (activePage === 2) {
                              document.body.style.cursor = 'pointer'
                          }
                      }}
                      onPointerLeave={() => {
                          if (activePage === 2) {
                              document.body.style.cursor = 'default'
                          }
                      }}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 2) {
                              const link = document.createElement('a')
                              link.href = '/SubQuestTextures/Q9sQ2ImageHQ.png'
                              link.download = 'Q9sQ2ImageHQ.png'
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.015, 0.015]}/>
                    <meshBasicMaterial map={dlButton} transparent/>
                </mesh>
            </FilePage>
            <FilePage page={3}
                      quest={9}
                      activePage={activePage}
                      turnThePage={() => setActivePage(1)}
                      position={[-0.118, 0.0025, 0]}>
                <mesh position={[0.115, 0.000025, -0.025]}
                      visible={activePage === 3}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.2, 0.2]}/>
                    <meshBasicMaterial map={subQ3Tex} transparent/>
                </mesh>
                <mesh position={[0.075, 0.000025, 0.09]}
                      visible={activePage === 3}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.11, 0.0619]}/>
                    <meshBasicMaterial map={sQ3Pic}/>
                </mesh>
                <mesh position={[0.14, 0.000025, 0.11]}
                      visible={activePage === 3}
                      onPointerEnter={() => {
                          if (activePage === 3) {
                              document.body.style.cursor = 'pointer'
                          }
                      }}
                      onPointerLeave={() => {
                          if (activePage === 3) {
                              document.body.style.cursor = 'default'
                          }
                      }}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (activePage === 3) {
                              const link = document.createElement('a')
                              link.href = '/SubQuestTextures/Q9sQ3ImageHQ.png'
                              link.download = 'Q9sQ3ImageHQ.png'
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                          }
                      }}
                      rotation={[-Math.PI * 0.5, 0, 0]}>
                    <planeGeometry args={[0.015, 0.015]}/>
                    <meshBasicMaterial map={dlButton} transparent/>
                </mesh>
            </FilePage>
        </group>
    </>
}
