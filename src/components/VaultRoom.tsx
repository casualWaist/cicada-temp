import * as THREE from 'three'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"
import {AppContext} from "@/components/AppState"
import {SafeDoor} from "@/components/SafeDoor"

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Cube011: THREE.Mesh
    Cube012: THREE.Mesh
    Cube013: THREE.Mesh
    Cube014: THREE.Mesh
    Cube015: THREE.Mesh
    Cube016: THREE.Mesh
    Plane: THREE.Mesh
    Cube017: THREE.Mesh
    Cube018: THREE.Mesh
    Cube019: THREE.Mesh
    Cube020: THREE.Mesh
    Cube021: THREE.Mesh
    WorkLight_Body_1: THREE.Mesh
    WorkLight_Body_2: THREE.Mesh
    WorkLight_Body_3: THREE.Mesh
    WorkLight_Foot: THREE.Mesh
    WorkLight_Handle: THREE.Mesh
    WorkLight_Body001_1: THREE.Mesh
    WorkLight_Body001_2: THREE.Mesh
    WorkLight_Body001_3: THREE.Mesh
    WorkLight_Foot001: THREE.Mesh
    WorkLight_Handle001: THREE.Mesh
    Cube032: THREE.Mesh
    Cube033: THREE.Mesh
    Cube034: THREE.Mesh
    Cube035: THREE.Mesh
    Cube036: THREE.Mesh
    Cube037: THREE.Mesh
    Cube038: THREE.Mesh
    NurbsPath: THREE.Mesh
    NurbsPath001: THREE.Mesh
    NurbsPath002: THREE.Mesh
    NurbsPath003: THREE.Mesh
    NurbsPath004: THREE.Mesh
    NurbsPath005: THREE.Mesh
    NurbsPath006: THREE.Mesh
    NurbsPath007: THREE.Mesh
    Body: THREE.Mesh
    Body001: THREE.Mesh
    Body002: THREE.Mesh
    Body003: THREE.Mesh
    Body004: THREE.Mesh
    Body005: THREE.Mesh
    Body006: THREE.Mesh
    Body007: THREE.Mesh
    Body008: THREE.Mesh
    Body009: THREE.Mesh
  }
  materials: {}
}

export function VaultRoom(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/safeRoom.glb') as GLTFResult
  const camera = useThree((state) => state.camera as PerspectiveCamera)
  const [appState, setAppState] = useContext(AppContext)
  const [place, setPlace] =
      useState('home' as 'home' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10' | 'tut')
  const returnButton = useRef<THREE.Mesh>(null!)
  const vaultTutTex = useTexture('/vaultsTut.webp', (loader) => loader.flipY = false)

  useEffect(() => {
    switch (place) {
      case 'home':
        camera.position.set(0, 0, 0)
        camera.rotation.set(0, 0, 0)
        camera.fov = 27
        camera.updateProjectionMatrix()
        break
      case 's1':
        camera.position.set(0, -0.792, -5.244)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(1.449, -0.792, -6.244)
        break
      case 's2':
        camera.position.set(-0.6, -0.792, -6.244)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(0.546, -0.792, -6.55)
        break
      case 's3':
        camera.position.set(-1.2, -0.792, -7.144)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(0.124, -0.792, -7.58)
        break
      case 's4':
        camera.position.set(-1.8, -0.792, -8.0)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(-0.522, -0.792, -8.402)
        break
      case 's5':
        camera.position.set(0, 0.05, -5.444)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(1.249, 0.027, -5.744)
        break
      case 's6':
        camera.position.set(-0.6, 0.05, -6.244)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(0.646, 0.027, -6.65)
        break
      case 's7':
        camera.position.set(-1.2, 0.05, -7.144)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(0.0, 0.027, -7.458)
        break
      case 's8':
        camera.position.set(-1.8, 0.05, -8.0)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(-0.122, 0.027, -8.442)
        break
      case 's9':
        camera.position.set(-0.6, 0.85, -6.244)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(0.658, 0.851, -6.631)
        break
      case 's10':
        camera.position.set(-1.2, 0.85, -7.144)
        camera.rotation.set(0, -Math.PI * 0.33, 0)
        returnButton.current.position.set(0.055, 0.851, -7.536)
        break
      case 'tut':
        camera.position.set(-1.937, -0.143, -6.879)
        camera.rotation.set(0, 0, 0)
        returnButton.current.position.set(-1.337, -0.143, -9.879)
        break
    }
  }, [place, camera])

  return (
      <group {...props} dispose={null}>
        <group>

          <SafeDoor position={[1.449, -0.792, -5.844]}
                    onClick={() => setPlace('s1')}
                    rotation={[0, Math.PI * 0.5, 0]}/>
          <SafeDoor position={[0.846, -0.792, -6.75]}
                    onClick={() => setPlace('s2')}
                    rotation={appState.vault2 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[0.24, -0.792, -7.658]}
                    onClick={() => setPlace('s3')}
                    rotation={appState.vault3 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[-0.322, -0.792, -8.502]}
                    onClick={() => setPlace('s4')}
                    rotation={appState.vault4 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[1.449, 0.027, -5.844]}
                    onClick={() => setPlace('s5')}
                    rotation={appState.vault5 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[0.846, 0.027, -6.75]}
                    onClick={() => setPlace('s6')}
                    rotation={appState.vault6 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[0.24, 0.027, -7.658]}
                    onClick={() => setPlace('s7')}
                    rotation={appState.vault7 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[-0.322, 0.027, -8.502]}
                    onClick={() => setPlace('s8')}
                    rotation={appState.vault8 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[0.858, 0.851, -6.731]}
                    onClick={() => setPlace('s9')}
                    rotation={appState.vault9 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>
          <SafeDoor position={[0.255, 0.851, -7.636]}
                    onClick={() => setPlace('s10')}
                    rotation={appState.vault10 === 'unlocked' ? [0, Math.PI * 0.5, 0] : [0, -0.983, 0]}/>

          <mesh geometry={nodes.Plane.geometry}
                position={[-1.937, -0.143, -9.879]}
                onClick={() => setPlace('tut')}
                rotation={[Math.PI / 2, 0, -0.571]}>
            <meshBasicMaterial map={vaultTutTex}/>
          </mesh>

          <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} position={[0, -0.453, -5.491]}/>
          <mesh geometry={nodes.Cube011.geometry} material={nodes.Cube011.material} position={[0.667, -1.203, -7.398]}
                rotation={[Math.PI / 2, 0, 1.023]}/>
          <mesh geometry={nodes.Cube012.geometry} material={nodes.Cube012.material} position={[0.667, -0.383, -7.398]}
                rotation={[Math.PI / 2, 0, 0.998]}/>
          <mesh geometry={nodes.Cube013.geometry} material={nodes.Cube013.material} position={[0.202, 0.44, -8.296]}
                rotation={[Math.PI / 2, 0, 1.031]}/>
          <mesh geometry={nodes.Cube014.geometry} material={nodes.Cube014.material} position={[2.11, -0.383, -6.037]}
                rotation={[Math.PI / 2, 0, -0.596]}/>
          <mesh geometry={nodes.Cube015.geometry} material={nodes.Cube015.material} position={[2.11, -1.165, -6.037]}
                rotation={[1.596, 0.038, -0.596]}/>
          <mesh geometry={nodes.Cube016.geometry} material={nodes.Cube016.material} position={[2.039, 0.43, -5.989]}
                rotation={[Math.PI / 2, 0, -0.596]}/>
          <mesh geometry={nodes.Cube017.geometry} material={nodes.Cube017.material} position={[1.507, -0.519, -6.925]}
                rotation={[Math.PI / 2, 0, -0.596]}/>
          <mesh geometry={nodes.Cube018.geometry} material={nodes.Cube018.material} position={[1.507, -1.165, -6.925]}
                rotation={[1.596, 0.038, -0.596]}/>
          <mesh geometry={nodes.Cube019.geometry} material={nodes.Cube019.material} position={[1.437, 0.305, -6.878]}
                rotation={[Math.PI / 2, 0, -0.596]}/>
          <mesh geometry={nodes.Cube020.geometry} material={nodes.Cube020.material} position={[1.28, 0.44, -6.498]}
                rotation={[Math.PI / 2, 0, 0.993]}/>
          <mesh geometry={nodes.Cube021.geometry} material={nodes.Cube021.material} position={[1.12, 0.438, -7.346]}
                rotation={[Math.PI / 2, 0, -0.596]}/>
          <group position={[-2.163, -1.331, -6.438]} rotation={[-Math.PI, 1.183, -Math.PI]}>
            <mesh geometry={nodes.WorkLight_Body_1.geometry} material={nodes.WorkLight_Body_1.material}/>
            <mesh geometry={nodes.WorkLight_Body_2.geometry} material={nodes.WorkLight_Body_2.material}/>
            <mesh geometry={nodes.WorkLight_Body_3.geometry} material={nodes.WorkLight_Body_3.material}/>
          </group>
          <mesh geometry={nodes.WorkLight_Foot.geometry} material={nodes.WorkLight_Foot.material}
                position={[-2.183, -1.359, -6.468]} rotation={[-Math.PI, 1.183, -Math.PI]}/>
          <mesh geometry={nodes.WorkLight_Handle.geometry} material={nodes.WorkLight_Handle.material}
                position={[-2.131, -1.359, -6.417]} rotation={[-Math.PI, 1.183, -Math.PI]}/>
          <group position={[-1.253, -1.185, -9.002]} rotation={[-2.739, -0.703, -2.932]}>
            <mesh geometry={nodes.WorkLight_Body001_1.geometry} material={nodes.WorkLight_Body001_1.material}/>
            <mesh geometry={nodes.WorkLight_Body001_2.geometry} material={nodes.WorkLight_Body001_2.material}/>
            <mesh geometry={nodes.WorkLight_Body001_3.geometry} material={nodes.WorkLight_Body001_3.material}/>
          </group>
          <mesh geometry={nodes.WorkLight_Foot001.geometry} material={nodes.WorkLight_Foot001.material}
                position={[-1.274, -1.214, -9.032]} rotation={[-3.056, -0.728, -Math.PI]}/>
          <mesh geometry={nodes.WorkLight_Handle001.geometry} material={nodes.WorkLight_Handle001.material}
                position={[-1.221, -1.214, -8.981]} rotation={[-3.056, -0.728, -Math.PI]}/>
          <mesh geometry={nodes.Cube032.geometry} material={nodes.Cube032.material} position={[0.642, 0.047, -8.326]}/>
          <mesh geometry={nodes.Cube033.geometry} material={nodes.Cube033.material} position={[0, -0.453, -5.491]}/>
          <mesh geometry={nodes.Cube034.geometry} material={nodes.Cube034.material} position={[0.461, -0.592, -7.611]}
                rotation={[0, 0.573, Math.PI / 2]}/>
          <mesh geometry={nodes.Cube035.geometry} material={nodes.Cube035.material} position={[1.035, -0.383, -6.721]}
                rotation={[0, 0.573, Math.PI / 2]}/>
          <mesh geometry={nodes.Cube036.geometry} material={nodes.Cube036.material} position={[1.16, 0.43, -6.527]}
                rotation={[0, 0.573, Math.PI / 2]}/>
          <mesh geometry={nodes.Cube037.geometry} material={nodes.Cube037.material} position={[1.618, -0.584, -5.817]}
                rotation={[0, 0.573, Math.PI / 2]}/>
          <mesh geometry={nodes.Cube038.geometry} material={nodes.Cube038.material} position={[-0.566, -0.613, -9.204]}
                rotation={[0, 0.573, Math.PI / 2]}/>
          <mesh geometry={nodes.NurbsPath.geometry} material={nodes.NurbsPath.material}
                position={[1.641, -1.423, -7.393]}/>
          <mesh geometry={nodes.NurbsPath001.geometry} material={nodes.NurbsPath001.material}
                position={[1.554, -1.423, -7.282]}/>
          <mesh geometry={nodes.NurbsPath002.geometry} material={nodes.NurbsPath002.material}
                position={[-1.847, -1.423, -7.282]}/>
          <mesh geometry={nodes.NurbsPath003.geometry} material={nodes.NurbsPath003.material}
                position={[-1.832, -1.423, -6.883]}/>
          <mesh geometry={nodes.NurbsPath004.geometry} material={nodes.NurbsPath004.material}
                position={[-2.097, -1.423, -8.218]}/>
          <mesh geometry={nodes.NurbsPath005.geometry} material={nodes.NurbsPath005.material}
                position={[1.726, -1.423, -7.494]}/>
          <mesh geometry={nodes.NurbsPath006.geometry} material={nodes.NurbsPath006.material}
                position={[1.819, -1.423, -7.444]}/>
          <mesh geometry={nodes.NurbsPath007.geometry} material={nodes.NurbsPath007.material}
                position={[-1.365, -1.423, -5.385]}/>
          <mesh geometry={nodes.Body.geometry} material={nodes.Body.material} position={[0.942, 0.851, -7.138]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body001.geometry} material={nodes.Body001.material} position={[0.338, 0.851, -8.044]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body002.geometry} material={nodes.Body002.material} position={[1.532, 0.027, -6.252]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body003.geometry} material={nodes.Body003.material} position={[0.929, 0.027, -7.157]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body004.geometry} material={nodes.Body004.material} position={[0.324, 0.027, -8.066]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body005.geometry} material={nodes.Body005.material} position={[-0.238, 0.027, -8.909]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body006.geometry} material={nodes.Body006.material} position={[1.532, -0.792, -6.252]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body007.geometry} material={nodes.Body007.material} position={[0.929, -0.792, -7.157]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body008.geometry} material={nodes.Body008.material} position={[-0.238, -0.792, -8.909]}
                rotation={[0, -0.983, 0]}/>
          <mesh geometry={nodes.Body009.geometry} material={nodes.Body009.material} position={[0.324, -0.792, -8.066]}
                rotation={[0, -0.983, 0]}/>
        </group>

        <mesh ref={returnButton}
              visible={place !== 'home'}
              rotation={[0, -Math.PI * 0.33, 0]}
              onClick={() => setPlace('home')}>
          <planeGeometry args={[0.1, 0.1]}/>
          <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[0, 0, 0]}
              position={[-1, -1.25, -8]}
              onClick={() => setAppState({section: 'map'})}>
          <planeGeometry args={[0.1, 0.1]}/>
          <meshStandardMaterial color="red"/>
        </mesh>
      </group>
  )
}

useGLTF.preload('/safeRoom.glb')
