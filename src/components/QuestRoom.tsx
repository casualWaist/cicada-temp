import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {Html, useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {AppContext} from "@/components/AppState"
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"
import {FileFolder, FilePage} from "@/components/FileFolder"
import {use} from "i18next"
import {Compass} from "@/components/Compass"
import QuestOne from "@/components/Quests/QuestOne"
import QuestTwo from "@/components/Quests/QuestTwo"
import QuestThree from "@/components/Quests/QuestThree"
import QuestFour from "@/components/Quests/QuestFour"
import QuestFive from "@/components/Quests/QuestFive"
import QuestSix from "@/components/Quests/QuestSix"
import QuestSeven from "@/components/Quests/QuestSeven"
import QuestEight from "@/components/Quests/QuestEight"
import QuestNine from "@/components/Quests/QuestNine"
import QuestTen from "@/components/Quests/QuestTen"

type GLTFResult = GLTF & {
    nodes: {
        HighRes: THREE.Mesh
        LowRes: THREE.Mesh
        LowRes001: THREE.Mesh
        DeskTop: THREE.Mesh
        QuestsTutorial: THREE.Mesh
        SidequestsMap: THREE.Mesh
        SideQuestTutorial: THREE.Mesh
    }
    materials: {}
}

export function QuestRoom(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/questRoomFinal.glb') as GLTFResult
    const [appState, setAppState] = useContext(AppContext)
    const deskTex = useTexture(
        '/QuestRoomDeskArea.webp',
        (loader) => loader.flipY = false
    )
    const deskMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: deskTex,
            color: appState.isMobile ? '#aaa' : 'grey'
        }),
        [deskTex]
    )
    const sqTex = useTexture(
        '/QuestRoomSQArea.webp',
        (loader) => loader.flipY = false
    )
    const sqMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: sqTex,
            color: appState.isMobile ? '#aaa' : 'grey'
        }),
        [sqTex]
    )
    const wallTex = useTexture(
        '/QuestRoomWallArea.webp',
        (loader) => loader.flipY = false
    )
    const wallMaterial = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: wallTex,
            color: appState.isMobile ? '#aaa' : 'grey'
        }),
        [wallTex]
    )
    const [place, setPlace] =
        useState(
            'home' as
                'home'
                | 'sqMap'
                | 'map'
                | 'tut'
                | 'sqTut'
                | 'rev'
                | 'desk'
        )
    const [quest, setQuest] = useState(
        'none' as
            'none'
            | 'q1'
            | 'q2'
            | 'q3'
            | 'q4'
            | 'q5'
            | 'q6'
            | 'q7'
            | 'q8'
            | 'q9'
            | 'q10'
    )
    const [q1Open, setQ1Open] = useState(false)
    const [q2Open, setQ2Open] = useState(false)
    const [q3Open, setQ3Open] = useState(false)
    const [q4Open, setQ4Open] = useState(false)
    const [q5Open, setQ5Open] = useState(false)
    const [q6Open, setQ6Open] = useState(false)
    const [q7Open, setQ7Open] = useState(false)
    const [q8Open, setQ8Open] = useState(false)
    const [q9Open, setQ9Open] = useState(false)
    const [q10Open, setQ10Open] = useState(false)
    const camera = useThree(
        (state) => state.camera as PerspectiveCamera
    )

    useEffect(() => {
        if (appState.subSection === 'none') setAppState({
            moveFunction: () => {
                setAppState({
                    subSection: 'rev'
                })
                setPlace('rev')
            }
        })
        if (appState.subSection === 'rev') setAppState({
            moveFunction: () => {
                setAppState({
                    subSection: 'none'
                })
                setPlace('home')
            }
        })
    }, [appState.subSection])

    useEffect(() => {
        switch (place) {
            case 'home':
                camera.position.set(-1.05, 0.75, 2.5)
                camera.rotation.set(-Math.PI * 0.05, -Math.PI * 0.2, 0, 'YXZ')
                break
            case 'sqMap':
                camera.position.set(-0.5, 0.25, -2.5)
                camera.rotation.set(0, Math.PI * 0.5, 0)
                break
            case 'map':
                camera.position.set(0, 0, 0)
                camera.rotation.set(0, -Math.PI * 0.5, 0)
                break
            case 'tut':
                camera.position.set(0.75, 0.375, -0.5)
                camera.rotation.set(0, -Math.PI * 0.5, 0)
                break
            case 'rev':
                camera.position.set(0.79, 1, 0.625)
                camera.rotation.set(-Math.PI * 0.075, Math.PI * 0.2, 0, 'YXZ')
                break
            case 'sqTut':
                camera.position.set(-1, 0.25, -1.75)
                camera.rotation.set(0, Math.PI * 0.05, 0)
                break
            case 'desk':
                camera.position.set(-0.25, 0.9, 0.25)
                camera.rotation.set(-Math.PI * 0.25, -Math.PI * 0.4, 0)
        }
    }, [place, camera])

    return (
        <group {...props} dispose={null}>

            <FileFolder active={quest === 'q1'}
                        activateFunc={() => {
                            setQuest('q1')
                        }}
                        quest={1}
                        open={q1Open}
                        openFunc={() => setQ1Open(true)}
                        closeFunc={() => {
                            setQuest('none')
                            setQ1Open(false)
                        }}
                        position={[0.588, -0.113, -0.102]}
                        rotation={[0, -0.831, 0]}
            >
                <QuestOne active={quest === 'q1'} open={q1Open}/>
            </FileFolder>

            {['started', 'completed'].includes(appState.quest2.status) &&
                <FileFolder active={quest === 'q2'}
                            activateFunc={() => {
                                setQuest('q2')
                            }}
                            quest={2}
                            open={q2Open}
                            openFunc={() => setQ2Open(true)}
                            closeFunc={() => {
                                setQ2Open(false)
                                setQuest('none')
                            }}
                            position={[0.679, -0.109, 0.011]}
                            rotation={[0, -0.888, -0.036]}
                >
                    <QuestTwo active={quest === 'q2'} open={q2Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest3.status) &&
                <FileFolder active={quest === 'q3'}
                            activateFunc={() => {
                                setQuest('q3')
                            }}
                            quest={3}
                            open={q3Open}
                            openFunc={() => setQ3Open(true)}
                            closeFunc={() => {
                                setQ3Open(false)
                                setQuest('none')
                            }}
                            position={[0.756, -0.109, 0.123]}
                            rotation={[0, -0.909, -0.036]}
                >
                    <QuestThree active={quest === 'q3'} open={q3Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest4.status) &&
                <FileFolder active={quest === 'q4'}
                            activateFunc={() => {
                                setQuest('q4')
                            }}
                            quest={4}
                            open={q4Open}
                            openFunc={() => setQ4Open(true)}
                            closeFunc={() => {
                                setQ4Open(false)
                                setQuest('none')
                            }}
                            position={[0.793, -0.109, 0.221]}
                            rotation={[0, -1.017, -0.036]}
                >
                    <QuestFour active={quest === 'q4'} open={q4Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest5.status) &&
                <FileFolder active={quest === 'q5'}
                            activateFunc={() => {
                                setQuest('q5')
                            }}
                            quest={5}
                            open={q5Open}
                            openFunc={() => setQ5Open(true)}
                            closeFunc={() => {
                                setQ5Open(false)
                                setQuest('none')
                            }}
                            position={[0.88, -0.108, 0.294]}
                            rotation={[0, -0.89, -0.042]}
                >
                    <QuestFive active={quest === 'q5'} open={q5Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest6.status) &&
                <FileFolder active={quest === 'q6'}
                            activateFunc={() => {
                                setQuest('q6')
                            }}
                            quest={6}
                            open={q6Open}
                            openFunc={() => setQ6Open(true)}
                            closeFunc={() => {
                                setQ6Open(false)
                                setQuest('none')
                            }}
                            position={[0.791, -0.104, -0.195]}
                            rotation={[-0.045, -0.888, -0.077]}
                >
                    <QuestSix active={quest === 'q6'} open={q6Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest7.status) &&
                <FileFolder active={quest === 'q7'}
                            activateFunc={() => {
                                setQuest('q7')
                            }}
                            quest={7}
                            open={q7Open}
                            openFunc={() => setQ7Open(true)}
                            closeFunc={() => {
                                setQ7Open(false)
                                setQuest('none')
                            }}
                            position={[0.843, -0.102, -0.098]}
                            rotation={[-0.079, -1.036, -0.11]}
                >
                    <QuestSeven active={quest === 'q7'} open={q7Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest8.status) &&
                <FileFolder active={quest === 'q8'}
                            activateFunc={() => {
                                setQuest('q8')
                            }}
                            quest={8}
                            open={q8Open}
                            openFunc={() => setQ8Open(true)}
                            closeFunc={() => {
                                setQ8Open(false)
                                setQuest('none')
                            }}
                            position={[0.918, -0.102, -0.027]}
                            rotation={[-0.079, -1.036, -0.11]}
                >
                    <QuestEight active={quest === 'q8'} open={q8Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest9.status) &&
                <FileFolder active={quest === 'q9'}
                            activateFunc={() => {
                                setQuest('q9')
                            }}
                            quest={9}
                            open={q9Open}
                            openFunc={() => setQ9Open(true)}
                            closeFunc={() => {
                                setQ9Open(false)
                                setQuest('none')
                            }}
                            position={[0.983, -0.1, 0.077]}
                            rotation={[-0.036, -0.856, -0.069]}
                >
                    <QuestNine active={quest === 'q9'} open={q9Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest10.status) &&
                <FileFolder active={quest === 'q10'}
                            activateFunc={() => {
                                setQuest('q10')
                            }}
                            quest={10}
                            open={q10Open}
                            openFunc={() => setQ10Open(true)}
                            closeFunc={() => {
                                setQ10Open(false)
                                setQuest('none')
                            }}
                            position={[0.746, -0.082, 0.022]}
                            rotation={[0.154, -0.856, 0.075]}
                >
                    <QuestTen active={quest === 'q10'} open={q10Open}/>
                </FileFolder>
            }

            <mesh geometry={nodes.SideQuestTutorial.geometry}
                  position={[-1.422, 0.26, -3.976]}
                  material={sqMaterial}
                  onPointerEnter={() => {
                      document.body.style.cursor = 'pointer'
                  }}
                  onPointerLeave={() => {
                      document.body.style.cursor = 'default'
                  }}
                  onClick={(event) => {
                      event.stopPropagation()
                      setAppState({
                          tutorialView: true,
                          tutorial: 'sideQuest'
                      })
                  }}
                  rotation={[Math.PI / 2, 0, 0]}/>
            <mesh geometry={nodes.SidequestsMap.geometry}
                  position={[-2.888, 0.305, -2.544]}
                  material={sqMaterial}
                  onPointerEnter={() => {
                      document.body.style.cursor = 'pointer'
                  }}
                  onPointerLeave={() => {
                      document.body.style.cursor = 'default'
                  }}
                  onClick={(event) => {
                      event.stopPropagation()
                      setPlace('sqMap')
                      setAppState({
                          subSection: 'feature',
                          moveFunction: () => {
                              setAppState({
                                  subSection: 'rev'
                              })
                              setPlace('rev')
                          }
                      })
                  }}
                  rotation={[Math.PI * 0.5, 0, -1.528]}/>
            <SideQuestSpinner/>
            <mesh position={[3.011, 0.517, -0.444]}
                  geometry={nodes.QuestsTutorial.geometry}
                  material={wallMaterial}
                  onPointerEnter={() => {
                      document.body.style.cursor = 'pointer'
                  }}
                  onPointerLeave={() => {
                      document.body.style.cursor = 'default'
                  }}
                  onClick={(event) => {
                      event.stopPropagation()
                      setAppState({
                          tutorialView: true,
                          tutorial: 'quest'
                      })
                  }}/>

            <mesh geometry={nodes.DeskTop.geometry}
                  onPointerEnter={() => {
                      document.body.style.cursor = 'pointer'
                  }}
                  onPointerLeave={() => {
                      document.body.style.cursor = 'default'
                  }}
                  onClick={(event) => {
                      event.stopPropagation()
                      setPlace('desk')
                      setAppState({
                          subSection: 'feature',
                          moveFunction: () => {
                              setAppState({
                                  subSection: 'none'
                              })
                              setPlace('home')
                          }
                      })
                  }}
                  material={deskMaterial}
                  position={[0.73, -1.005, -0.212]}
                  rotation={[0, -0.977, 0]}/>

            <mesh geometry={nodes.HighRes.geometry}
                  material={deskMaterial}/>
            <mesh geometry={nodes.LowRes.geometry}
                  material={wallMaterial}/>
            <mesh geometry={nodes.LowRes001.geometry}
                  material={sqMaterial}/>


            <directionalLight position={[0, 3, 5]} intensity={2}/>
            <directionalLight position={[5, 3, -2]} intensity={1.5}/>
        </group>
    )
}

useGLTF.preload('/questRoomFinal.glb')

function SideQuestSpinner() {
    const [appState, setAppState] = useContext(AppContext)
    const [chanceStatus, setChanceStatus] = useState(
        'standby' as 'standby' | 'spinning' | 'won'
    )
    const [showCords, setShowCords] = useState(
        '' as '' | '90.3849238, 23.234234'
    )

    useEffect(() => {
        if (appState.numberSQSpins > 0) setChanceStatus('spinning')
    }, [appState.numberSQSpins])

    useEffect(() => {
        if (showCords !== '') setTimeout(() => setShowCords(''), 2000)
    }, [showCords])

    return <>
        <Compass position={[-2.838, 0.725, -3.074]}
                 open={chanceStatus === 'spinning'}
                 onPointerEnter={() => {
                     document.body.style.cursor = 'pointer'
                 }}
                 onPointerLeave={() => {
                     document.body.style.cursor = 'default'
                 }}
                 onClick={(event) => {
                      event.stopPropagation()
                      if (chanceStatus === 'standby') {
                          setAppState({buyingSQ: true})
                      } else if (chanceStatus === 'spinning') {
                          const r = Math.random()
                          if (r < 0.05) {
                              setChanceStatus('won')
                              setAppState({numberSQSpins: 0})
                          } else {
                              setChanceStatus('standby')
                              setAppState({numberSQSpins: appState.numberSQSpins - 1})
                          }
                      }
                  }}
        />
        {chanceStatus === 'won' &&
            <mesh position={[-2.888, 0.305, -2.044]}
                  onPointerEnter={() => {
                      document.body.style.cursor = 'pointer'
                  }}
                  onPointerLeave={() => {
                      document.body.style.cursor = 'default'
                  }}
                  onClick={(event) => {
                      event.stopPropagation()
                      setShowCords('90.3849238, 23.234234')
                  }}
                  rotation={[0, 0, Math.PI * 0.5]}
            >
                <cylinderGeometry args={[0.01, 0.01, 0.01, 16]}/>
                <meshBasicMaterial color="yellow"/>
            </mesh>}
        {showCords !== '' && <Html position={[-2.888, 0.305, -2.044]}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                padding: '1em',
            }}>
                {showCords}
            </div>
        </Html>}
    </>
}
