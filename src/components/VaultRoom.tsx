import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { AppContext } from '@/components/AppState'
import { SafeDoor } from '@/components/SafeDoor'

type GLTFResult = GLTF & {
  nodes: {
    SceneBackdrop: THREE.Mesh
    Room_1: THREE.Mesh
    Room_2: THREE.Mesh
    TutorialPoster: THREE.Mesh
    WorkLightClose_1: THREE.Mesh
    WorkLightClose_2: THREE.Mesh
    WorkLightClose_3: THREE.Mesh
    WorkLightFar_1: THREE.Mesh
    WorkLightFar_2: THREE.Mesh
    WorkLightFar_3: THREE.Mesh
    BackBoards_1: THREE.Mesh
    BackBoards_2: THREE.Mesh
    BackBoards_3: THREE.Mesh
    BackBoardsSide_1: THREE.Mesh
    BackBoardsSide_2: THREE.Mesh
    Cable: THREE.Mesh
    Cable001: THREE.Mesh
    Cable002: THREE.Mesh
    Cable003: THREE.Mesh
    Cable004: THREE.Mesh
    Cable005: THREE.Mesh
    Cable006: THREE.Mesh
    Cable007: THREE.Mesh
    Body9: THREE.Mesh
    Body10: THREE.Mesh
    Body5: THREE.Mesh
    Body6: THREE.Mesh
    Body7: THREE.Mesh
    Body8: THREE.Mesh
    Body1: THREE.Mesh
    Body2: THREE.Mesh
    Body4: THREE.Mesh
    Body3: THREE.Mesh
    Board: THREE.Mesh
    Board002: THREE.Mesh
    Board003: THREE.Mesh
    Board004: THREE.Mesh
    Board005: THREE.Mesh
    Board006: THREE.Mesh
    Board007: THREE.Mesh
    Board008: THREE.Mesh
    Board009: THREE.Mesh
    Board010: THREE.Mesh
    Board011: THREE.Mesh
    LightBoard: THREE.Mesh
    StrutBoard: THREE.Mesh
    StrutBoard001: THREE.Mesh
    StrutBoard002: THREE.Mesh
    StrutBoardBottomCross: THREE.Mesh
    StrutBoardMiddleCross: THREE.Mesh
    BigFloorPlank: THREE.Mesh
    Nails: THREE.Mesh
  }
  materials: {}
}

export function VaultRoom (props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/vaultRoom.glb') as GLTFResult
  const camera = useThree(state => state.camera as PerspectiveCamera)
  const [appState, setAppState] = useContext(AppContext)
  const [place, setPlace] = useState(
    'home' as
      | 'home'
      | 's1'
      | 's2'
      | 's3'
      | 's4'
      | 's5'
      | 's6'
      | 's7'
      | 's8'
      | 's9'
      | 's10'
      | 'tut'
  )
  const returnButton = useRef<THREE.Mesh>(null!)
  const vaultRoomTex = useTexture(
      '/FinalTextureVaultRoom.webp',
      (loader) => loader.flipY = false
  )
  const material = useMemo(
      () => new THREE.MeshBasicMaterial({map: vaultRoomTex}),
      [vaultRoomTex]
  )

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
        <SafeDoor
          active={false}
          vault={1}
          position={[1.449, -0.792, -5.844]}
          onClick={() => setPlace('s1')}
          rotation={[0, Math.PI * 0.5, 0]}
        />
        <SafeDoor
          active={place === 's2'}
          vault={2}
          position={[0.846, -0.792, -6.75]}
          onClick={() => setPlace('s2')}
          rotation={
            appState.quest2.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's3'}
          vault={3}
          position={[0.24, -0.792, -7.658]}
          onClick={() => setPlace('s3')}
          rotation={
            appState.quest3.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's4'}
          vault={4}
          position={[-0.322, -0.792, -8.502]}
          onClick={() => setPlace('s4')}
          rotation={
            appState.quest4.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's5'}
          vault={5}
          position={[1.449, 0.027, -5.844]}
          onClick={() => setPlace('s5')}
          rotation={
            appState.quest5.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's6'}
          vault={6}
          position={[0.846, 0.027, -6.75]}
          onClick={() => setPlace('s6')}
          rotation={
            appState.quest6.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's7'}
          vault={7}
          position={[0.24, 0.027, -7.658]}
          onClick={() => setPlace('s7')}
          rotation={
            appState.quest7.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's8'}
          vault={8}
          position={[-0.322, 0.027, -8.502]}
          onClick={() => setPlace('s8')}
          rotation={
            appState.quest8.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's9'}
          vault={9}
          position={[0.858, 0.851, -6.731]}
          onClick={() => setPlace('s9')}
          rotation={
            appState.quest9.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />
        <SafeDoor
          active={place === 's10'}
          vault={10}
          position={[0.255, 0.851, -7.636]}
          onClick={() => setPlace('s10')}
          rotation={
            appState.quest10.status === 'started'
              ? [0, Math.PI * 0.5, 0]
              : [0, -0.983, 0]
          }
        />


        <mesh geometry={nodes.TutorialPoster.geometry}
              material={material}
              position={[-1.937, -0.143, -9.879]}
              onClick={() => setPlace('tut')}
              rotation={[Math.PI / 2, 0, -0.571]}
        />

        <group position={[0, -0.453, -5.491]}>
          <mesh geometry={nodes.Room_1.geometry} material={material}/>
          <mesh geometry={nodes.Room_2.geometry} material={material}/>
        </group>

        <group position={[-2.163, -1.331, -6.438]} rotation={[-Math.PI, 1.183, -Math.PI]}>
          <mesh geometry={nodes.WorkLightClose_1.geometry} material={material}/>
          <mesh geometry={nodes.WorkLightClose_2.geometry} material={material}/>
          <mesh geometry={nodes.WorkLightClose_3.geometry} material={material}/>
        </group>
        <group position={[-1.253, -1.185, -9.002]} rotation={[-2.739, -0.703, -2.932]}>
          <mesh geometry={nodes.WorkLightFar_1.geometry} material={material}/>
          <mesh geometry={nodes.WorkLightFar_2.geometry} material={material}/>
          <mesh geometry={nodes.WorkLightFar_3.geometry} material={material}/>
        </group>
        <group position={[0.642, 0.047, -8.326]}>
          <mesh geometry={nodes.BackBoards_1.geometry} material={material}/>
          <mesh geometry={nodes.BackBoards_2.geometry} material={material}/>
          <mesh geometry={nodes.BackBoards_3.geometry} material={material}/>
        </group>
        <group position={[0, -0.453, -5.491]}>
          <mesh geometry={nodes.BackBoardsSide_1.geometry} material={material}/>
          <mesh geometry={nodes.BackBoardsSide_2.geometry} material={material}/>
        </group>
        <mesh geometry={nodes.Cable.geometry}
              material={material}
              position={[1.641, -1.423, -7.393]}
        />

        <mesh geometry={nodes.Cable001.geometry}
              material={material}
              position={[1.554, -1.423, -7.282]}
        />

        <mesh geometry={nodes.Cable002.geometry}
              material={material}
              position={[-1.847, -1.423, -7.282]}
        />

        <mesh geometry={nodes.Cable003.geometry}
              material={material}
              position={[-1.832, -1.423, -6.883]}
        />

        <mesh geometry={nodes.Cable004.geometry}
              material={material}
              position={[-2.097, -1.423, -8.218]}
        />

        <mesh geometry={nodes.Cable005.geometry}
              material={material}
              position={[1.726, -1.423, -7.494]}
        />

        <mesh geometry={nodes.Cable006.geometry}
              material={material}
              position={[1.819, -1.423, -7.444]}
        />

        <mesh geometry={nodes.Cable007.geometry}
              material={material}
              position={[-1.365, -1.423, -5.385]}
        />
        <mesh geometry={nodes.Body9.geometry}
              material={material}
              position={[0.942, 0.851, -7.138]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body10.geometry}
              material={material}
              position={[0.338, 0.851, -8.044]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body5.geometry}
              material={material}
              position={[1.532, 0.027, -6.252]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body6.geometry}
              material={material}
              position={[0.929, 0.027, -7.157]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body7.geometry}
              material={material}
              position={[0.324, 0.027, -8.066]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body8.geometry}
              material={material}
              position={[-0.238, 0.027, -8.909]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body1.geometry}
              material={material}
              position={[1.532, -0.792, -6.252]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body2.geometry}
              material={material}
              position={[0.929, -0.792, -7.157]}
              rotation={[0, -0.983, 0]}
        />


        <mesh geometry={nodes.Body4.geometry}
              material={material}
              position={[-0.238, -0.792, -8.909]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Body3.geometry}
              material={material}
              position={[0.324, -0.792, -8.066]}
              rotation={[0, -0.983, 0]}
        />

        <mesh geometry={nodes.Board.geometry}
              material={material}
              position={[0.461, -0.415, -7.611]}
              rotation={[0, 0.654, 1.569]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board002.geometry}
              material={material}
              position={[1.618, -0.414, -5.819]}
              rotation={[0, 0.654, -1.573]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board003.geometry}
              material={material}
              position={[1.026, -0.383, -6.732]}
              rotation={[0, 0.654, 1.569]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board004.geometry}
              material={material}
              position={[1.189, 0.43, -6.548]}
              rotation={[0, 0.566, 1.545]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board005.geometry}
              material={material}
              position={[-0.02, 0.372, -8.356]}
              rotation={[0.028, 0.653, 1.552]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board006.geometry}
              material={material}
              position={[1.507, -0.519, -6.925]}
              rotation={[Math.PI / 2, 0, -0.582]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board007.geometry}
              material={material}
              position={[1.229, 0.291, -6.742]}
              rotation={[Math.PI / 2, 0, -0.596]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board008.geometry}
              material={material}
              position={[0.994, 0.438, -7.261]}
              rotation={[Math.PI / 2, 0, -0.596]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board009.geometry}
              material={material}
              position={[2.097, 0.437, -6.019]}
              rotation={[Math.PI / 2, 0, -0.582]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board010.geometry}
              material={material}
              position={[2.11, -0.377, -6.037]}
              rotation={[Math.PI / 2, 0, -0.596]}
              scale={0.67}
        />

        <mesh geometry={nodes.Board011.geometry}
              material={material}
              position={[2.075, -1.166, -6.013]}
              rotation={[1.591, 0.03, -0.596]}
              scale={0.67}
        />

        <mesh geometry={nodes.LightBoard.geometry}
              material={material}
              position={[-1.307, -1.34, -9.112]}
              rotation={[-3.008, 0.939, 3.044]}
              scale={0.67}
        />

        <mesh geometry={nodes.StrutBoard.geometry}
              material={material}
              position={[0.667, 0.444, -7.398]}
              rotation={[Math.PI / 2, 0, 0.998]}
        />

        <mesh geometry={nodes.StrutBoard001.geometry}
              material={material}
              position={[1.295, 0.444, -6.483]}
              rotation={[Math.PI / 2, 0, 1.036]}
        />

        <mesh geometry={nodes.StrutBoard002.geometry}
              material={material}
              position={[-0.566, -0.613, -9.204]}
              rotation={[0, 0.573, Math.PI / 2]}
        />

        <mesh geometry={nodes.StrutBoardBottomCross.geometry}
              material={material}
              position={[0.667, -1.201, -7.398]}
              rotation={[-Math.PI / 2, 0, -1.022]}
        />

        <mesh geometry={nodes.StrutBoardMiddleCross.geometry}
              material={material}
              position={[0.667, -0.383, -7.398]}
              rotation={[Math.PI / 2, 0, 0.998]}
        />

        <mesh geometry={nodes.BigFloorPlank.geometry}
              material={material}
              position={[-0.805, -1.418, -8.41]}
              rotation={[0, -1.092, 0]}
        />

        <mesh geometry={nodes.Nails.geometry}
              material={material}
              position={[1.013, -1.203, -6.687]}
              rotation={[0, 0.654, 1.569]}
        />

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

      <mesh geometry={nodes.SceneBackdrop.geometry}
            position={[-0.322, 0.027, -11.265]}>
        <meshBasicMaterial color="black"/>
      </mesh>
      <directionalLight intensity={0.5} position={[-2.163, -1.331, 8.438]} color={'#ffc876'}/>
    </group>
  )
}

useGLTF.preload('/safeRoom.glb')
