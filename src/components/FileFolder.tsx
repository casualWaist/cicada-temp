import * as THREE from 'three'
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react'
import {Html, useGLTF, useTexture} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {AppContext} from "@/components/AppState"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"

type GLTFResult = GLTF & {
    nodes: {
        FolderBack: THREE.Mesh
        FolderFront: THREE.Mesh
        OpenLabel: THREE.Mesh
        OpenTrigger: THREE.Mesh
        Page: THREE.Mesh
    }
    materials: {}
}

type FileFolderProps = {
    active: boolean
    open: boolean
    quest: 1|2|3|4|5|6|7|8|9|10
    restPosition?: THREE.Vector3
    restRotation?: THREE.Euler
    activateFunc: () => void
    openFunc: () => void
    closeFunc: () => void
}

export const FileFolder = forwardRef<
    THREE.Group,
    JSX.IntrinsicElements['group'] & FileFolderProps
>((
    {
        active,
        open,
        quest,
        restPosition = new THREE.Vector3(0, 0, 0),
        restRotation = new THREE.Euler(0, 0, 0),
        activateFunc,
        openFunc,
        closeFunc,
        ...props
    }:
        JSX.IntrinsicElements['group'] & FileFolderProps, ref) => {

    const { nodes } = useGLTF('/fileFolder.glb') as GLTFResult
    const [appState, setAppState] = useContext(AppContext)
    const folderTex = useTexture(
        '/paperNormal512.webp',
        (tex) => {
            tex.wrapT = tex.wrapS = THREE.RepeatWrapping
        }
    )
    const material = useMemo(
        () => new THREE.MeshStandardMaterial({
            normalMap: folderTex,
            roughness: 0.5,
            color: "#c4b49a",
            side: THREE.DoubleSide
        }),
        [folderTex]
    )

    const localRef = useRef<THREE.Group>(null!)
    useImperativeHandle(ref, () => localRef.current)
    const frontRef = useRef<THREE.Mesh>(null!)

    useGSAP(() => {
        const p = new THREE.Vector3()
        const r = new THREE.Euler()
        if (active) {
            if (props.position instanceof THREE.Vector3) {
                p.copy(props.position)
            } else {
                if (props.position instanceof Array) {
                    p.set(props.position[0], props.position[1], props.position[2])
                }
            }
            if (props.rotation instanceof THREE.Euler) {
                r.copy(props.rotation)
            } else {
                if (props.rotation instanceof Array) {
                    r.set(props.rotation[0], props.rotation[1], props.rotation[2])
                }
            }
        } else {
            p.copy(restPosition)
            r.copy(restRotation)
        }
        const d = localRef.current.position.distanceTo(new THREE.Vector3(0, 0, 0))
        gsap.to(localRef.current.position, {
            duration: d < 0.01 ? 0.01 : 1.5,
            x: p.x,
            y: p.y,
            z: p.z,
            ease: 'power2.out',
        })
        gsap.to(localRef.current.rotation, {
            duration: d < 0.01 ? 0.01 : 1.5,
            x: r.x,
            y: r.y,
            z: r.z,
            ease: 'power2.out',
        })
    }, [props.position, props.rotation])

    useEffect(() => {
        if (frontRef.current) {
            frontRef.current.position.set(-0.115, 0.005, 0)
            frontRef.current.rotation.set(0, 0, 0)
        }
    }, [])

    useGSAP(() => {
        if (open) {
            if (frontRef.current.rotation.z !== 3.14) {
                gsap.to(frontRef.current.position, {
                    duration: 0.75,
                    x: -0.1145,
                    y: 0.005,
                    z: 0,
                    ease: 'power2.out',
                })
                gsap.to(frontRef.current.rotation, {
                    duration: 0.75,
                    x: 0,
                    y: 0,
                    z: 3.14,
                    ease: 'power2.out',
                })
            }
        } else {
            gsap.to(frontRef.current.position, {
                duration: 0.75,
                x: -0.115,
                y: 0.005,
                z: 0,
                ease: 'power2.out',
            })
            gsap.to(frontRef.current.rotation, {
                duration: 0.75,
                x: 0,
                y: 0,
                z: 0,
                ease: 'power2.out',
            })
        }
    }, [open])

  return (
    <group ref={localRef} dispose={null}>
        <mesh geometry={nodes.FolderBack.geometry}
              onPointerEnter={() => {
                  document.body.style.cursor = 'pointer'
              }}
              onPointerLeave={() => {
                  document.body.style.cursor = 'default'
              }}
              material={material}
        >
            <mesh geometry={nodes.FolderFront.geometry}
                  ref={frontRef}
                  material={material}
                  onPointerEnter={(event) => {
                      event.stopPropagation()
                      if (!active){
                          document.body.style.cursor = 'pointer'
                      }
                  }}
                  onPointerLeave={() => {
                      document.body.style.cursor = 'default'
                  }}
                  onClick={(event) => {
                      activateFunc()
                      event.stopPropagation()
                  }}
            >
                <FolderLabel quest={quest} normalMap={folderTex} />
            </mesh>

                <mesh geometry={nodes.OpenTrigger.geometry}
                      onPointerEnter={(event) => {
                          event.stopPropagation()
                          if (!active) {
                              document.body.style.cursor = 'pointer'
                          }
                      }}
                      onPointerLeave={() => {
                          document.body.style.cursor = 'default'
                      }}
                      onClick={(event) => {
                          if (active) {
                              event.stopPropagation()
                              if (appState.folderTutorial) setAppState({
                                  folderTutorial: false
                              })
                              if (open) {
                                  closeFunc()
                              } else {
                                  openFunc()
                              }
                          }
                      }}
                      position={[-0.115, 0.002, 0]}>
                    <meshBasicMaterial transparent opacity={0}/>
                </mesh>

                {props.children}
            </mesh>

        {active &&
            <group position={[0, -0.1, 0]}
                      rotation={[-Math.PI * 0.5, 0, 0]}
                      onPointerEnter={() => {
                          document.body.style.cursor = 'pointer'
                      }}
                      onPointerLeave={() => {
                          document.body.style.cursor = 'default'
                      }}
                      onClick={(event) => {
                          event.stopPropagation()
                          closeFunc()
                      }}>
                {appState.folderTutorial &&
                    <Html position={[0.13, 0.1, 0]}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            textAlign: 'center',
                            textShadow: '0px 0px 5px black',
                            color: 'white',
                            padding: 20,
                            lineHeight: appState.isMobile ? '0.9' : 'initial',
                        }}>
                            <svg className="w-[2em] h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor"
                                      d="m3 3l18 18M3 3c.676.676 1.923 1.11 3.039 1.379c1.49.359 3.036.424 4.559.252c1.182-.134 2.484-.4 3.009-.924M3 3c.676.676 1.11 1.923 1.379 3.039c.359 1.49.424 3.036.252 4.559c-.134 1.182-.4 2.484-.924 3.009"/>
                            </svg>
                            <h1 className="lg:text-2xl">{`Click Flap To ${open ? 'close' : 'open'}`}</h1>
                        </div>
                    </Html>}
                <mesh>
                    <planeGeometry args={[1, 1]}/>
                    <meshBasicMaterial transparent opacity={0}/>
                </mesh>
            </group>}
    </group>
  )
})
FileFolder.displayName = 'FileFolder'
useGLTF.preload('/fileFolder.glb')

type FilePageProps = {
    quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    page: 1 | 2 | 3
    activePage: number
    turnThePage: () => void
}

export function FilePage({quest, page, activePage, turnThePage, ...props}:
                             JSX.IntrinsicElements['mesh'] & FilePageProps) {
    const {nodes} = useGLTF('/fileFolder.glb') as GLTFResult
    const [appState, setAppState] = useContext(AppContext)
    const paperTex = useTexture('/paperNormal512.webp')
    const pageRef = useRef<THREE.Mesh>(null!)

    useGSAP(() => {
        if (page < activePage) {
            if (pageRef.current.rotation.z !== Math.PI) {
                gsap.to(pageRef.current.rotation, {
                    duration: 0.75,
                    z: page === 2 ? Math.PI * 0.97 : Math.PI,
                    ease: 'power2.out',
                })
            }
        } else {
            if (pageRef.current.rotation.z !== 0) {
                gsap.to(pageRef.current.rotation, {
                    duration: 0.75,
                    z: 0,
                    ease: 'power2.out',
                })
            }
        }
    }, [activePage])

    function stringUpdate() {
        switch (appState[questString(quest)][subQString(page)]){
            case "started":
                return "hinted"
            case "hinted":
                return "completed"
            default:
                return "started"
        }
    }

    return <mesh geometry={nodes.Page.geometry}
                 ref={pageRef}
                 onClick={(event) => {
                     event.stopPropagation()
                     if (appState[questString(quest)][subQString(page)] === 'completed') {
                         if (page < 3) {
                             setAppState({
                                 [questString(quest)]: {
                                     ...appState[questString(quest)],
                                     [subQString(page + 1 as 1|2|3)]: stringUpdate()
                                 }
                             })
                         } else {
                             setAppState({
                                 [questString(quest + 1 as 1|2|3)]: {
                                     ...appState[questString(quest + 1 as 1|2|3)],
                                     status: 'started',
                                     [subQString(1)]: stringUpdate()
                                 }
                             })
                         }
                         turnThePage()
                     } else {
                         setAppState({
                             [questString(quest)]: {
                                    ...appState[questString(quest)],
                                    [subQString(page)]: stringUpdate()
                             }
                         })
                     }
                 }}
                 {...props}
    >
        {props.children}
        <meshStandardMaterial color={page > activePage ? "#ddd" : "white"}
                              normalMap={paperTex}
                              normalScale={new THREE.Vector2(0.25, 0.25)}
                              roughness={0.5}
                              side={THREE.DoubleSide}/>
            {appState.userLives === 0 && <BuyLivesButton active={page === activePage}/>}
            <HintButton active={page === activePage} page={page} quest={quest}/>
            {
                ['started', 'hinted'].includes(appState[questString(quest)][subQString(page)])
                && appState.userLives > 0
                && <PasswordButton active={page === activePage} page={page} quest={quest}/>
            }
    </mesh>
}

function FolderLabel({quest, normalMap}: { quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, normalMap: THREE.Texture }) {
    const titleTexture = useTexture(`/ButtonTextures/Quest${quest}Label.webp`)

    return <mesh position={[0.115, 0.01, -0.05]}
                 rotation={[-Math.PI * 0.5, 0, 0]}
    >
        <planeGeometry args={[0.05, 0.0375]}/>
        <meshBasicMaterial map={titleTexture} transparent/>
    </mesh>
}

function PasswordButton({quest, page, active}: {
    quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    page: 1 | 2 | 3,
    active: boolean
}) {
    const [appState, setAppState] = useContext(AppContext)
    const buttonTex = useTexture('/ButtonTextures/EnterPassword.webp')

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 visible={active}
                 position={[0.19, 0.00005, 0.08]}
                 onClick={(event) => {
                     event.stopPropagation()
                     if (appState.walletConnected) {
                         setAppState({
                             enteringPassword: true,
                             pwToEnter: {
                                 quest: quest,
                                 subQ: page
                             }
                         })
                     } else {
                         setAppState({
                             notify: true,
                             noteText: "Wallet not connected",
                             noteStyle: "alert"
                         })
                     }
                 }}
    >
        <planeGeometry args={[0.0375, 0.028125]}/>
        <meshBasicMaterial map={buttonTex} transparent/>
    </mesh>
}

function BuyLivesButton({active}: {active: boolean}) {
    const [appState, setAppState] = useContext(AppContext)
    const buttonTex = useTexture('/ButtonTextures/BuyLives.webp')

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 visible={active}
                 position={[0.05, 0.00005, 0.105]}
                 onClick={(event) => {
                     event.stopPropagation()
                     setAppState({
                         buyingLives: true,
                     })
                 }}
    >
        <planeGeometry args={[0.05, 0.0375]}/>
        <meshBasicMaterial map={buttonTex} transparent/>
    </mesh>
}

function HintButton({quest, page, active}: {
    quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    page: 1 | 2 | 3,
    active: boolean
}) {
    const [appState, setAppState] = useContext(AppContext)
    const buyHintTex = useTexture('ButtonTextures/BuyHint.webp')
    const hintTextTex = useTexture(`SubQuestTextures/HintQ${quest}sQ${page}.webp`)
    const completeTex = useTexture('ButtonTextures/Completed.webp')
    const winTex = useTexture('ButtonTextures/ShowWinnings.webp')
    const [titleTexture, setTitleTexture] = useState(buyHintTex)

    useEffect(() => {
        switch (appState[questString(quest)][subQString(page)]) {
            case 'hinted':
                setTitleTexture(hintTextTex)
                break
            case 'completed':
                if (page === 3){
                    setTitleTexture(winTex)
                } else {
                    setTitleTexture(completeTex)
                }
                break
            default:
                setTitleTexture(buyHintTex)
        }
    }, [appState[questString(quest)][subQString(page)]])

    if (page === 3 && appState[questString(quest)][subQString(page)] === 'completed') {
        return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                     visible={active}
                     onPointerEnter={() => {
                         document.body.style.cursor = 'pointer'
                     }}
                     onPointerLeave={() => {
                         document.body.style.cursor = 'default'
                     }}
                     onClick={() => {
                        setAppState({
                            showQuestWin: true,
                            questWinToShow: {
                                vaultCode: 121212,
                                lat: 90.0001,
                                lon: 30.0001,
                                ytLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                            }
                        })
                     }}
                     position={[0.18, 0.00005, 0.11]}>
            <planeGeometry args={[0.05, 0.0375]}/>
            <meshBasicMaterial map={titleTexture} transparent/>
        </mesh>
    }

    if (appState[questString(quest)][subQString(page)] !== 'started') {
        return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                     visible={active}
                     position={[0.19, 0.00005, 0.119]}>
            <planeGeometry args={[0.05, 0.0375]}/>
            <meshBasicMaterial map={titleTexture} transparent/>
        </mesh>
    }

    return <mesh rotation={[-Math.PI * 0.5, 0, 0]}
                 position={[0.19, 0.00005, 0.119]}
                 visible={active}
                 onPointerEnter={() => {
                     document.body.style.cursor = 'pointer'
                 }}
                 onPointerLeave={() => {
                     document.body.style.cursor = 'default'
                 }}
                 onClick={(event) => {
                     event.stopPropagation()
                     if (appState.walletConnected) {
                         setAppState({
                             buyingHint: true,
                             hintToBuy: {
                                 quest: quest,
                                 subQ: page
                             }
                         })
                     } else {
                         setAppState({
                             notify: true,
                             noteText: "Wallet not connected",
                             noteStyle: "alert"
                         })
                     }
                 }}
    >
        <planeGeometry args={[0.025, 0.01875]}/>
        <meshBasicMaterial map={titleTexture} transparent/>
    </mesh>
}

export function questString(quest: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10' {
    return `quest${quest}` as 'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
}

function subQString(page: 1 | 2 | 3): 'subQ1' | 'subQ2' | 'subQ3' {
    return `subQ${page}` as 'subQ1' | 'subQ2' | 'subQ3'
}
