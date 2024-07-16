import * as THREE from 'three'
import React, {useContext, useEffect, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"
import {AppContext} from "@/components/AppState"

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Plane001_1: THREE.Mesh
    Plane001_2: THREE.Mesh
    Plane001_3: THREE.Mesh
    Plane003: THREE.Mesh
    Cube004: THREE.Mesh
    Cube007_1: THREE.Mesh
    Cube007_2: THREE.Mesh
    Cube006: THREE.Mesh
    Cube009: THREE.Mesh
    Cube009_1: THREE.Mesh
    Plane007_1: THREE.Mesh
    Plane007_2: THREE.Mesh
    Plane008: THREE.Mesh
    Plane008_1: THREE.Mesh
    Plane004: THREE.Mesh
    Mansion_Door: THREE.Mesh
    Mansion_Door001: THREE.Mesh
    Mansion_Door002: THREE.Mesh
    Mansion_Door003: THREE.Mesh
    Cube012_ToShapeMesh_Piece002: THREE.Mesh
    Cube012_ToShapeMesh_Piece002_1: THREE.Mesh
    Cube012_ToShapeMesh_Piece003: THREE.Mesh
    Cube012_ToShapeMesh_Piece003_1: THREE.Mesh
    Plane003_1: THREE.Mesh
    Plane003_2: THREE.Mesh
    Plane003_3: THREE.Mesh
    Plane003_4: THREE.Mesh
    FireplaceHole001: THREE.Mesh
  }
  materials: {}
}

export function MapRoom(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/mapRoom.glb') as GLTFResult
    const camera = useThree((state) => state.camera as PerspectiveCamera)
    const [appState, setAppState] = useContext(AppContext)
    const [leftDoorHover, setLeftDoorHover] = useState(false)
    const [rightDoorHover, setRightDoorHover] = useState(false)
    const [place, setPlace] = useState('home' as 'home' | 'tok' | 'map')
    const mapTex = useTexture('/map.png', (loader) => loader.flipY = false)
    const tokTex = useTexture('/TokenomicsTex.webp', (loader) => loader.flipY = false)

    useEffect(() => {
        switch (place) {
            case 'home':
                camera.position.set(0, 0, -5)
                camera.rotation.set(Math.PI * 0.05, 0, 0)
                camera.fov = 35
                camera.updateProjectionMatrix()
                break
            case 'tok':
                camera.position.set(-3, 0.75, -10.5)
                camera.rotation.set(0, -Math.PI * 0.125, 0)
                break
            case 'map':
                camera.position.set(3, 0.75, -10.5)
                camera.rotation.set(0, Math.PI * 0.125, 0)
        }
    }, [place, camera])

  return (
      <group {...props} dispose={null}>
          <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} position={[0, 0, -8.515]}/>
          <group position={[0, 0, -8.515]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh geometry={nodes.Plane001_1.geometry} material={nodes.Plane001_1.material}/>
              <mesh geometry={nodes.Plane001_2.geometry} material={nodes.Plane001_2.material}/>
              <mesh geometry={nodes.Plane001_3.geometry} material={nodes.Plane001_3.material}/>
          </group>
          <mesh geometry={nodes.Plane003.geometry} material={nodes.Plane003.material} position={[0, 0.459, -12.753]}
                rotation={[Math.PI / 2, 0, 0]} scale={0.291}/>
          <mesh geometry={nodes.Cube004.geometry}
                material={nodes.Cube004.material}
                onClick={() => setPlace('tok')}
                position={[0, 0, -8.515]}/>
          <group position={[-2.122, 1.227, -13.389]} rotation={[0, -0.35, 0]}>
              <mesh geometry={nodes.Cube007_1.geometry} material={nodes.Cube007_1.material}/>
              <mesh geometry={nodes.Cube007_2.geometry} material={nodes.Cube007_2.material}/>
          </group>
          <mesh geometry={nodes.Cube006.geometry}
                material={nodes.Cube006.material}
                onClick={() => setPlace('map')}
                position={[4.144, 0, -8.515]}/>
          <group position={[2.095, 1.227, -13.379]} rotation={[0, 0.352, 0]}>
              <mesh geometry={nodes.Cube009.geometry} material={nodes.Cube009.material}/>
              <mesh geometry={nodes.Cube009_1.geometry} material={nodes.Cube009_1.material}/>
          </group>
          <group position={[6.148, 2.093, -20.765]} rotation={[Math.PI / 2, 0, 1.045]} scale={0.209}>
              <mesh geometry={nodes.Plane007_1.geometry} material={nodes.Plane007_1.material}/>
              <mesh geometry={nodes.Plane007_2.geometry} material={nodes.Plane007_2.material}/>
          </group>
          <group position={[-5.496, 1.604, -17.655]} rotation={[Math.PI / 2, 0, -1.034]} scale={0.209}>
              <mesh geometry={nodes.Plane008.geometry} material={nodes.Plane008.material}/>
              <mesh geometry={nodes.Plane008_1.geometry} material={nodes.Plane008_1.material}/>
          </group>
          <mesh geometry={nodes.Plane004.geometry} material={nodes.Plane004.material}
                position={[-0.012, -0.985, -9.885]} scale={2.141}/>
          <mesh geometry={nodes.Mansion_Door.geometry} material={nodes.Mansion_Door.material}
                position={[-5.584, -1, -17.712]} rotation={[0, 1.045, 0]}/>
          <mesh geometry={nodes.Mansion_Door001.geometry} material={nodes.Mansion_Door001.material}
                position={[6.225, -0.517, -20.832]} rotation={[0, -1.044, 0]}/>
          <mesh geometry={nodes.Mansion_Door002.geometry}
                material={nodes.Mansion_Door002.material}
                onPointerOver={() => setRightDoorHover(true)}
                onPointerOut={() => setRightDoorHover(false)}
                onClick={() => setAppState({section: 'quests'})}
                rotation={rightDoorHover ? [0, -Math.PI * 0.5, 0] : [0, -0.62, 0]}
                position={[5.948, -0.517, -20.566]}/>
          <mesh geometry={nodes.Mansion_Door003.geometry}
                material={nodes.Mansion_Door003.material}
                onPointerOver={() => setLeftDoorHover(true)}
                onPointerOut={() => setLeftDoorHover(false)}
                onClick={() => setAppState({section: 'vaults'})}
                rotation={leftDoorHover ? [0, Math.PI * 0.5, 0] : [0, 0.686, 0]}
                position={[-6.063, 0.241, -16.933]}/>
          <group position={[-2.071, 0.863, -13.839]} rotation={[Math.PI / 2, 0, 0]} scale={[1.936, 1, 1]}>
              <mesh geometry={nodes.Cube012_ToShapeMesh_Piece002.geometry}
                    material={nodes.Cube012_ToShapeMesh_Piece002.material}/>
              <mesh geometry={nodes.Cube012_ToShapeMesh_Piece002_1.geometry}
                    material={nodes.Cube012_ToShapeMesh_Piece002_1.material}/>
          </group>
          <group position={[2.072, 0.863, -13.839]} rotation={[Math.PI / 2, 0, 0]} scale={[1.936, 1, 1]}>
              <mesh geometry={nodes.Cube012_ToShapeMesh_Piece003.geometry}
                    material={nodes.Cube012_ToShapeMesh_Piece003.material}/>
              <mesh geometry={nodes.Cube012_ToShapeMesh_Piece003_1.geometry}
                    material={nodes.Cube012_ToShapeMesh_Piece003_1.material}/>
          </group>
          <group position={[-0.027, -0.979, -13.367]} rotation={[Math.PI, 0, Math.PI]} scale={0.817}>
              <mesh geometry={nodes.Plane003_1.geometry} material={nodes.Plane003_1.material}/>
              <mesh geometry={nodes.Plane003_2.geometry} material={nodes.Plane003_2.material}/>
              <mesh geometry={nodes.Plane003_3.geometry} material={nodes.Plane003_3.material}/>
              <mesh geometry={nodes.Plane003_4.geometry} material={nodes.Plane003_4.material}/>
          </group>
          <mesh geometry={nodes.FireplaceHole001.geometry} material={nodes.FireplaceHole001.material}
                position={[-0.006, -0.398, -14.13]} scale={0.464}/>

          {place === 'map' ?
              <mesh position={[1, 0.5, -12.5]}
                    rotation={[0, 0, 0]}
                    onClick={() => setPlace('home')}>
                  <planeGeometry args={[1, 1]}/>
                  <meshStandardMaterial color="red"/>
              </mesh>
              : null}

          {place === 'tok' ?
              <mesh position={[-1, 0.5, -12.5]}
                    rotation={[0, 0, 0]}
                    onClick={() => setPlace('home')}>
                  <planeGeometry args={[1, 1]}/>
                  <meshStandardMaterial color="red"/>
              </mesh>
              : null}
      </group>
  )
}

useGLTF.preload('/mapRoom.glb')
