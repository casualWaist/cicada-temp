import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
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
    const {nodes} = useGLTF('/mapRoomFinal.glb') as GLTFResult
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
            color: appState.isMobile ? '#bbb' : '#aaa'
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
            color: appState.isMobile ? '#bbb' : '#aaa'
        }),
        [vaultTex]
    )
    const portraitNoted = useRef(
        window.matchMedia('(orientation: portrait)').matches
    )
    const moveToPos = useRef(new THREE.Vector3(0, 0, -6.5))
    const moveToRot = useRef(new THREE.Euler(Math.PI * 0.05, 0, 0))
    const moveToFOV = useRef(45)
    const questDoorOpen = useRef(Math.PI * 0.25)
    const questDoorClosed = useRef(0.686)
    const vaultDoorOpen = useRef(-Math.PI * 0.25)
    const vaultDoorClosed = useRef(0.686)
    const questDoorRef = useRef<THREE.Mesh>(null!)
    const vaultDoorRef = useRef<THREE.Mesh>(null!)

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
                moveToPos.current.set(0, 0, -6.5)
                moveToRot.current.set(Math.PI * 0.05, 0, 0)
                moveToFOV.current = 45
                break
            case 'tok':
                moveToPos.current.set(-3.27, 0.7, -10.5)
                moveToRot.current.set(0, -Math.PI * 0.125, 0)
                moveToFOV.current = 25
                break
            case 'map':
                moveToPos.current.set(3.25, 0.72, -10.5)
                moveToRot.current.set(0, Math.PI * 0.125, 0)
                moveToFOV.current = 25
        }
    }, [place, camera])

    useFrame(() => {
        if (camera.position.distanceTo(moveToPos.current) > 0.01) {
            camera.position.lerp(moveToPos.current, 0.05)
            camera.rotation.x += (moveToRot.current.x - camera.rotation.x) * 0.05
            camera.rotation.y += (moveToRot.current.y - camera.rotation.y) * 0.05
            camera.rotation.z += (moveToRot.current.z - camera.rotation.z) * 0.05
            camera.fov += (moveToFOV.current - camera.fov) * 0.05
            camera.updateProjectionMatrix()
        }
        if (questDoorHover) {
            questDoorRef.current.rotation.y += (
                questDoorOpen.current - questDoorRef.current.rotation.y) * 0.03
        } else {
            if (questDoorRef.current.rotation.y - questDoorClosed.current > 0.001) {
                questDoorRef.current.rotation.y += (
                    questDoorClosed.current - questDoorRef.current.rotation.y) * 0.03
            }
        }
        if (vaultDoorHover) {
            vaultDoorRef.current.rotation.y += (
                vaultDoorOpen.current - vaultDoorRef.current.rotation.y) * 0.03
        } else {
            if (vaultDoorClosed.current - vaultDoorRef.current.rotation.y > 0.001) {
                vaultDoorRef.current.rotation.y += (
                    vaultDoorClosed.current - vaultDoorRef.current.rotation.y) * 0.03
            }
        }

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
                  ref={questDoorRef}
                  material={questMaterial}
                  position={[6.911, 0.724, -19.638]}
                  rotation={[0, -0.62, 0]}
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
                  ref={vaultDoorRef}
                  material={vaultMaterial}
                  position={[-6.063, 0.241, -16.933]}
                  rotation={[0, 0.686, 0]}
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
