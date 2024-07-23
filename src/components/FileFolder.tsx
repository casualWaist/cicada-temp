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
  resetPages: () => void
}

export function FileFolder({active, quest, activateFunc, closeFunc, resetPages, ...props}:
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
    }, [active])

  return (
    <group {...props} position={localPosition} rotation={localRotation} dispose={null}>
      <mesh geometry={nodes.FolderBack.geometry}
            onClick={(event) => {
                if (active){
                    event.stopPropagation()
                    if (open) resetPages()
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
                         resetPages()
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
                   let nextPage = page + 1 as 1|2|3
                   if (nextPage > 3) nextPage = 1 as 1|2|3
                   if (appState[questString(quest)][subQString(nextPage)] !== 'unavailable'){
                       turnThePage()
                   }
               }}
               rotation={page < activePage ? [0, 0, Math.PI] : [0, 0, 0]}
               {...props}
  >
      { props.children }
    <meshBasicMaterial color={page > activePage ? "grey" : "white"} side={THREE.DoubleSide} />
      {page === activePage && <HintButton page={page} quest={quest} />}
  </mesh>
}

function HintButton({quest, page}: {quest: 1|2|3|4|5|6|7|8|9|10, page: 1|2|3}) {
    const [appState, setAppState] = useContext(AppContext)
    const titleTexture = useTexture(
        '/TextTextureHint.webp',
        (loader) => {
            loader.wrapS = loader.wrapT = THREE.RepeatWrapping
            loader.repeat.set(0.2, 0.2)
            const offY = 0.4
            let offX = 0
            switch (appState[questString(quest)][subQString(page)]) {
                case 'started':
                    offX = 0
                    break
                case 'hinted':
                    offX = 0.2
                    break
                case 'completed':
                    offX = 0.4
                    break
            }
            loader.offset.set(offX, offY)
        }
    )

    if (appState[questString(quest)][subQString(page)] !== 'started') {
        return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                     position={[0.16, 0.00005, 0.07]}>
            <planeGeometry args={[0.05, 0.05]}/>
            <meshBasicMaterial map={titleTexture}/>
        </mesh>
    }

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.16, 0.00005, 0.07]}
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
