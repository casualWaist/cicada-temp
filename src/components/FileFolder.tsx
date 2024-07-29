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
      OpenLabel: THREE.Mesh
      OpenTrigger: THREE.Mesh
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
    const folderTex = useTexture(
        '/paperNormal512.webp',
        (tex) => {tex.wrapT = tex.wrapS = THREE.RepeatWrapping}
    )
    const material = useMemo(
        () => new THREE.MeshStandardMaterial({
            normalMap: folderTex,
            roughness: 0.5,
            color: "#c4b49a",
            side: THREE.DoubleSide
        }),
        [folderTex]
    )

    useEffect(() => {
        if (!active) setOpen(false)
    }, [active])

  return (
    <group {...props} position={localPosition} rotation={localRotation} dispose={null}>
        <mesh geometry={nodes.FolderBack.geometry}
              material={material}
        >
            <mesh geometry={nodes.FolderFront.geometry}
                  material={material}
                  position={open ? [-0.1145, 0.005, 0] : [-0.115, 0.005, 0]}
                  rotation={open ? [0, 0, Math.PI] : [0, 0, 0]}
                  onClick={(event) => {
                      activateFunc()
                      event.stopPropagation()
                  }}
            >
                <FolderLabel quest={quest} normalMap={folderTex} />
            </mesh>

            <mesh geometry={nodes.OpenTrigger.geometry}
                  onClick={(event) => {
                      if (active) {
                          event.stopPropagation()
                          setOpen(!open)
                      }
                  }}
                  position={[-0.115, 0.002, 0]}>
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {props.children}
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
    const paperTex = useTexture('/paperNormal512.webp')

  return <mesh geometry={nodes.Page.geometry}
               onClick={(event) => {
                   event.stopPropagation()
                   turnThePage()
               }}
               rotation={page < activePage ? [0, 0, Math.PI] : [0, 0, 0]}
               {...props}
  >
      { props.children }
    <meshStandardMaterial color={page > activePage ? "grey" : "white"}
                            normalMap={paperTex}
                          normalScale={new THREE.Vector2(0.25, 0.25)}
                          roughness={0.5}
                          side={THREE.DoubleSide} />
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

function FolderLabel({quest, normalMap}: {quest: 1|2|3|4|5|6|7|8|9|10, normalMap: THREE.Texture}) {
    const titleTexture = useTexture(`/ButtonTextures/Quest${quest}Label.webp`)

    return <mesh position={[0.115, 0.01, -0.05]}
                 rotation={[-Math.PI * 0.5, 0, 0]}
    >
        <planeGeometry args={[0.05, 0.0375]}/>
        <meshBasicMaterial map={titleTexture} transparent/>
    </mesh>
}

function PasswordButton({quest, page}: { quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, page: 1 | 2 | 3 }) {
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
    const livesTex = useTexture(`/ButtonTextures/${lives}Lives.webp`)

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.05, 0.00005, 0.085]}>
        <planeGeometry args={[0.03, 0.03]}/>
        <meshBasicMaterial map={livesTex} color={"#fff"}/>
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
        <planeGeometry args={[0.05, 0.0375]}/>
        <meshBasicMaterial map={titleTexture} transparent />
    </mesh>
}

export function questString(quest: 1|2|3|4|5|6|7|8|9|10): 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10' {
    return `quest${quest}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
}

function subQString(page: 1|2|3): 'subQ1' | 'subQ2' | 'subQ3' {
    return `subQ${page}` as 'subQ1' | 'subQ2' | 'subQ3'
}
