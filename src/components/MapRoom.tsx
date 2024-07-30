import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useFrame, useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"
import {AppContext} from "@/components/AppState"
import ConnectButtons from "@/components/ConnectButtons"
import {use} from "i18next"

type GLTFResult = GLTF & {
    nodes: {
        DoorQuests: THREE.Mesh
        DoorVaults: THREE.Mesh
        Fireplace: THREE.Mesh
        Tokenomics: THREE.Mesh
        Roadmap: THREE.Mesh
        Room: THREE.Mesh
        DoorFrameQuest: THREE.Mesh
        VaultRoomTrigger: THREE.Mesh
        QuestDoorTrigger: THREE.Mesh
    }
    materials: {}
}

export function MapRoom(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/mapRoomFinal.glb') as GLTFResult
    const [camera, view] = useThree(
        (state) => [state.camera, state.viewport] as [PerspectiveCamera, { aspect: number }]
    )
    const [appState, setAppState] = useContext(AppContext)
    const [vaultDoorHover, setVaultDoorHover] = useState(false)
    const [questDoorHover, setQuestDoorHover] = useState(false)
    const [place, setPlace] = useState('home' as 'home' | 'tok' | 'map')
    const fireTex = useTexture(
        '/MapRoomFireArea.webp',
        (loader) => loader.flipY = false
    )
    const fireMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: fireTex,
            color: appState.isMobile ? '#aaa' : '#888888'
        }),
        [fireTex]
    )
    const questTex = useTexture(
        '/MapRoomQuestArea.webp',
        (loader) => loader.flipY = false
    )
    const questMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: questTex,
            color: appState.isMobile ? '#aaa' : '#888888'
        }),
        [questTex]
    )
    const vaultTex = useTexture(
        '/MapRoomVaultArea.webp',
        (loader) => loader.flipY = false
    )
    const vaultMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: vaultTex,
            color: appState.isMobile ? '#aaa' : '#888888'
        }),
        [vaultTex]
    )
    const portraitNoted = useRef(window.matchMedia('(orientation: portrait)').matches)

    useEffect(() => {
        if (portraitNoted.current) {
            portraitNoted.current = false
            setAppState({
                notify: true,
                noteText: 'Please rotate your device to landscape for a better experience',
                noteStyle: 'alert'
            })
        } else if (view.aspect < 1.4) {
            setAppState({
                notify: true,
                noteText: 'Please use a wider screen for a better experience',
                noteStyle: 'alert'
            })
        }
    }, [])

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

    useFrame(() => {
    })

    return (
        <group {...props} dispose={null}>

            <mesh geometry={nodes.QuestDoorTrigger.geometry}
                  material={nodes.QuestDoorTrigger.material}
                  onPointerOver={() => setQuestDoorHover(true)}
                  onPointerOut={() => setQuestDoorHover(false)}
                  onClick={() => setAppState({section: 'quests'})}
                  position={[0.206, 0, -8.098]}
                  rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial transparent
                                   opacity={0}
                                   side={THREE.BackSide}/>
            </mesh>

            <mesh geometry={nodes.DoorQuests.geometry}
                  material={questMaterial}
                  position={[6.911, 0.724, -19.638]}
                  rotation={questDoorHover ? [0, Math.PI * 0.25, 0] : [0, -0.62, 0]}
            />

            <mesh geometry={nodes.VaultRoomTrigger.geometry}
                  material={nodes.VaultRoomTrigger.material}
                  onPointerOver={() => setVaultDoorHover(true)}
                  onPointerOut={() => setVaultDoorHover(false)}
                  onClick={() => setAppState({section: 'vaults'})}
                  position={[0, 0, -8.515]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial transparent
                                   opacity={0}
                                   side={THREE.BackSide}/>
            </mesh>

            <mesh geometry={nodes.DoorVaults.geometry}
                  material={vaultMaterial}
                  position={[-6.063, 0.241, -16.933]}
                  rotation={vaultDoorHover ? [0, -Math.PI * 0.25, 0] : [0, 0.686, 0]}
            />

            <mesh geometry={nodes.Roadmap.geometry}
                  material={questMaterial}
                  onClick={() => {
                      setPlace('map')
                      setAppState({
                          subSection: 'feature',
                          moveFunction: () => setPlace('home')
                      })
                  }}
                  position={[4.144, 0, -8.515]}/>

            <mesh geometry={nodes.Tokenomics.geometry}
                  material={questMaterial}
                  onClick={() => {
                      setPlace('tok')
                      setAppState({
                          subSection: 'feature',
                          moveFunction: () => setPlace('home')
                      })
                  }}
                  position={[0, 0, -8.515]}/>

            <mesh geometry={nodes.Fireplace.geometry}
                  material={fireMaterial}
                  position={[0, 0, -8.515]}/>
            <mesh geometry={nodes.Room.geometry}
                  material={vaultMaterial}
                  position={[0, 0, -8.515]}
                  rotation={[Math.PI / 2, 0, 0]}/>
            <mesh geometry={nodes.DoorFrameQuest.geometry}
                  material={questMaterial}
                  position={[0.206, 0, -8.098]}
                  rotation={[Math.PI / 2, 0, 0]}/>

            <directionalLight intensity={2.5} position={[5, 2, 2]}/>
            <directionalLight intensity={5.5} position={[-2, 5, -2]}/>
        </group>
    )
}

useGLTF.preload('/mapRoomFinal.glb')
