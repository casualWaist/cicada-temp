import * as THREE from 'three'
import React, {Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {Html, useGLTF, useTexture} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {AppContext, AxiosContext} from "@/components/AppState"
import {useFrame, useThree} from "@react-three/fiber"
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
import {useNotification} from "@/hooks/useNotification";
import {allWalletsSvg} from "@web3modal/ui/dist/types/src/assets/svg/all-wallets";
import {getAxiosErrorMsg} from "@/utils/errorHandler";

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
    const {nodes} = useGLTF('/questRoomFinal.glb') as GLTFResult
    const [appState, setAppState] = useContext(AppContext)
    const axios = useContext(AxiosContext);
    const notify = useNotification();

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
    const [place, setPlace] = useState('home' as 'home' | 'sqMap' | 'map' | 'tut' | 'sqTut' | 'rev' | 'desk')
    const [quest, setQuest] = useState('none' as 'none' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8' | 'q9' | 'q10')
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
    const moveToPos = useRef(new THREE.Vector3(-1.05, 0.75, 2.5))
    const moveToRot = useRef(new THREE.Quaternion().setFromEuler(
        new THREE.Euler(-Math.PI * 0.175, -Math.PI * 0.45, 0, 'YXZ')
    ))
    const moveToFOV = useRef(30)

    const resetFolders = () => {
        switch (quest) {
            case 'q1':
                setQ1Open(false)
                break
            case 'q2':
                setQ2Open(false)
                break
            case 'q3':
                setQ3Open(false)
                break
            case 'q4':
                setQ4Open(false)
                break
            case 'q5':
                setQ5Open(false)
                break
            case 'q6':
                setQ6Open(false)
                break
            case 'q7':
                setQ7Open(false)
                break
            case 'q8':
                setQ8Open(false)
                break
            case 'q9':
                setQ9Open(false)
                break
            case 'q10':
                setQ10Open(false)
                break
        }
        setQuest('none')
    }

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

    const checkSideQuestChance = async () => {
        try {
            let response = await axios.get("/quest/check_side_quest_chance");
            setAppState({sideQuestWins: response.data.coordinates});
            if (response.data.exists_sidequest_chance) {
                setAppState({numberSQSpins: 1});
            } else {
                setAppState({numberSQSpins: appState.numberSQSpins - 1});
            }
        } catch (error) {
            notify('fail', getAxiosErrorMsg(error));
        }
    };
    useEffect(() => {
        switch (place) {
            case 'home':
                moveToPos.current.set(-1.05, 0.75, 2.5)
                moveToRot.current.setFromEuler(
                    new THREE.Euler(-Math.PI * 0.175, -Math.PI * 0.45, 0, 'YXZ')
                )
                if (quest !== 'none') {
                    resetFolders()
                }
                break
            case 'sqMap':
                moveToPos.current.set(-0.5, 0.25, -2.5)
                moveToRot.current.set(
                    0.1, 1.5, -0.1, 1
                );
                checkSideQuestChance();
                break;
            case 'map':
                moveToPos.current.set(0, 0, 0)
                moveToRot.current.setFromEuler(
                    new THREE.Euler(0, -Math.PI * 0.5, 0, 'XYZ')
                )
                break
            case 'tut':
                moveToPos.current.set(0.75, 0.375, -0.5)
                moveToRot.current.setFromEuler(
                    new THREE.Euler(0, -Math.PI * 0.5, 0, 'XYZ')
                )
                break
            case 'rev':
                moveToPos.current.set(0.79, 1, 0.625)
                moveToRot.current.setFromEuler(
                    new THREE.Euler(-Math.PI * 0.15, Math.PI * 0.4, 0, 'YXZ')
                )
                if (quest !== 'none') {
                    resetFolders()
                }
                break
            case 'sqTut':
                moveToPos.current.set(-2.338, 0.725, -3.074)
                moveToRot.current.set(0.1, 1.5, -0.1, 1)
                break
            case 'desk':
                moveToPos.current.set(-0.25, 0.9, 0.1)
                moveToRot.current.set(
                    -1.5, -0.8, -1.65, 1
                )
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

            <FileFolder active={quest === 'q1'}
                        activateFunc={() => {
                            setQuest('q1')
                        }}
                        quest={1}
                        open={q1Open}
                        openFunc={() => {
                            setQ1Open(true);
                            setAppState({
                                questWinToShow: {
                                    ...appState.questWinToShow,
                                    vaultCode: appState.quest1.vaultCode,
                                    lat: appState.quest1.latitude,
                                    lon: appState.quest1.longitude,
                                    ytLink: appState.quest1.ytLink
                                }
                            })
                        }}
                        closeFunc={() => {
                            setQuest('none')
                            setQ1Open(false)
                        }}
                        restPosition={new THREE.Vector3(0.588, -0.113, -0.102)}
                        position={place === 'desk'
                            ? [0.2, 0.475, 0.1]
                            : [-0.7, 0.65, 2]
                        }
                        restRotation={new THREE.Euler(0, -0.831, 0)}
                        rotation={place === 'desk'
                            ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                            : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                        }
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
                            openFunc={() => {
                                setQ2Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest2.vaultCode,
                                        lat: appState.quest2.latitude,
                                        lon: appState.quest2.longitude,
                                        ytLink: appState.quest2.ytLink
                                    }
                                })

                            }}
                            closeFunc={() => {
                                setQ2Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.679, -0.109, 0.011)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(0, -0.888, -0.036)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
                >
                    <QuestTwo active={quest === 'q2'} open={q2Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest3.status) &&
                <FileFolder active={quest === 'q3'}
                            activateFunc={() => setQuest('q3')}
                            quest={3}
                            open={q3Open}
                            openFunc={() => {
                                setQ3Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest3.vaultCode,
                                        lat: appState.quest3.latitude,
                                        lon: appState.quest3.longitude,
                                        ytLink: appState.quest3.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ3Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.756, -0.103, 0.123)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(0, -0.909, -0.036)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
                >
                    <QuestThree active={quest === 'q3'} open={q3Open}/>
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest4.status) &&
                <FileFolder active={quest === 'q4'}
                            activateFunc={() => setQuest('q4')}
                            quest={4}
                            open={q4Open}
                            openFunc={() => {
                                setQ4Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest4.vaultCode,
                                        lat: appState.quest4.latitude,
                                        lon: appState.quest4.longitude,
                                        ytLink: appState.quest4.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ4Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.793, -0.096, 0.221)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(0, -1.017, -0.036)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
                            openFunc={() => {
                                setQ5Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest5.vaultCode,
                                        lat: appState.quest5.latitude,
                                        lon: appState.quest5.longitude,
                                        ytLink: appState.quest5.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ5Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.88, -0.09, 0.294)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(0, -0.89, -0.042)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
                            openFunc={() => {
                                setQ6Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest6.vaultCode,
                                        lat: appState.quest6.latitude,
                                        lon: appState.quest6.longitude,
                                        ytLink: appState.quest6.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ6Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.81, -0.107, -0.21)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(-0.059, -0.888, -0.057)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
                            openFunc={() => {
                                setQ7Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest7.vaultCode,
                                        lat: appState.quest7.latitude,
                                        lon: appState.quest7.longitude,
                                        ytLink: appState.quest7.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ7Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.843, -0.1, -0.098)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(-0.079, -1.036, -0.11)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
                            openFunc={() => {
                                setQ8Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest8.vaultCode,
                                        lat: appState.quest8.latitude,
                                        lon: appState.quest8.longitude,
                                        ytLink: appState.quest8.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ8Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.918, -0.091, -0.027)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(-0.079, -1.036, -0.11)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
                            openFunc={() => {
                                setQ9Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest9.vaultCode,
                                        lat: appState.quest9.latitude,
                                        lon: appState.quest9.longitude,
                                        ytLink: appState.quest9.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ9Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.989, -0.085, 0.076)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(-0.036, -0.856, -0.069)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
                            openFunc={() => {
                                setQ10Open(true)
                                setAppState({
                                    questWinToShow: {
                                        ...appState.questWinToShow,
                                        vaultCode: appState.quest10.vaultCode,
                                        lat: appState.quest10.latitude,
                                        lon: appState.quest10.longitude,
                                        ytLink: appState.quest10.ytLink
                                    }
                                })
                            }}
                            closeFunc={() => {
                                setQ10Open(false)
                                setQuest('none')
                            }}
                            restPosition={new THREE.Vector3(0.746, -0.068, 0.022)}
                            position={place === 'desk'
                                ? [0.2, 0.475, 0.1]
                                : [-0.7, 0.65, 2]
                            }
                            restRotation={new THREE.Euler(0.154, -0.856, 0.075)}
                            rotation={place === 'desk'
                                ? [Math.PI * 0.6, -Math.PI * 0.4, Math.PI * 0.58]
                                : [Math.PI * 0.3, -Math.PI * 0.14, Math.PI * 0.15]
                            }
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
            <SideQuestSpinner setPlace={setPlace}/>
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


            <directionalLight position={[-1, 3, 5]} intensity={2}/>
            <directionalLight position={[1, 3, -2]} intensity={1.5}/>
        </group>
    )
}

useGLTF.preload('/questRoomFinal.glb')

function SideQuestSpinner({setPlace}: {
    setPlace: Dispatch<SetStateAction<"map" | "rev" | "home" | "sqMap" | "tut" | "sqTut" | "desk">>
}) {
    const axios = useContext(AxiosContext);
    const notify = useNotification();
    const [appState, setAppState] = useContext(AppContext)
    const [chanceStatus, setChanceStatus] = useState(
        'standby' as 'standby' | 'spinning' | 'won'
    )
    const [showCords, setShowCords] = useState<string>('');
    const [needleRotation, setNeedleRotation] = useState(0);

    useEffect(() => {
        if (appState.numberSQSpins > 0) setChanceStatus('spinning')
    }, [appState.numberSQSpins])


    /*useEffect(() => {
        if (showCords !== '') setTimeout(() => setShowCords(''), 7000)
    }, [showCords])*/

    return <>
        <Compass position={[-2.838, 0.725, -3.074]}
                 chanceStatus={chanceStatus}
                 needleRotation={needleRotation}
                 onPointerEnter={() => {
                     document.body.style.cursor = 'pointer'
                 }}
                 onPointerLeave={() => {
                     document.body.style.cursor = 'default'
                 }}
                 onClick={async (event) => {
                     event.stopPropagation()
                     if (appState.walletConnected) {
                         if (chanceStatus === 'standby') {
                             setAppState({buyingSQ: true})
                         } else if (chanceStatus === 'spinning') {
                             try {
                                 let response = await axios.post("/quest/spend_side_quest_chance");
                                 const r = response.data.random / 100;
                                 setNeedleRotation(Math.PI * 14 + Math.PI * 2 * r - Math.PI * 2 * 0.025)
                                 setPlace('sqTut')
                                 setTimeout(() => {
                                     if (r < 0.05) {
                                         notify("success", 'You won a side quest!\nCheck the map for Coordinates.');
                                         setChanceStatus('won');
                                         setPlace('sqMap');
                                         setShowCords(`${response.data.latitude}, ${response.data.longitude}`)
                                     } else {
                                         setChanceStatus('standby')
                                         notify("fail", response.data.msg || "Unfortunately, Spin Failed!\nYou lost your chance.");
                                     }
                                 }, 4250);
                             } catch (error) {
                                 setChanceStatus('standby')
                                 notify('fail', getAxiosErrorMsg(error));
                             }
                         }
                     } else {
                         setAppState({
                             notify: true,
                             noteText: "Wallet not connected",
                             noteStyle: "alert"
                         })
                     }
                 }}
        />
        {appState.sideQuestWins.length > 0 &&
            appState.sideQuestWins.map((win, i) => {
                return <mesh key={`sQMesh${i}`} position={[-2.888, win.mapY, win.mapX]}
                             onPointerEnter={() => {
                                 document.body.style.cursor = 'pointer'
                             }}
                             onPointerLeave={() => {
                                 document.body.style.cursor = 'default'
                             }}
                             onClick={(event) => {
                                 event.stopPropagation();
                                 event.stopPropagation()
                                 setAppState({
                                     showSQWin: true,
                                     sQWinToShow: win,
                                 })
                             }}
                             rotation={[0, 0, Math.PI * 0.5]}
                >
                    <cylinderGeometry key={`sQGeo${i}`} args={[0.01, 0.01, 0.075, 16]}/>
                    <meshBasicMaterial key={`sQMat${i}`} color="#dab665"/>
                </mesh>
            })}
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
