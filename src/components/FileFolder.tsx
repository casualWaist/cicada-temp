import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Html, useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"
import {AppContext} from "@/components/AppState"

type GLTFResult = GLTF & {
  nodes: {
    FolderBack: THREE.Mesh
    FolderFront: THREE.Mesh
    Page: THREE.Mesh
  }
  materials: {}
}

type FileFolderProps = {
  active: boolean
  quest: 1|2|3|4|5|6|7|8|9|10
  activateFunc: () => void
  closeFunc: () => void
}

export function FileFolder({active, quest, activateFunc, closeFunc, ...props}:
                               JSX.IntrinsicElements['group'] & FileFolderProps) {

  const { nodes } = useGLTF('/fileFolder.glb') as GLTFResult
  const [open, setOpen] = useState(false)
  const camera = useThree(
      (state) => state.camera as PerspectiveCamera
  )
  const [localPosition, localRotation] = useMemo(() => {
    const position = active
        ? camera.position.clone()
        : props.position! as THREE.Vector3
    const rotation = active
        ? camera.rotation.clone()
        : new THREE.Euler(0, 0, 0,)
    if (active){
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
      const targetPos = forward.multiplyScalar(0.5).add(camera.position)
      rotation.x = Math.PI * 0.25
      position.set(targetPos.x, targetPos.y, targetPos.z)
    }
    return [position, rotation]
  }, [active, props.position, camera.position])
    const titleTexture = useTexture(
        '/TextTexture.webp',
        (loader) => {
            loader.wrapS = loader.wrapT = THREE.RepeatWrapping
            loader.repeat.set(0.2, 0.2)
            const offY = quest > 5 ? 0.2 : 0
            const offX = 0.2 * (quest - 1 % 5)
            loader.offset.set(offX, offY)
        }
    )

    useEffect(() => {
        if (!active) setOpen(false)
        titleTexture.needsUpdate = true
    }, [active])

  return (
    <group {...props} position={localPosition} rotation={localRotation} dispose={null}>
      <mesh geometry={nodes.FolderBack.geometry}
            onClick={(event) => {
                if (active){
                    event.stopPropagation()
                    setOpen(!open)
                }
            }}
      >
        <mesh geometry={nodes.FolderFront.geometry}
              position={[-0.115, 0.005, 0]}
              rotation={open ? [0, 0, Math.PI] : [0, 0, 0]}
              onClick={(event) => {
                activateFunc()
                event.stopPropagation()
              }}
        >
            <mesh position={[0.115, 0.01, 0]}
                  rotation={[-Math.PI * 0.5, 0, 0]}
            >
                <planeGeometry args={[0.05, 0.05]}/>
                <meshBasicMaterial map={titleTexture} />
            </mesh>
            <meshBasicMaterial color="yellow" side={THREE.DoubleSide}/>
        </mesh>

        { props.children }
        <meshBasicMaterial color="yellow" side={THREE.BackSide} />
      </mesh>

      {active && <mesh position={[0, -0.1, 0]}
                       rotation={[-Math.PI * 0.5, 0, 0]}
                       onClick={(event) => {
                         event.stopPropagation()
                         closeFunc()
                       }}
      >
        <planeGeometry args={[1, 1]}/>
        <meshBasicMaterial transparent opacity={0}/>
      </mesh> }
    </group>
  )
}

useGLTF.preload('/fileFolder.glb')

type FilePageProps = {
    quest: 1|2|3|4|5|6|7|8|9|10
    page: 1|2|3
    activePage: number
    turnThePage: () => void
}

export function FilePage({quest, page, activePage, turnThePage, ...props}:
                             JSX.IntrinsicElements['mesh'] & FilePageProps) {
  const { nodes} = useGLTF('/fileFolder.glb') as GLTFResult
  const [appState, setAppState] = useContext(AppContext)

  return <mesh geometry={nodes.Page.geometry}
               onClick={(event) => {
                   event.stopPropagation()
                   turnThePage()
               }}
               rotation={page < activePage ? [0, 0, Math.PI] : [0, 0, 0]}
               {...props}
  >
      { props.children }
    <meshBasicMaterial color={page > activePage ? "grey" : "white"} side={THREE.DoubleSide} />
      {page === activePage && <>
          <LivesCounter lives={appState.userLives}/>
          {appState.userLives === 0 && <BuyLivesButton/>}
          <HintButton page={page} quest={quest}/>
          {
              ['started', 'hinted'].includes(appState[questString(quest)][subQString(page)])
              && appState.userLives > 0
              && <PasswordButton page={page} quest={quest}/>
          }
      </>}
  </mesh>
}

function PasswordButton({quest, page}: {quest: 1|2|3|4|5|6|7|8|9|10, page: 1|2|3}) {
    const [appState, setAppState] = useContext(AppContext)
    const buttonTex = useTexture('/ButtonTextures/EnterPassword.webp')

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.1, 0.00005, 0.1]}
                 onClick={(event) => {
                     event.stopPropagation()
                     setAppState({
                         enteringPassword: true,
                         pwToEnter: {
                             quest: quest,
                             subQ: page
                         }
                     })
                 }}
    >
        <planeGeometry args={[0.05, 0.05]}/>
        <meshBasicMaterial map={buttonTex} color={"#30fcf3"}/>
    </mesh>
}

function LivesCounter({lives}: {lives: 10|9|8|7|6|5|4|3|2|1|0}) {
    const lives10Tex = useTexture('/ButtonTextures/10Lives.webp')
    const lives9Tex = useTexture('/ButtonTextures/9Lives.webp')
    const lives8Tex = useTexture('/ButtonTextures/8Lives.webp')
    const lives7Tex = useTexture('/ButtonTextures/7Lives.webp')
    const lives6Tex = useTexture('/ButtonTextures/6Lives.webp')
    const lives5Tex = useTexture('/ButtonTextures/5Lives.webp')
    const lives4Tex = useTexture('/ButtonTextures/4Lives.webp')
    const lives3Tex = useTexture('/ButtonTextures/3Lives.webp')
    const lives2Tex = useTexture('/ButtonTextures/2Lives.webp')
    const lives1Tex = useTexture('/ButtonTextures/1Lives.webp')
    const lives0Tex = useTexture('/ButtonTextures/0Lives.webp')

    const [tex, setTex] = useState(lives10Tex)

    useEffect(() => {
        switch (lives){
            case 10:
                setTex(lives10Tex)
                break
            case 9:
                setTex(lives9Tex)
                break
            case 8:
                setTex(lives8Tex)
                break
            case 7:
                setTex(lives7Tex)
                break
            case 6:
                setTex(lives6Tex)
                break
            case 5:
                setTex(lives5Tex)
                break
            case 4:
                setTex(lives4Tex)
                break
            case 3:
                setTex(lives3Tex)
                break
            case 2:
                setTex(lives2Tex)
                break
            case 1:
                setTex(lives1Tex)
                break
            case 0:
                setTex(lives0Tex)
                break
        }
    }, [lives])

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.05, 0.00005, 0.085]}>
        <planeGeometry args={[0.03, 0.03]}/>
        <meshBasicMaterial map={tex} color={"#fff"}/>
    </mesh>
}

function BuyLivesButton() {
    const [appState, setAppState] = useContext(AppContext)
    const buttonTex = useTexture('/ButtonTextures/BuyLives.webp')

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.05, 0.00005, 0.115]}
                 onClick={(event) => {
                     event.stopPropagation()
                     setAppState({
                         buyingLives: true,
                     })
                 }}
    >
        <planeGeometry args={[0.025, 0.025]}/>
        <meshBasicMaterial map={buttonTex} color={"#3efc30"}/>
    </mesh>
}

function HintButton({quest, page}: {quest: 1|2|3|4|5|6|7|8|9|10, page: 1|2|3}) {
    const [appState, setAppState] = useContext(AppContext)
    const buyHintTex = useTexture('ButtonTextures/BuyHint.webp')
    const hintTextTex = useTexture('ButtonTextures/HintText.webp')
    const completeTex = useTexture('ButtonTextures/CompleteText.webp')
    const [titleTexture, setTitleTexture] = useState(buyHintTex)

    useEffect(() => {
        switch (appState[questString(quest)][subQString(page)]){
            case 'hinted':
                setTitleTexture(hintTextTex)
                break
            case 'completed':
                setTitleTexture(completeTex)
                break
            default:
                setTitleTexture(buyHintTex)
        }
    }, [appState[questString(quest)][subQString(page)]])

    if (appState[questString(quest)][subQString(page)] !== 'started') {
        return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                     position={[0.18, 0.00005, 0.1]}>
            <planeGeometry args={[0.05, 0.05]}/>
            <meshBasicMaterial map={titleTexture}/>
        </mesh>
    }

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.18, 0.00005, 0.1]}
                 onClick={(event) => {
                     event.stopPropagation()
                     setAppState({
                         buyingHint: true,
                         hintToBuy: {
                             quest:quest,
                             subQ: page
                         }
                     })
                 }}
    >
        <planeGeometry args={[0.05, 0.05]}/>
        <meshBasicMaterial map={titleTexture} color={"#afff9e"}/>
    </mesh>
}

export function questString(quest: 1|2|3|4|5|6|7|8|9|10): 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10' {
    return `quest${quest}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
}

function subQString(page: 1|2|3): 'subQ1' | 'subQ2' | 'subQ3' {
    return `subQ${page}` as 'subQ1' | 'subQ2' | 'subQ3'
}
