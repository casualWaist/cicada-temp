import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Html, useGLTF} from '@react-three/drei'
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
  title: string
  activateFunc: () => void
  closeFunc: () => void
  resetPages: () => void
}

export function FileFolder({active, title, activateFunc, closeFunc, resetPages, ...props}:
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
    page: number
    activePage: number
    turnThePage: () => void
}

export function FilePage({page, activePage, turnThePage, ...props}:
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
    <meshBasicMaterial color={page > activePage ? "grey" : "white"} side={THREE.DoubleSide} />
      {page === activePage && <mesh rotation={[-Math.PI * 0.5, 0, 0]}
             position={[0.16, 0.00005, 0.07]}
             onClick={(event) => {
                 event.stopPropagation()
                 setAppState({buyingHint: true})
             }}
      >
          <planeGeometry args={[0.05, 0.05]}/>
          <meshBasicMaterial color="green"/>
      </mesh>}
  </mesh>
}
