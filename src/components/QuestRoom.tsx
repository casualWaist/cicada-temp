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

type GLTFResult = GLTF & {
    nodes: {
        Room_1: THREE.Mesh
        Room_2: THREE.Mesh
        Backdrop: THREE.Mesh
        Bookcase: THREE.Mesh
        BoxShortStack1: THREE.Mesh
        BoxShortStack4: THREE.Mesh
        BoxesBehindMap: THREE.Mesh
        BoxTopOfFiles: THREE.Mesh
        booksFacade_1: THREE.Mesh
        booksFacade_2: THREE.Mesh
        SidequestsMap: THREE.Mesh
        SideQuestTutorial: THREE.Mesh
        PaperBoxLeft: THREE.Mesh
        PaperBoxRight: THREE.Mesh
        SmallCabinet: THREE.Mesh
        BoxUnderTutBottom: THREE.Mesh
        BoxUnderTutTop: THREE.Mesh
        WallLamp_1: THREE.Mesh
        WallLamp_2: THREE.Mesh
        Encyclopedias_1: THREE.Mesh
        Encyclopedias_2: THREE.Mesh
        FileCabinetsLeft: THREE.Mesh
        FileCabinetsMiddleLeft: THREE.Mesh
        FileCabinetsMiddleRight: THREE.Mesh
        FileCabinetsRight_1: THREE.Mesh
        FileCabinetsRight_2: THREE.Mesh
        NewspaperLeft: THREE.Mesh
        NewspaperRight: THREE.Mesh
        NewspaperStack: THREE.Mesh
        QuestsTutorial_1: THREE.Mesh
        QuestsTutorial_2: THREE.Mesh
        RowOfBooks_1: THREE.Mesh
        RowOfBooks_2: THREE.Mesh
        Radiator_1: THREE.Mesh
        Radiator_2: THREE.Mesh
        LargeStackOfNewspapers: THREE.Mesh
        NewspaperStrings: THREE.Mesh
        Desk: THREE.Mesh
        Desk_1: THREE.Mesh
        globe: THREE.Mesh
        Cylinder008: THREE.Mesh
        Cylinder008_1: THREE.Mesh
        Cylinder008_2: THREE.Mesh
        Cylinder008_3: THREE.Mesh
        Cylinder008_4: THREE.Mesh
        DeskLamp: THREE.Mesh
        DeskLampNear: THREE.Mesh
        CharlieScraps: THREE.Mesh
        ashTray_1: THREE.Mesh
        ashTray_2: THREE.Mesh
        Glasses_1: THREE.Mesh
        Glasses_2: THREE.Mesh
        Glasses_3: THREE.Mesh
        OpenBook_1: THREE.Mesh
        OpenBook_2: THREE.Mesh
        OpenBook_3: THREE.Mesh
        LeatherBookBack: THREE.Mesh
        LeatherBookFront: THREE.Mesh
        WrappedLeatherBook: THREE.Mesh
        TheSecretWarning: THREE.Mesh
        OldLeatherBook_1: THREE.Mesh
        OldLeatherBook_2: THREE.Mesh
        Magnifier001: THREE.Mesh
        Typewriter_1: THREE.Mesh
        Typewriter_2: THREE.Mesh
        Typewriter_3: THREE.Mesh
        Typewriter_4: THREE.Mesh
        Typewriter_5: THREE.Mesh
        Typewriter_6: THREE.Mesh
        Typewriter_7: THREE.Mesh
        EnvolopeStack: THREE.Mesh
        EnvolopeTop: THREE.Mesh
        DateBook_1: THREE.Mesh
        DateBook_2: THREE.Mesh
        DateBook_3: THREE.Mesh
        DateBook_4: THREE.Mesh
        Pen_1: THREE.Mesh
        Pen_2: THREE.Mesh
        GoldCoins: THREE.Mesh
        DeskBlotter: THREE.Mesh
        StackOfPaper: THREE.Mesh
        Chair_1: THREE.Mesh
        Chair_2: THREE.Mesh
        Chair_3: THREE.Mesh
        Chair_4: THREE.Mesh
    }
    materials: {}
}

export function QuestRoom(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/questRoom.glb') as GLTFResult
    const roomTex = useTexture(
        '/FinalTextureQuestRoom.webp',
        (loader) => loader.flipY = false
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
    const [pageNum, setPageNum] = useState(1)
    const [appState, setAppState] = useContext(AppContext)
    const camera = useThree(
        (state) => state.camera as PerspectiveCamera
    )
    const material = useMemo(
        () => new THREE.MeshBasicMaterial({map: roomTex}),
        [roomTex]
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
                        closeFunc={() => setQuest('none')}
                        resetPages={() => setPageNum(1)}
                        position={[0.804, -0.113, -0.045]}
            >
                <FilePage page={1}
                          quest={1}
                          activePage={pageNum}
                          turnThePage={() => setPageNum(2)}
                          position={[-0.115, 0.004, -0.002]}
                />
                <FilePage page={2}
                          quest={1}
                          activePage={pageNum}
                          turnThePage={() => setPageNum(3)}
                          position={[-0.108, 0.003, 0.001]}
                />
                <FilePage page={3}
                          quest={1}
                          activePage={pageNum}
                          turnThePage={() => setPageNum(1)}
                          position={[-0.118, 0.0025, 0]}
                />
            </FileFolder>

            {['started', 'completed'].includes(appState.quest2.status) &&
                <FileFolder active={quest === 'q2'}
                            activateFunc={() => {
                                setQuest('q2')
                            }}
                            quest={2}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[0.804, -0.013, -0.045]}
                >
                    <FilePage page={1}
                              quest={2}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={2}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={2}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest3.status) &&
                <FileFolder active={quest === 'q3'}
                            activateFunc={() => {
                                setQuest('q3')
                            }}
                            quest={3}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[0.804, 0.1, -0.045]}
                >
                    <FilePage page={1}
                              quest={3}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={3}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={3}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest4.status) &&
                <FileFolder active={quest === 'q4'}
                            activateFunc={() => {
                                setQuest('q4')
                            }}
                            quest={4}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[0.804, 0.2, -0.045]}
                >
                    <FilePage page={1}
                              quest={4}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={4}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={4}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest5.status) &&
                <FileFolder active={quest === 'q5'}
                            activateFunc={() => {
                                setQuest('q5')
                            }}
                            quest={5}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[0.804, 0.3, -0.045]}
                >
                    <FilePage page={1}
                              quest={5}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={5}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={5}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest6.status) &&
                <FileFolder active={quest === 'q6'}
                            activateFunc={() => {
                                setQuest('q6')
                            }}
                            quest={6}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[1, -0.113, 0.195]}
                >
                    <FilePage page={1}
                              quest={6}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={6}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={6}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest7.status) &&
                <FileFolder active={quest === 'q7'}
                            activateFunc={() => {
                                setQuest('q7')
                            }}
                            quest={7}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[1, -0.013, 0.195]}
                >
                    <FilePage page={1}
                              quest={7}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={7}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={7}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest8.status) &&
                <FileFolder active={quest === 'q8'}
                            activateFunc={() => {
                                setQuest('q8')
                            }}
                            quest={8}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[1, 0.1, 0.195]}
                >
                    <FilePage page={1}
                              quest={8}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={8}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={8}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest9.status) &&
                <FileFolder active={quest === 'q9'}
                            activateFunc={() => {
                                setQuest('q9')
                            }}
                            quest={9}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[1, 0.2, 0.195]}
                >
                    <FilePage page={1}
                              quest={9}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={9}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={9}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            {['started', 'completed'].includes(appState.quest10.status) &&
                <FileFolder active={quest === 'q10'}
                            activateFunc={() => {
                                setQuest('q10')
                            }}
                            quest={10}
                            closeFunc={() => setQuest('none')}
                            resetPages={() => setPageNum(1)}
                            position={[1, 0.3, 0.195]}
                >
                    <FilePage page={1}
                              quest={10}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(2)}
                              position={[-0.115, 0.004, -0.002]}
                    />
                    <FilePage page={2}
                              quest={10}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(3)}
                              position={[-0.108, 0.003, 0.001]}
                    />
                    <FilePage page={3}
                              quest={10}
                              activePage={pageNum}
                              turnThePage={() => setPageNum(1)}
                              position={[-0.118, 0.0025, 0]}
                    />
                </FileFolder>
            }

            <mesh geometry={nodes.SideQuestTutorial.geometry}
                  position={[-1.422, 0.26, -3.976]}
                  material={material}
                  onClick={(event) => {
                      event.stopPropagation()
                      setPlace('sqTut')
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
                  rotation={[Math.PI / 2, 0, 0]}/>
            <mesh geometry={nodes.SidequestsMap.geometry}
                  position={[-2.888, 0.305, -2.544]}
                  material={material}
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
            <group position={[3.011, 0.517, -0.444]}
                   onClick={(event) => {
                       event.stopPropagation()
                       setPlace('tut')
                       setAppState({
                           subSection: 'feature',
                           moveFunction: () => {
                               setAppState({
                                   subSection: 'none'
                               })
                               setPlace('home')
                           }
                       })
                   }}>
                <mesh geometry={nodes.QuestsTutorial_1.geometry} material={material}/>
                <mesh geometry={nodes.QuestsTutorial_2.geometry} material={material}/>
            </group>

            <mesh geometry={nodes.Backdrop.geometry} position={[4.027, 0, -3.898]}
                  rotation={[Math.PI / 2, 0, 1]}>
                <meshBasicMaterial color="black"/>
            </mesh>
            <mesh geometry={nodes.Bookcase.geometry} material={material} position={[-2.874, 0.155, -3.649]}
                  rotation={[0, -1.571, 0]} scale={[0.421, 0.39, 0.26]}/>
            <mesh geometry={nodes.BoxShortStack1.geometry} material={material}
                  position={[-2.137, -0.441, -3.602]} rotation={[0, 0, Math.PI]}/>
            <mesh geometry={nodes.BoxShortStack4.geometry} material={material}
                  position={[-0.841, -0.441, -3.602]} rotation={[Math.PI, 0, Math.PI]}/>
            <mesh geometry={nodes.BoxesBehindMap.geometry} material={material}
                  position={[-3.297, -1, -2.909]}/>
            <mesh geometry={nodes.BoxTopOfFiles.geometry} material={material}
                  position={[0.319, 0.62, -3.783]} rotation={[0, 1.571, 0]}/>
            <group position={[-2.819, 0.978, -3.564]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh geometry={nodes.booksFacade_1.geometry} material={material}/>
                <mesh geometry={nodes.booksFacade_2.geometry} material={material}/>
            </group>
            <mesh geometry={nodes.PaperBoxLeft.geometry} material={material}
                  position={[-3.309, 0.848, -2.119]} rotation={[0, 0.047, 0]}/>
            <mesh geometry={nodes.PaperBoxRight.geometry} material={material}
                  position={[-3.152, 0.848, -2.682]} rotation={[-Math.PI, 1.524, -Math.PI]}/>
            <mesh geometry={nodes.SmallCabinet.geometry} material={material}
                  position={[0.242, -1, -3.753]}/>
            <mesh geometry={nodes.BoxUnderTutBottom.geometry} material={material}
                  position={[2.801, -0.999, 0.217]}/>
            <mesh geometry={nodes.BoxUnderTutTop.geometry} material={material}
                  position={[2.801, -0.659, 0.211]} rotation={[Math.PI, 0, Math.PI]}/>
            <group position={[3.02, 1.24, -0.479]} rotation={[0, 0, Math.PI / 2]}>
                <mesh geometry={nodes.WallLamp_1.geometry} material={material}/>
                <mesh geometry={nodes.WallLamp_2.geometry} material={material}/>
            </group>
            <group position={[2.613, -0.322, 0.253]} rotation={[0, -1.571, 0]}>
                <mesh geometry={nodes.Encyclopedias_1.geometry} material={material}/>
                <mesh geometry={nodes.Encyclopedias_2.geometry} material={material}/>
            </group>
            <mesh geometry={nodes.FileCabinetsLeft.geometry} material={material}
                  position={[1.01, -1, -3.688]} rotation={[0, -0.526, 0]}/>
            <mesh geometry={nodes.FileCabinetsMiddleLeft.geometry} material={material}
                  position={[1.465, -1, -3.29]} rotation={[0, -1.058, 0]}/>
            <mesh geometry={nodes.FileCabinetsMiddleRight.geometry} material={material}
                  position={[2.375, -1, -1.675]} rotation={[0, -1.058, 0]}/>
            <group position={[2.592, -1, -1.3]} rotation={[0, -0.947, 0]}>
                <mesh geometry={nodes.FileCabinetsRight_1.geometry} material={material}/>
                <mesh geometry={nodes.FileCabinetsRight_2.geometry} material={material}/>
            </group>
            <mesh geometry={nodes.NewspaperLeft.geometry} material={material}
                  position={[1.522, -0.195, -2.669]} rotation={[Math.PI / 2, 0, 0.984]}/>
            <mesh geometry={nodes.NewspaperRight.geometry} material={material}
                  position={[1.901, -0.195, -2.1]} rotation={[Math.PI / 2, 0, 0.984]}/>
            <mesh geometry={nodes.NewspaperStack.geometry} material={material}
                  position={[2.389, 0.371, -1.217]} rotation={[0.059, -0.497, 0.019]}/>
            <group position={[2.89, -0.929, 0.282]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh geometry={nodes.RowOfBooks_1.geometry} material={material}/>
                <mesh geometry={nodes.RowOfBooks_2.geometry} material={material}/>
            </group>
            <group position={[2.896, -1, -0.602]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh geometry={nodes.Radiator_1.geometry} material={material}/>
                <mesh geometry={nodes.Radiator_2.geometry} material={material}/>
            </group>
            <mesh geometry={nodes.LargeStackOfNewspapers.geometry} material={material}
                  position={[1.522, -0.195, -2.669]} rotation={[0, -1.016, 0]}/>
            <mesh geometry={nodes.NewspaperStrings.geometry} material={material}
                  position={[2.366, 0.488, -1.392]} rotation={[0.059, -0.497, 0.019]}/>
            <mesh geometry={nodes.globe.geometry} material={material} position={[1.535, -0.22, 0.532]}
                  rotation={[-Math.PI, -1.464, -2.752]} scale={0.212}/>
            <group position={[0.743, 0.488, -1.451]} rotation={[0, -0.631, 0]}>
                <mesh geometry={nodes.Cylinder008.geometry} material={material}/>
                <mesh geometry={nodes.Cylinder008_1.geometry} material={material}/>
                <mesh geometry={nodes.Cylinder008_2.geometry} material={material}/>
                <mesh geometry={nodes.Cylinder008_3.geometry} material={material}/>
                <mesh geometry={nodes.Cylinder008_4.geometry} material={material}/>
            </group>
            <group onClick={(event) => {
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
            }}>
                <group position={[0.73, -1.005, -0.212]} rotation={[0, -0.977, 0]}>
                    <mesh geometry={nodes.Desk.geometry} material={material}/>
                    <mesh geometry={nodes.Desk_1.geometry} material={material}/>
                </group>
                <mesh geometry={nodes.DeskLamp.geometry} material={material} position={[1.13, -0.111, -0.112]}
                      rotation={[0, -0.305, 0]}/>
                <mesh geometry={nodes.DeskLampNear.geometry} material={material}
                      position={[0.055, -0.116, -1.422]} rotation={[0, -1.556, 0]}/>
                <mesh geometry={nodes.CharlieScraps.geometry} material={material}
                      position={[0.644, 0.488, -1.519]} rotation={[Math.PI / 2, 0, 0.631]} scale={0.008}/>
                <group position={[1.17, -0.113, 0.248]}>
                    <mesh geometry={nodes.ashTray_1.geometry} material={material}/>
                    <mesh geometry={nodes.ashTray_2.geometry} material={material}/>
                </group>
                <group position={[0.396, -0.11, -0.363]} rotation={[-0.087, 0.431, 0.046]}>
                    <mesh geometry={nodes.Glasses_1.geometry} material={material}/>
                    <mesh geometry={nodes.Glasses_2.geometry} material={material}/>
                    <mesh geometry={nodes.Glasses_3.geometry} material={material}/>
                </group>
                <group position={[0.41, -0.114, -0.378]} rotation={[0, -0.729, 0]}>
                    <mesh geometry={nodes.OpenBook_1.geometry} material={material}/>
                    <mesh geometry={nodes.OpenBook_2.geometry} material={material}/>
                    <mesh geometry={nodes.OpenBook_3.geometry} material={material}/>
                </group>
                <mesh geometry={nodes.LeatherBookBack.geometry} material={material}
                      position={[0.393, -0.08, -1.188]} rotation={[Math.PI, 0, Math.PI / 2]}/>
                <mesh geometry={nodes.LeatherBookFront.geometry} material={material}
                      position={[0.307, -0.08, -1.051]} rotation={[0, 0, -Math.PI / 2]}/>
                <mesh geometry={nodes.WrappedLeatherBook.geometry} material={material}
                      position={[0.264, -0.102, -0.826]} rotation={[0, 0, -1.58]}/>
                <mesh geometry={nodes.TheSecretWarning.geometry} material={material}
                      position={[0.487, -0.076, -0.822]} rotation={[-Math.PI / 2, 0, 1.401]}/>
                <group position={[0.343, -0.01, -1.278]} rotation={[Math.PI / 2, 0, -0.281]} scale={0.823}>
                    <mesh geometry={nodes.OldLeatherBook_1.geometry} material={material}/>
                    <mesh geometry={nodes.OldLeatherBook_2.geometry} material={material}/>
                </group>
                <mesh geometry={nodes.Magnifier001.geometry} material={material}
                      position={[0.508, -0.12, -0.709]} rotation={[0, -0.852, 0]}/>
                <group position={[0.006, 0.061, -1.296]} rotation={[0, -Math.PI / 2, 0]}>
                    <mesh geometry={nodes.Typewriter_1.geometry} material={material}/>
                    <mesh geometry={nodes.Typewriter_2.geometry} material={material}/>
                    <mesh geometry={nodes.Typewriter_3.geometry} material={material}/>
                    <mesh geometry={nodes.Typewriter_4.geometry} material={material}/>
                    <mesh geometry={nodes.Typewriter_5.geometry} material={material}/>
                    <mesh geometry={nodes.Typewriter_6.geometry} material={material}/>
                    <mesh geometry={nodes.Typewriter_7.geometry} material={material}/>
                </group>
                <mesh geometry={nodes.EnvolopeStack.geometry} material={material}
                      position={[-0.211, -0.116, -1.194]} rotation={[0, -1.558, 0]}/>
                <mesh geometry={nodes.EnvolopeTop.geometry} material={material}
                      position={[-0.213, -0.06, -1.213]} rotation={[0, 1.509, -Math.PI]}/>
                <group position={[0.186, -0.116, -0.759]}>
                    <mesh geometry={nodes.DateBook_1.geometry} material={material}/>
                    <mesh geometry={nodes.DateBook_2.geometry} material={material}/>
                    <mesh geometry={nodes.DateBook_3.geometry} material={material}/>
                    <mesh geometry={nodes.DateBook_4.geometry} material={material}/>
                </group>
                <group position={[0.255, -0.102, -0.709]}>
                    <mesh geometry={nodes.Pen_1.geometry} material={material}/>
                    <mesh geometry={nodes.Pen_2.geometry} material={material}/>
                </group>
                <mesh geometry={nodes.GoldCoins.geometry} material={material}
                      position={[0.582, -0.118, -0.916]}/>
                <mesh geometry={nodes.DeskBlotter.geometry} material={material}
                      position={[0.804, -0.113, -0.045]} rotation={[0, -0.984, 0]}/>
                <mesh geometry={nodes.StackOfPaper.geometry} material={material}
                      position={[0.748, -0.113, -0.545]}/>
            </group>
            <group position={[0.021, -1.003, -0.081]} rotation={[0, -1.323, 0]}>
                <mesh geometry={nodes.Chair_1.geometry} material={material}/>
                <mesh geometry={nodes.Chair_2.geometry} material={material}/>
                <mesh geometry={nodes.Chair_3.geometry} material={material}/>
                <mesh geometry={nodes.Chair_4.geometry} material={material}/>
            </group>
            <mesh geometry={nodes.Room_1.geometry} material={material}/>
            <mesh geometry={nodes.Room_2.geometry} material={material}/>
            <directionalLight position={[0, 3, 5]} intensity={0.5}/>
            <directionalLight position={[5, 3, -2]} intensity={1.5}/>
        </group>
    )
}

useGLTF.preload('/questRoom.glb')

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
        <Compass position={[-2.788, 0.605, -3.044]}
                 open={chanceStatus === 'spinning'}
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
