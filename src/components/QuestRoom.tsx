import * as THREE from 'three'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {AppContext} from "@/components/AppState"
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"

type GLTFResult = GLTF & {
  nodes: {
    对象015_1: THREE.Mesh
    对象015_2: THREE.Mesh
    对象015001_1: THREE.Mesh
    对象015001_2: THREE.Mesh
    Books_40_A_1: THREE.Mesh
    Books_40_A_2: THREE.Mesh
    Books_40_A001: THREE.Mesh
    Books_40_A001_1: THREE.Mesh
    Books_40_B_1: THREE.Mesh
    Books_40_B_2: THREE.Mesh
    Books_40_C_1: THREE.Mesh
    Books_40_C_2: THREE.Mesh
    Books_40_C001: THREE.Mesh
    Books_40_C001_1: THREE.Mesh
    Books_40_D_1: THREE.Mesh
    Books_40_D_2: THREE.Mesh
    Books_30_A_1: THREE.Mesh
    Books_30_A_2: THREE.Mesh
    Books_30_B_1: THREE.Mesh
    Books_30_B_2: THREE.Mesh
    Books_30_B001: THREE.Mesh
    Books_30_B001_1: THREE.Mesh
    Books_30_C_1: THREE.Mesh
    Books_30_C_2: THREE.Mesh
    Books_30_D_1: THREE.Mesh
    Books_30_D_2: THREE.Mesh
    Cube004: THREE.Mesh
    Cube004_1: THREE.Mesh
    Cube049: THREE.Mesh
    Cube049_1: THREE.Mesh
    Cube001_1: THREE.Mesh
    Cube001_2: THREE.Mesh
    Cube050: THREE.Mesh
    Cube050_1: THREE.Mesh
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    Cube051: THREE.Mesh
    Cube051_1: THREE.Mesh
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
    Cube052: THREE.Mesh
    Cube052_1: THREE.Mesh
    Cube005: THREE.Mesh
    Cube005_1: THREE.Mesh
    Cube053: THREE.Mesh
    Cube053_1: THREE.Mesh
    Cube006: THREE.Mesh
    Cube006_1: THREE.Mesh
    Cube054: THREE.Mesh
    Cube054_1: THREE.Mesh
    Cube007: THREE.Mesh
    Cube007_1: THREE.Mesh
    Cube055: THREE.Mesh
    Cube055_1: THREE.Mesh
    Cube056: THREE.Mesh
    Cube056_1: THREE.Mesh
    Cube057: THREE.Mesh
    Cube057_1: THREE.Mesh
    Cube058: THREE.Mesh
    Cube058_1: THREE.Mesh
    Cube059: THREE.Mesh
    Cube059_1: THREE.Mesh
    Cube060: THREE.Mesh
    Cube060_1: THREE.Mesh
    Cube061: THREE.Mesh
    Cube061_1: THREE.Mesh
    Cube062: THREE.Mesh
    Cube062_1: THREE.Mesh
    Cube063: THREE.Mesh
    Cube063_1: THREE.Mesh
    Cube064: THREE.Mesh
    Cube064_1: THREE.Mesh
    Cube065: THREE.Mesh
    Cube065_1: THREE.Mesh
    Cube066: THREE.Mesh
    Cube066_1: THREE.Mesh
    Cube067: THREE.Mesh
    Cube067_1: THREE.Mesh
    Plane003: THREE.Mesh
    paper: THREE.Mesh
    Cube: THREE.Mesh
    Plane: THREE.Mesh
    Cube001: THREE.Mesh
    uploads_files_4558823_Newspaper: THREE.Mesh
    Plane001: THREE.Mesh
    Plane002: THREE.Mesh
    Wood_Desk: THREE.Mesh
    Cylinder008: THREE.Mesh
    Cylinder008_1: THREE.Mesh
    Cylinder008_2: THREE.Mesh
    Cylinder008_3: THREE.Mesh
    Cylinder008_4: THREE.Mesh
    Plane027: THREE.Mesh
    Plane027_1: THREE.Mesh
    Plane027_2: THREE.Mesh
    ['File_Cabinets-Freepolyorg']: THREE.Mesh
    ['File_Cabinets-Freepolyorg001']: THREE.Mesh
    ['File_Cabinets-Freepolyorg002']: THREE.Mesh
    ['File_Cabinets-Freepolyorg003']: THREE.Mesh
    Desk_Lamp: THREE.Mesh
    Desk_Lamp001: THREE.Mesh
    Desk_Lamp002: THREE.Mesh
    Cylinder003: THREE.Mesh
    Cylinder003_1: THREE.Mesh
    ['books-3981515_0000_Layer-2006_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2006_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2006_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2006_4']: THREE.Mesh
    ['books-3981515_0000_Layer-2007_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2007_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2007_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2007_4']: THREE.Mesh
    ['books-3981515_0000_Layer-2008_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2008_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2008_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2008_4']: THREE.Mesh
    ['books-3981515_0000_Layer-2009_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2009_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2009_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2009_4']: THREE.Mesh
    ['books-3981515_0000_Layer-2010']: THREE.Mesh
    ['books-3981515_0000_Layer-2010_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2010_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2010_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2011']: THREE.Mesh
    ['books-3981515_0000_Layer-2011_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2011_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2011_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2012']: THREE.Mesh
    ['books-3981515_0000_Layer-2012_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2012_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2012_3']: THREE.Mesh
    ['books-3981515_0000_Layer-2013']: THREE.Mesh
    ['books-3981515_0000_Layer-2013_1']: THREE.Mesh
    ['books-3981515_0000_Layer-2013_2']: THREE.Mesh
    ['books-3981515_0000_Layer-2013_3']: THREE.Mesh
    Antique_Wood_Globe: THREE.Mesh
    FolderBack: THREE.Mesh
    FolderFront: THREE.Mesh
    Page: THREE.Mesh
    FolderBack001: THREE.Mesh
    FolderFront001: THREE.Mesh
    Page001: THREE.Mesh
    FolderBack002: THREE.Mesh
    FolderFront002: THREE.Mesh
    Page002: THREE.Mesh
    FolderBack003: THREE.Mesh
    FolderFront003: THREE.Mesh
    Page003: THREE.Mesh
    FolderBack005: THREE.Mesh
    FolderFront005: THREE.Mesh
    Page005: THREE.Mesh
    FolderBack004: THREE.Mesh
    FolderFront004: THREE.Mesh
    Page004: THREE.Mesh
    FolderBack006: THREE.Mesh
    FolderFront006: THREE.Mesh
    Page006: THREE.Mesh
    FolderBack007: THREE.Mesh
    FolderFront007: THREE.Mesh
    Page007: THREE.Mesh
    FolderBack009: THREE.Mesh
    FolderFront009: THREE.Mesh
    Page009: THREE.Mesh
    FolderBack008: THREE.Mesh
    FolderFront008: THREE.Mesh
    Page008: THREE.Mesh
  }
  materials: {}
}

export function QuestRoom(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/detectiveRoom.glb') as GLTFResult
  const mapTex = useTexture('/map.png', (loader) => loader.flipY = false)
  const [place, setPlace] =
      useState('home' as 'home' | 'sqMap' | 'map' | 'tut' | 'sqTut' | 'rev')
  const [appState, setAppState] = useContext(AppContext)
  const camera = useThree((state) => state.camera as PerspectiveCamera)
  const sqTutorialTex = useTexture('/SQTutorial.webp', (loader) => loader.flipY = false)
  const questsTutTex = useTexture('/questsTut.webp', (loader) => loader.flipY = false)
  const returnButton = useRef<THREE.Mesh>(null!)
  const revReturnButton = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    switch (place) {
      case 'home':
        camera.position.set(-1.05, 0.25, 2.5)
        camera.rotation.set(-Math.PI * 0.025, -Math.PI * 0.2, 0)
        revReturnButton.current.position.set(1.5, -0.5, -1.5)
        break
      case 'sqMap':
        camera.position.set(0.5, 0.25, -2.25)
        camera.rotation.set(0, Math.PI * 0.5, 0)
        returnButton.current.position.set(-1.5, 0.25, -2.95)
        break
      case 'map':
        camera.position.set(0, 0, 0)
        camera.rotation.set(0, -Math.PI * 0.5, 0)
        revReturnButton.current.position.set(-23, 1, -1.5)
        break
      case 'tut':
        camera.position.set(0.75, 0.375, -0.5)
        camera.rotation.set(0, -Math.PI * 0.5, 0)
        returnButton.current.position.set(3.011, 0.95, -1.244)
        break
      case 'rev':
        camera.position.set(0.25, 0.25, -0.25)
        camera.rotation.set(0, Math.PI * 0.15, 0)
        returnButton.current.position.set(-1.5, 0.25, -2.95)
        break
      case 'sqTut':
        camera.position.set(-0.05, 0.25, -1.75)
        camera.rotation.set(0, Math.PI * 0.125, 0)
        returnButton.current.position.set(-1.5, 0.25, -2.95)
        break
    }
  }, [place, camera])

  return (
      <group {...props} dispose={null}>

        <mesh ref={returnButton}
              visible={place !== 'home'}
              rotation={[-Math.PI * 0.25, 0, 0]}
              onClick={() => setPlace('home')}>
          <planeGeometry args={[1, 1]}/>
          <meshStandardMaterial color="red"/>
        </mesh>
        <mesh ref={revReturnButton}
              visible={place !== 'rev'}
              rotation={[Math.PI * 0.75, Math.PI, -Math.PI * 0.1]}
              onClick={() => setPlace('rev')}>
          <planeGeometry args={[1, 1]}/>
          <meshStandardMaterial color="blue"/>
        </mesh>
        <mesh rotation={[Math.PI * 0.75, Math.PI, 0]}
              position={[-17, -1.885, 3]}
              onClick={() => setPlace('home')}>
          <planeGeometry args={[1, 1]}/>
          <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[0, 0, 0]}
              position={[0, -1, 0]}
              onClick={() => setAppState({section: 'map'})}>
          <planeGeometry args={[1, 1]}/>
          <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[-Math.PI * 0.75, Math.PI * 0.125, 0]}
              position={[-18, -0.885, 3.5]}
              onClick={() => setPlace('rev')}>
          <planeGeometry args={[1, 1]}/>
          <meshStandardMaterial color="blue"/>
        </mesh>
        <group position={[2.164, 0.5, -2.638]}>
          <group position={[-0.359, -0.006, -0.619]} rotation={[0, -1.007, 0]}>
            <mesh geometry={nodes.对象015_1.geometry} material={nodes.对象015_1.material}/>
            <mesh geometry={nodes.对象015_2.geometry} material={nodes.对象015_2.material}/>
          </group>
          <group position={[0.434, -0.006, 0.637]} rotation={[-Math.PI, 1.007, 0]} scale={-1}>
            <mesh geometry={nodes.对象015001_1.geometry} material={nodes.对象015001_1.material}/>
            <mesh geometry={nodes.对象015001_2.geometry} material={nodes.对象015001_2.material}/>
          </group>
        </group>
        <group position={[3.025, -0.978, -0.435]}>
          <group position={[0, 0.599, 0]}>
            <group position={[-0.161, -0.084, -0.053]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_40_A_1.geometry} material={nodes.Books_40_A_1.material}/>
              <mesh geometry={nodes.Books_40_A_2.geometry} material={nodes.Books_40_A_2.material}/>
            </group>
            <group position={[-0.48, 0.74, -0.815]} rotation={[0, -1.082, 0]}>
              <mesh geometry={nodes.Books_40_A001.geometry} material={nodes.Books_40_A001.material}/>
              <mesh geometry={nodes.Books_40_A001_1.geometry} material={nodes.Books_40_A001_1.material}/>
            </group>
          </group>
          <group position={[0, 0.401, 0]}>
            <group position={[-0.431, -0.009, -0.248]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_40_B_1.geometry} material={nodes.Books_40_B_1.material}/>
              <mesh geometry={nodes.Books_40_B_2.geometry} material={nodes.Books_40_B_2.material}/>
            </group>
          </group>
          <group position={[0, 0.203, 0]}>
            <group position={[-0.431, -0.009, -0.035]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_40_C_1.geometry} material={nodes.Books_40_C_1.material}/>
              <mesh geometry={nodes.Books_40_C_2.geometry} material={nodes.Books_40_C_2.material}/>
            </group>
            <group position={[-0.443, -0.024, 0.409]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_40_C001.geometry} material={nodes.Books_40_C001.material}/>
              <mesh geometry={nodes.Books_40_C001_1.geometry} material={nodes.Books_40_C001_1.material}/>
            </group>
          </group>
          <group position={[-0.431, -0.009, -0.369]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Books_40_D_1.geometry} material={nodes.Books_40_D_1.material}/>
            <mesh geometry={nodes.Books_40_D_2.geometry} material={nodes.Books_40_D_2.material}/>
          </group>
        </group>
        <group position={[3.025, -0.978, -0.435]}>
          <group position={[-0.006, 0.599, 0]}>
            <group position={[-0.379, -0.219, 0.134]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_30_A_1.geometry} material={nodes.Books_30_A_1.material}/>
              <mesh geometry={nodes.Books_30_A_2.geometry} material={nodes.Books_30_A_2.material}/>
            </group>
          </group>
          <group position={[0, 0.401, 0]}>
            <group position={[-0.331, -0.022, 0.45]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_30_B_1.geometry} material={nodes.Books_30_B_1.material}/>
              <mesh geometry={nodes.Books_30_B_2.geometry} material={nodes.Books_30_B_2.material}/>
            </group>
            <group position={[-0.475, -0.267, 0.186]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_30_B001.geometry} material={nodes.Books_30_B001.material}/>
              <mesh geometry={nodes.Books_30_B001_1.geometry} material={nodes.Books_30_B001_1.material}/>
            </group>
          </group>
          <group position={[0, 0.203, 0]}>
            <group position={[-0.431, -0.009, -0.369]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh geometry={nodes.Books_30_C_1.geometry} material={nodes.Books_30_C_1.material}/>
              <mesh geometry={nodes.Books_30_C_2.geometry} material={nodes.Books_30_C_2.material}/>
            </group>
          </group>
          <group position={[-0.427, 0.134, -0.004]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Books_30_D_1.geometry} material={nodes.Books_30_D_1.material}/>
            <mesh geometry={nodes.Books_30_D_2.geometry} material={nodes.Books_30_D_2.material}/>
          </group>
        </group>
        <group position={[3.025, -0.978, -0.435]}>
          <group position={[-0.532, -0.009, -0.369]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube004.geometry} material={nodes.Cube004.material}/>
            <mesh geometry={nodes.Cube004_1.geometry} material={nodes.Cube004_1.material}/>
          </group>
          <group position={[-0.387, 0.475, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube049.geometry} material={nodes.Cube049.material}/>
            <mesh geometry={nodes.Cube049_1.geometry} material={nodes.Cube049_1.material}/>
          </group>
          <group position={[-0.485, 0.365, 0.199]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube001_1.geometry} material={nodes.Cube001_1.material}/>
            <mesh geometry={nodes.Cube001_2.geometry} material={nodes.Cube001_2.material}/>
          </group>
          <group position={[-0.387, 0.448, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube050.geometry} material={nodes.Cube050.material}/>
            <mesh geometry={nodes.Cube050_1.geometry} material={nodes.Cube050_1.material}/>
          </group>
          <group position={[-0.485, 0.338, 0.199]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube002.geometry} material={nodes.Cube002.material}/>
            <mesh geometry={nodes.Cube002_1.geometry} material={nodes.Cube002_1.material}/>
          </group>
          <group position={[-0.387, 0.422, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube051.geometry} material={nodes.Cube051.material}/>
            <mesh geometry={nodes.Cube051_1.geometry} material={nodes.Cube051_1.material}/>
          </group>
          <group position={[-0.485, 0.312, 0.199]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube003.geometry} material={nodes.Cube003.material}/>
            <mesh geometry={nodes.Cube003_1.geometry} material={nodes.Cube003_1.material}/>
          </group>
          <group position={[-0.387, 0.399, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube052.geometry} material={nodes.Cube052.material}/>
            <mesh geometry={nodes.Cube052_1.geometry} material={nodes.Cube052_1.material}/>
          </group>
          <group position={[-0.484, 0.356, -0.041]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube005.geometry} material={nodes.Cube005.material}/>
            <mesh geometry={nodes.Cube005_1.geometry} material={nodes.Cube005_1.material}/>
          </group>
          <group position={[-0.387, 0.378, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube053.geometry} material={nodes.Cube053.material}/>
            <mesh geometry={nodes.Cube053_1.geometry} material={nodes.Cube053_1.material}/>
          </group>
          <group position={[-0.484, 0.335, -0.041]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube006.geometry} material={nodes.Cube006.material}/>
            <mesh geometry={nodes.Cube006_1.geometry} material={nodes.Cube006_1.material}/>
          </group>
          <group position={[-0.387, 0.355, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube054.geometry} material={nodes.Cube054.material}/>
            <mesh geometry={nodes.Cube054_1.geometry} material={nodes.Cube054_1.material}/>
          </group>
          <group position={[-0.484, 0.312, -0.041]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube007.geometry} material={nodes.Cube007.material}/>
            <mesh geometry={nodes.Cube007_1.geometry} material={nodes.Cube007_1.material}/>
          </group>
          <group position={[-0.387, 0.331, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube055.geometry} material={nodes.Cube055.material}/>
            <mesh geometry={nodes.Cube055_1.geometry} material={nodes.Cube055_1.material}/>
          </group>
          <group position={[-0.387, 0.309, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube056.geometry} material={nodes.Cube056.material}/>
            <mesh geometry={nodes.Cube056_1.geometry} material={nodes.Cube056_1.material}/>
          </group>
          <group position={[-0.387, 0.286, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube057.geometry} material={nodes.Cube057.material}/>
            <mesh geometry={nodes.Cube057_1.geometry} material={nodes.Cube057_1.material}/>
          </group>
          <group position={[-0.387, 0.264, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube058.geometry} material={nodes.Cube058.material}/>
            <mesh geometry={nodes.Cube058_1.geometry} material={nodes.Cube058_1.material}/>
          </group>
          <group position={[-0.387, 0.242, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube059.geometry} material={nodes.Cube059.material}/>
            <mesh geometry={nodes.Cube059_1.geometry} material={nodes.Cube059_1.material}/>
          </group>
          <group position={[-0.387, 0.209, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube060.geometry} material={nodes.Cube060.material}/>
            <mesh geometry={nodes.Cube060_1.geometry} material={nodes.Cube060_1.material}/>
          </group>
          <group position={[-0.387, 0.17, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube061.geometry} material={nodes.Cube061.material}/>
            <mesh geometry={nodes.Cube061_1.geometry} material={nodes.Cube061_1.material}/>
          </group>
          <group position={[-0.387, 0.133, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube062.geometry} material={nodes.Cube062.material}/>
            <mesh geometry={nodes.Cube062_1.geometry} material={nodes.Cube062_1.material}/>
          </group>
          <group position={[-0.387, 0.101, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube063.geometry} material={nodes.Cube063.material}/>
            <mesh geometry={nodes.Cube063_1.geometry} material={nodes.Cube063_1.material}/>
          </group>
          <group position={[-0.387, 0.068, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube064.geometry} material={nodes.Cube064.material}/>
            <mesh geometry={nodes.Cube064_1.geometry} material={nodes.Cube064_1.material}/>
          </group>
          <group position={[-0.387, 0.035, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube065.geometry} material={nodes.Cube065.material}/>
            <mesh geometry={nodes.Cube065_1.geometry} material={nodes.Cube065_1.material}/>
          </group>
          <group position={[-0.387, 0.013, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube066.geometry} material={nodes.Cube066.material}/>
            <mesh geometry={nodes.Cube066_1.geometry} material={nodes.Cube066_1.material}/>
          </group>
          <group position={[-0.387, -0.011, 0.587]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube067.geometry} material={nodes.Cube067.material}/>
            <mesh geometry={nodes.Cube067_1.geometry} material={nodes.Cube067_1.material}/>
          </group>
        </group>
        <mesh geometry={nodes.Plane003.geometry}
              onClick={() => setPlace('tut')}
              position={[3.011, 0.394, -0.444]}>
          <meshStandardMaterial color="white" map={questsTutTex}/>
        </mesh>
        <mesh geometry={nodes.paper.geometry} material={nodes.paper.material} position={[0.644, 0.488, -1.519]}
              rotation={[Math.PI / 2, 0, 0.631]} scale={0.008}/>
        <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material}/>

        <mesh geometry={nodes.Plane.geometry}
              position={[-0.69, 0.26, -3.664]}
              onClick={() => setPlace('sqTut')}
              rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="white" map={sqTutorialTex}/>
        </mesh>

        <mesh geometry={nodes.Plane001.geometry}
              position={[-1.529, 0.266, -2.22]}
              onClick={() => setPlace('sqMap')}
              rotation={[Math.PI / 2, 0, -1.528]}>
          <meshStandardMaterial color="white" map={mapTex}/>
        </mesh>

        <mesh geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} position={[3.025, -0.978, -0.435]}
              scale={[0.269, 0.462, 0.806]}/>
        <mesh geometry={nodes.uploads_files_4558823_Newspaper.geometry}
              material={nodes.uploads_files_4558823_Newspaper.material} position={[1.522, -0.195, -2.669]}
              rotation={[Math.PI / 2, 0, 0.984]}/>

        <mesh geometry={nodes.Plane002.geometry} material={nodes.Plane002.material} position={[4.027, 0, -3.898]}
              rotation={[Math.PI / 2, 0, 1]} scale={3.907}/>
        <mesh geometry={nodes.Wood_Desk.geometry} material={nodes.Wood_Desk.material} position={[0.73, -1, -0.212]}
              scale={1.27}/>
        <group position={[0.743, 0.488, -1.451]} rotation={[0, -0.631, 0]}>
          <mesh geometry={nodes.Cylinder008.geometry} material={nodes.Cylinder008.material}/>
          <mesh geometry={nodes.Cylinder008_1.geometry} material={nodes.Cylinder008_1.material}/>
          <mesh geometry={nodes.Cylinder008_2.geometry} material={nodes.Cylinder008_2.material}/>
          <mesh geometry={nodes.Cylinder008_3.geometry} material={nodes.Cylinder008_3.material}/>
          <mesh geometry={nodes.Cylinder008_4.geometry} material={nodes.Cylinder008_4.material}/>
        </group>
        <group position={[-0.019, -1.001, -0.275]}>
          <mesh geometry={nodes.Plane027.geometry} material={nodes.Plane027.material}/>
          <mesh geometry={nodes.Plane027_1.geometry} material={nodes.Plane027_1.material}/>
          <mesh geometry={nodes.Plane027_2.geometry} material={nodes.Plane027_2.material}/>
        </group>
        <mesh geometry={nodes['File_Cabinets-Freepolyorg'].geometry}
              material={nodes['File_Cabinets-Freepolyorg'].material} position={[2.592, -1, -1.3]}
              rotation={[0, -0.947, 0]}/>
        <mesh geometry={nodes['File_Cabinets-Freepolyorg001'].geometry}
              material={nodes['File_Cabinets-Freepolyorg001'].material} position={[2.375, -1, -1.675]}
              rotation={[0, -1.058, 0]}/>
        <mesh geometry={nodes['File_Cabinets-Freepolyorg002'].geometry}
              material={nodes['File_Cabinets-Freepolyorg002'].material} position={[1.465, -1, -3.29]}
              rotation={[0, -1.058, 0]}/>
        <mesh geometry={nodes['File_Cabinets-Freepolyorg003'].geometry}
              material={nodes['File_Cabinets-Freepolyorg003'].material} position={[1.01, -1, -3.688]}
              rotation={[0, -0.526, 0]}/>
        <mesh geometry={nodes.Desk_Lamp.geometry} material={nodes.Desk_Lamp.material} position={[1.255, -0.111, 0.173]}
              rotation={[0, -0.501, 0]}/>
        <mesh geometry={nodes.Desk_Lamp001.geometry} material={nodes.Desk_Lamp001.material}
              position={[0.055, -0.111, -1.422]} rotation={[0, -1.556, 0]}/>
        <mesh geometry={nodes.Desk_Lamp002.geometry} material={nodes.Desk_Lamp002.material}
              position={[-0.111, 0.821, -3.758]} rotation={[0, 0.014, 0]}/>
        <group position={[3.02, 1.195, -0.385]} rotation={[0, 0, Math.PI / 2]}>
          <mesh geometry={nodes.Cylinder003.geometry} material={nodes.Cylinder003.material}/>
          <mesh geometry={nodes.Cylinder003_1.geometry} material={nodes.Cylinder003_1.material}/>
        </group>
        <group position={[0.193, 0.978, -3.699]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2006_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2006_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2006_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2006_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2006_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2006_3'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2006_4'].geometry}
                material={nodes['books-3981515_0000_Layer-2006_4'].material}/>
        </group>
        <group position={[-0.905, 0.978, -3.699]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2007_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2007_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2007_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2007_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2007_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2007_3'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2007_4'].geometry}
                material={nodes['books-3981515_0000_Layer-2007_4'].material}/>
        </group>
        <group position={[-1.557, 0.978, -3.157]} rotation={[Math.PI / 2, 0, -1.528]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2008_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2008_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2008_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2008_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2008_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2008_3'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2008_4'].geometry}
                material={nodes['books-3981515_0000_Layer-2008_4'].material}/>
        </group>
        <group position={[-1.604, 0.978, -2.054]} rotation={[Math.PI / 2, 0, -1.528]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2009_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2009_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2009_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2009_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2009_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2009_3'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2009_4'].geometry}
                material={nodes['books-3981515_0000_Layer-2009_4'].material}/>
        </group>
        <group position={[-1.651, 0.978, -0.957]} rotation={[Math.PI / 2, 0, -1.528]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2010'].geometry}
                material={nodes['books-3981515_0000_Layer-2010'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2010_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2010_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2010_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2010_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2010_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2010_3'].material}/>
        </group>
        <group position={[-2.524, 0.978, -3.157]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2011'].geometry}
                material={nodes['books-3981515_0000_Layer-2011'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2011_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2011_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2011_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2011_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2011_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2011_3'].material}/>
        </group>
        <group position={[-2.524, 0.978, -2.053]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2012'].geometry}
                material={nodes['books-3981515_0000_Layer-2012'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2012_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2012_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2012_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2012_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2012_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2012_3'].material}/>
        </group>
        <group position={[-2.524, 0.978, -0.956]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
          <mesh geometry={nodes['books-3981515_0000_Layer-2013'].geometry}
                material={nodes['books-3981515_0000_Layer-2013'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2013_1'].geometry}
                material={nodes['books-3981515_0000_Layer-2013_1'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2013_2'].geometry}
                material={nodes['books-3981515_0000_Layer-2013_2'].material}/>
          <mesh geometry={nodes['books-3981515_0000_Layer-2013_3'].geometry}
                material={nodes['books-3981515_0000_Layer-2013_3'].material}/>
        </group>
        <mesh geometry={nodes.Antique_Wood_Globe.geometry} material={nodes.Antique_Wood_Globe.material}
              position={[-1.048, -1, -3.156]} scale={6.612}/>
        <mesh geometry={nodes.FolderBack.geometry} material={nodes.FolderBack.material}
              position={[0.917, -0.113, 0.118]} rotation={[0, -1.267, 0]}>
          <mesh geometry={nodes.FolderFront.geometry} material={nodes.FolderFront.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page.geometry} material={nodes.Page.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack001.geometry} material={nodes.FolderBack001.material}
              position={[0.897, -0.11, 0.076]} rotation={[0, -1.122, 0.012]}>
          <mesh geometry={nodes.FolderFront001.geometry} material={nodes.FolderFront001.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page001.geometry} material={nodes.Page001.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack002.geometry} material={nodes.FolderBack002.material}
              position={[0.88, -0.106, 0.044]} rotation={[0, -1.122, 0.035]}>
          <mesh geometry={nodes.FolderFront002.geometry} material={nodes.FolderFront002.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page002.geometry} material={nodes.Page002.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack003.geometry} material={nodes.FolderBack003.material}
              position={[0.895, -0.104, -0.032]} rotation={[0, -1.27, 0.035]}>
          <mesh geometry={nodes.FolderFront003.geometry} material={nodes.FolderFront003.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page003.geometry} material={nodes.Page003.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack005.geometry} material={nodes.FolderBack005.material}
              position={[0.801, -0.101, -0.168]} rotation={[0, -0.834, 0.035]}>
          <mesh geometry={nodes.FolderFront005.geometry} material={nodes.FolderFront005.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page005.geometry} material={nodes.Page005.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack004.geometry} material={nodes.FolderBack004.material}
              position={[0.859, -0.104, -0.093]} rotation={[0, -1.066, 0.035]}>
          <mesh geometry={nodes.FolderFront004.geometry} material={nodes.FolderFront004.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page004.geometry} material={nodes.Page004.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack006.geometry} material={nodes.FolderBack006.material}
              position={[0.837, -0.098, 0.11]} rotation={[0.039, -0.834, 0.017]}>
          <mesh geometry={nodes.FolderFront006.geometry} material={nodes.FolderFront006.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page006.geometry} material={nodes.Page006.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack007.geometry} material={nodes.FolderBack007.material}
              position={[0.802, -0.09, 0.067]} rotation={[0.039, -0.834, 0.017]}>
          <mesh geometry={nodes.FolderFront007.geometry} material={nodes.FolderFront007.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page007.geometry} material={nodes.Page007.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack009.geometry} material={nodes.FolderBack009.material}
              position={[0.751, -0.08, -0.103]} rotation={[0.108, -1.013, 0.174]}>
          <mesh geometry={nodes.FolderFront009.geometry} material={nodes.FolderFront009.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page009.geometry} material={nodes.Page009.material} position={[0, 0.001, 0]}/>
        </mesh>
        <mesh geometry={nodes.FolderBack008.geometry} material={nodes.FolderBack008.material}
              position={[0.803, -0.085, -0.012]} rotation={[0.039, -0.834, 0.047]}>
          <mesh geometry={nodes.FolderFront008.geometry} material={nodes.FolderFront008.material}
                position={[-0.115, 0.002, 0]}/>
          <mesh geometry={nodes.Page008.geometry} material={nodes.Page008.material} position={[0, 0.001, 0]}/>
        </mesh>
      </group>
  )
}

useGLTF.preload('/detectiveRoom.glb')
