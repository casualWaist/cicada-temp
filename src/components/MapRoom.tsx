import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"
import {AppContext} from "@/components/AppState"
import ConnectButtons from "@/components/ConnectButtons"

type GLTFResult = GLTF & {
    nodes: {
        Rug: THREE.Mesh
        DoorFrameRight: THREE.Mesh
        DoorQuests: THREE.Mesh
        DoorVaults: THREE.Mesh
        StaticDoorVaults: THREE.Mesh
        RoadmapFrame_1: THREE.Mesh
        RoadmapFrame_2: THREE.Mesh
        TokenomicsFrame_1: THREE.Mesh
        TokenomicsFrame_2: THREE.Mesh
        Firewood_1: THREE.Mesh
        Firewood_2: THREE.Mesh
        Firewood_3: THREE.Mesh
        Firewood_4: THREE.Mesh
        Firebricks: THREE.Mesh
        Fireplace_1: THREE.Mesh
        Fireplace_2: THREE.Mesh
        Fireplace_3: THREE.Mesh
        Tokenomics: THREE.Mesh
        TokenomicsLight_1: THREE.Mesh
        TokenomicsLight_2: THREE.Mesh
        Roadmap: THREE.Mesh
        RoadmapLight_1: THREE.Mesh
        RoadmapLight_2: THREE.Mesh
        Room_1: THREE.Mesh
        Room_2: THREE.Mesh
        Room_3: THREE.Mesh
        Room_4: THREE.Mesh
        Room_5: THREE.Mesh
        Cicada: THREE.Mesh
        LightTriangleQuest_1: THREE.Mesh
        LightTriangleQuest_2: THREE.Mesh
        EyeTriangleVault_1: THREE.Mesh
        EyeTriangleVault_2: THREE.Mesh
        BlackWalls: THREE.Mesh
        DoorFrameQuest_1: THREE.Mesh
        DoorFrameQuest_2: THREE.Mesh
    }
    materials: {}
}

export function MapRoom(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/mapRoom.glb') as GLTFResult
    const camera = useThree((state) => state.camera as PerspectiveCamera)
    const [appState, setAppState] = useContext(AppContext)
    const [vaultDoorHover, setVaultDoorHover] = useState(false)
    const [questDoorHover, setQuestDoorHover] = useState(false)
    const [place, setPlace] = useState('home' as 'home' | 'tok' | 'map')
    const roomTex = useTexture('/FinalTextureMapRoom.webp', (loader) => loader.flipY = false)
    const material = useMemo(() => new THREE.MeshBasicMaterial({map: roomTex}), [roomTex])

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
            <ConnectButtons />

            <group onPointerOver={() => setQuestDoorHover(true)}
                   onPointerOut={() => setQuestDoorHover(false)}
                   onClick={() => setAppState({section: 'quests'})}
            >
                <mesh geometry={nodes.DoorFrameRight.geometry}
                      material={material}
                      position={[6.225, -0.517, -20.832]}
                      rotation={[0, -1.044, 0]}
                />
                <mesh geometry={nodes.DoorQuests.geometry}
                      material={material}
                      position={[6.705, 0.724, -20.054]}
                      rotation={questDoorHover ? [0, Math.PI * 0.25, 0] : [0, -0.62, 0]}
                />
            </group>
            <group onPointerOver={() => setVaultDoorHover(true)}
                   onPointerOut={() => setVaultDoorHover(false)}
                   onClick={() => setAppState({section: 'vaults'})}
            >
                <mesh geometry={nodes.DoorVaults.geometry}
                      material={material}
                      position={[-6.063, 0.241, -16.933]}
                      rotation={vaultDoorHover ? [0, Math.PI * 0.5, 0] : [0, 0.686, 0]}
                />
                <mesh geometry={nodes.StaticDoorVaults.geometry} material={material}
                      position={[-5.584, -1, -17.712]} rotation={[0, 1.045, 0]}
                />
            </group>
            <group onClick={() => setPlace('map')}>
                <mesh geometry={nodes.Roadmap.geometry}
                      material={material}
                      position={[4.144, 0, -8.515]}
                />
                <group position={[2.072, 0.863, -13.839]}
                       rotation={[Math.PI / 2, 0, 0]}
                       scale={[1.936, 1, 1]}
                >
                    <mesh geometry={nodes.RoadmapFrame_1.geometry}
                          material={material}
                    />
                    <mesh geometry={nodes.RoadmapFrame_2.geometry}
                          material={material}
                    />
                </group>
            </group>
            <group onClick={() => setPlace('map')}>
                <mesh geometry={nodes.Tokenomics.geometry}
                      material={material}
                      position={[0, 0, -8.515]}
                />
                <group position={[-2.071, 0.863, -13.839]}
                       rotation={[Math.PI / 2, 0, 0]}
                       scale={[1.936, 1, 1]}
                >
                    <mesh geometry={nodes.TokenomicsFrame_1.geometry}
                          material={material}
                    />
                    <mesh geometry={nodes.TokenomicsFrame_2.geometry}
                          material={material}
                    />
                </group>
            </group>

            <mesh geometry={nodes.Rug.geometry}
                  material={material}
                  position={[-0.012, -0.985, -9.885]}
                  scale={2.141}
            />

            <group position={[-0.042, -0.681, -13.358]}
                   rotation={[Math.PI, 0, Math.PI]}
                   scale={0.817}
            >
                <mesh geometry={nodes.Firewood_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Firewood_2.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Firewood_3.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Firewood_4.geometry}
                      material={material}
                />
            </group>

            <mesh geometry={nodes.Firebricks.geometry}
                  material={material}
                  position={[-0.006, -0.398, -14.13]}
                  scale={0.464}
            />

            <group position={[0, 0, -8.515]}>
                <mesh geometry={nodes.Fireplace_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Fireplace_2.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Fireplace_3.geometry}
                      material={material}
                />
            </group>

            <group position={[-2.122, 1.227, -13.389]}
                   rotation={[0, -0.35, 0]}
            >
                <mesh
                    geometry={nodes.TokenomicsLight_1.geometry}
                    material={material}
                />
                <mesh
                    geometry={nodes.TokenomicsLight_2.geometry}
                    material={material}
                />
            </group>

            <group position={[2.095, 1.227, -13.379]}
                   rotation={[0, 0.352, 0]}
            >
                <mesh geometry={nodes.RoadmapLight_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.RoadmapLight_2.geometry}
                      material={material}
                />
            </group>

            <group position={[0, 0, -8.515]}
                   rotation={[Math.PI / 2, 0, 0]}
            >
                <mesh geometry={nodes.Room_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Room_2.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Room_3.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Room_4.geometry}
                      material={material}
                />
                <mesh geometry={nodes.Room_5.geometry}
                      material={material}
                />
            </group>

            <mesh geometry={nodes.Cicada.geometry}
                  material={material}
                  position={[0, 0.459, -12.885]}
                  rotation={[Math.PI / 2, 0, 0]} scale={0.291}
            />

            <group position={[6.148, 2.093, -20.765]}
                   rotation={[Math.PI / 2, 0, 1.045]}
                   scale={0.209}
            >
                <mesh geometry={nodes.LightTriangleQuest_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.LightTriangleQuest_2.geometry}
                      material={material}
                />
            </group>

            <group position={[0, 0, -8.515]}
                   rotation={[Math.PI / 2, 0, 0]}
            >
                <mesh geometry={nodes.DoorFrameQuest_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.DoorFrameQuest_2.geometry}
                      material={material}
                />
            </group>


            <group position={[-5.496, 1.604, -17.655]}
                   rotation={[Math.PI / 2, 0, -1.034]}
                   scale={0.209}
            >
                <mesh geometry={nodes.EyeTriangleVault_1.geometry}
                      material={material}
                />
                <mesh geometry={nodes.EyeTriangleVault_2.geometry}
                      material={material}
                />
            </group>

            <mesh geometry={nodes.BlackWalls.geometry}
                  position={[0, 0, -8.515]}
                  rotation={[Math.PI / 2, 0, 0]}
            >
                <meshBasicMaterial color="black"/>
            </mesh>

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
            <directionalLight intensity={2.5} position={[5, 2, 2]}/>
            <directionalLight intensity={5.5} position={[-2, 5, -2]}/>
        </group>
    )
}

useGLTF.preload('/mapRoom.glb')
