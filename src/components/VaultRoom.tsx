import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {useFrame, useThree} from '@react-three/fiber'
import {PerspectiveCamera} from 'three'
import {AppContext} from '@/components/AppState'
import {SafeDoor} from '@/components/SafeDoor'

type GLTFResult = GLTF & {
    nodes: {
        Room: THREE.Mesh
        TutorialPoster: THREE.Mesh
        CeilingFloor: THREE.Mesh
    }
    materials: {}
}

export function VaultRoom(props: JSX.IntrinsicElements['group']) {
    const {nodes, materials} = useGLTF('/vaultRoomFinal.glb') as GLTFResult
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
    const vaultWallsTex = useTexture(
        '/VaultRoomWalls.webp',
        (loader) => loader.flipY = false
    )
    const wallsMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: vaultWallsTex,
            color: 'grey'
        }),
        [vaultWallsTex]
    )
    const vaultFCTex = useTexture(
        '/VaultRoomFloorCeiling.webp',
        (loader) => loader.flipY = false
    )
    const fcMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: vaultFCTex,
            color: 'grey'
        }),
        [vaultWallsTex]
    )
    const tutorialTex = useTexture(
        '/VaultRoomTutorial.webp',
        (loader) => loader.flipY = false
    )
    const tutorialMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: tutorialTex,
            color: 'grey'
        }),
        [vaultWallsTex]
    )
    const buySkipTex = useTexture('/ButtonTextures/BuyASkip.webp')
    const moveToPos = useRef(new THREE.Vector3(0, 0, 0))
    const moveToRot = useRef(new THREE.Euler(0, 0, 0))
    const moveToFOV = useRef(30)

    useEffect(() => {
        switch (place) {
            case 'home':
                moveToPos.current.set(0, 0, 0)
                moveToRot.current.set(0, 0, 0)
                moveToFOV.current = 30
                break
            case 's1':
                moveToPos.current.set(0, -0.792, -5.244)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's2':
                moveToPos.current.set(-0.2, -0.752, -6.54)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's3':
                moveToPos.current.set(-0.8, -0.752, -7.494)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's4':
                moveToPos.current.set(-1.3, -0.752, -8.35)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's5':
                moveToPos.current.set(0.3, 0.05, -5.614)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's6':
                moveToPos.current.set(-0.2, 0.05, -6.55)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's7':
                moveToPos.current.set(-0.8, 0.05, -7.48)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's8':
                moveToPos.current.set(-1.4, 0.05, -8.3)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's9':
                moveToPos.current.set(-0.2, 0.9, -6.544)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 's10':
                moveToPos.current.set(-0.8, 0.85, -7.444)
                moveToRot.current.set(0, -Math.PI * 0.33, 0)
                break
            case 'tut':
                moveToPos.current.set(-1.937, -0.143, -6.879)
                moveToRot.current.set(0, 0, 0)
                break
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
    })

    return (
        <group {...props} dispose={null}>
            <group>
                <SafeDoor
                    available={false}
                    active={false}
                    vault={1}
                    position={[1.532, -0.792, -6.252]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s1')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[0.004, -0.981, 0.002]}
                />
                <SafeDoor
                    available={appState.quest2.status !== 'unavailable'}
                    active={place === 's2'}
                    vault={2}
                    position={[0.929, -0.792, -7.157]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s2')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[0, -0.983, 0]}
                >
                    {appState.skipsAvailable &&
                        <mesh position={[-0.38, 0.14, 0.01]}
                              onClick={(event) => {
                                  event.stopPropagation()
                                  if (appState.walletConnected) {
                                      setAppState({
                                          buyingSkip: true,
                                          skipToBuy: 2
                                      })
                                  } else {
                                      setAppState({
                                          notify: true,
                                          noteText: "Wallet not connected",
                                          noteStyle: "alert"
                                      })
                                  }
                              }}>
                            <planeGeometry args={[0.09, 0.09]}/>
                            <meshBasicMaterial map={buySkipTex} color={'#888'} transparent/>
                        </mesh>}
                </SafeDoor>
                <SafeDoor
                    available={appState.quest3.status !== 'unavailable'}
                    active={place === 's3'}
                    vault={3}
                    position={[0.324, -0.792, -8.066]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s3')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[0.01, -0.983, -0.003]}
                >
                    {appState.skipsAvailable &&
                        appState.quest3.status === 'locked' &&
                        <mesh position={[-0.38, 0.14, 0.01]}
                              onClick={(event) => {
                                  event.stopPropagation()
                                  if (appState.walletConnected) {
                                      setAppState({
                                          buyingSkip: true,
                                          skipToBuy: 3
                                      })
                                  } else {
                                      setAppState({
                                          notify: true,
                                          noteText: "Wallet not connected",
                                          noteStyle: "alert"
                                      })
                                  }
                              }}>
                            <planeGeometry args={[0.09, 0.09]}/>
                            <meshBasicMaterial map={buySkipTex} transparent/>
                        </mesh>}
                </SafeDoor>
                <SafeDoor
                    available={appState.quest4.status !== 'unavailable'}
                    active={place === 's4'}
                    vault={4}
                    position={[-0.238, -0.792, -8.909]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s4')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[-0.007, -0.973, 0.002]}
                >
                    {appState.skipsAvailable &&
                        appState.quest4.status === 'locked' &&
                        <mesh position={[-0.38, 0.14, 0.01]}
                              onClick={(event) => {
                                  event.stopPropagation()
                                  if (appState.walletConnected) {
                                      setAppState({
                                          buyingSkip: true,
                                          skipToBuy: 4
                                      })
                                  }  else {
                                      setAppState({
                                          notify: true,
                                          noteText: "Wallet not connected",
                                          noteStyle: "alert"
                                      })
                                  }
                              }}>
                            <planeGeometry args={[0.09, 0.09]}/>
                            <meshBasicMaterial map={buySkipTex} transparent/>
                        </mesh>}
                </SafeDoor>
                <SafeDoor
                    available={appState.quest5.status !== 'unavailable'}
                    active={place === 's5'}
                    vault={5}
                    position={[1.532, 0.027, -6.252]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s5')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[-0.003, -0.978, 0.002]}
                />
                <SafeDoor
                    available={appState.quest6.status !== 'unavailable'}
                    active={place === 's6'}
                    vault={6}
                    position={[0.929, 0.027, -7.157]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s6')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[-0.002, -0.985, 0.015]}
                />
                <SafeDoor
                    available={appState.quest7.status !== 'unavailable'}
                    active={place === 's7'}
                    vault={7}
                    position={[0.324, 0.027, -8.066]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s7')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[0, -0.983, 0]}
                />
                <SafeDoor
                    available={appState.quest8.status !== 'unavailable'}
                    active={place === 's8'}
                    vault={8}
                    position={[-0.238, 0.027, -8.909]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s8')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[0.001, -0.981, 0.02]}
                />
                <SafeDoor
                    available={appState.quest9.status !== 'unavailable'}
                    active={place === 's9'}
                    vault={9}
                    position={[0.942, 0.851, -7.138]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s9')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[-0.003, -0.99, -0.012]}
                />
                <SafeDoor
                    available={appState.quest10.status !== 'unavailable'}
                    active={place === 's10'}
                    vault={10}
                    position={[0.338, 0.851, -8.044]}
                    onClick={(event) => {
                        event.stopPropagation()
                        setPlace('s10')
                        setAppState({
                            subSection: 'feature',
                            moveFunction: () => {
                                setPlace('home')
                            }
                        })
                    }}
                    rotation={[0.006, -0.977, -0.011]}
                />


                <mesh geometry={nodes.TutorialPoster.geometry}
                      material={tutorialMaterial}
                      position={[-1.937, -0.143, -9.879]}
                      onClick={() => {
                          setAppState({
                              tutorialView: true,
                              tutorial: 'vault'
                          })
                      }}
                      rotation={[Math.PI / 2, 0, -0.571]}
                />

                <mesh geometry={nodes.Room.geometry}
                      material={wallsMaterial}
                      position={[0, -0.453, -5.491]}/>
                <mesh geometry={nodes.CeilingFloor.geometry}
                      material={fcMaterial}
                      position={[0, -0.453, -5.491]}/>

            </group>
            <directionalLight intensity={0.5} position={[-2.163, -1.331, 8.438]} color={'#ffc876'}/>
        </group>
    )
}

useGLTF.preload('/vaultRoomFinal.glb')
