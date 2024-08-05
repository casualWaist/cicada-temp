import * as THREE from 'three'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import {FileFolder, questString} from "@/components/FileFolder"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {GLTF} from 'three-stdlib'
import {AppContext, AxiosContext} from "@/components/AppState"
import {useNotification} from "@/hooks/useNotification";

type GLTFResult = GLTF & {
    nodes: {
        Body: THREE.Mesh
        Door_1: THREE.Mesh
        Door_2: THREE.Mesh
        Door_3: THREE.Mesh
        ButtonEight: THREE.Mesh
        ButtonFive: THREE.Mesh
        ButtonFour: THREE.Mesh
        ButtonHash: THREE.Mesh
        ButtonNine: THREE.Mesh
        ButtonOne: THREE.Mesh
        ButtonSeven: THREE.Mesh
        ButtonSix: THREE.Mesh
        ButtonStar: THREE.Mesh
        ButtonThree: THREE.Mesh
        ButtonTwo: THREE.Mesh
        ButtonZero: THREE.Mesh
        Lock: THREE.Mesh
        Screen: THREE.Mesh
    }
    materials: {}
}

type SafeProps = {
    available: boolean
    active: boolean
    vault: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export function SafeDoor({available, active, vault, ...props}: SafeProps & JSX.IntrinsicElements['group']) {
    const {nodes, materials} = useGLTF('/safeFull.glb') as GLTFResult;
    const [appState, setAppState] = useContext(AppContext);
    const [correctCode, setCorrectCode] = useState('121212');
    const [code, setCode] = useState('');
    const qString = questString(vault);
    const axios = useContext(AxiosContext);
    const notify = useNotification();

    const [submitStatus, setSubmitStatus] = useState(
        'standby' as 'standby' | 'short' | 'success' | 'failure'
    )
    const [keyPressed, setKeyPressed] = useState(
        'none' as 'none' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '*' | '#'
    )
    const doorRef = useRef<THREE.Group>(null!)
    const lockRef = useRef<THREE.Mesh>(null!)
    const folderRef = useRef<THREE.Group>(null!)
    const key1Ref = useRef<THREE.Mesh>(null!)
    const key2Ref = useRef<THREE.Mesh>(null!)
    const key3Ref = useRef<THREE.Mesh>(null!)
    const key4Ref = useRef<THREE.Mesh>(null!)
    const key5Ref = useRef<THREE.Mesh>(null!)
    const key6Ref = useRef<THREE.Mesh>(null!)
    const key7Ref = useRef<THREE.Mesh>(null!)
    const key8Ref = useRef<THREE.Mesh>(null!)
    const key9Ref = useRef<THREE.Mesh>(null!)
    const key0Ref = useRef<THREE.Mesh>(null!)
    const keyStarRef = useRef<THREE.Mesh>(null!)
    const keyHashRef = useRef<THREE.Mesh>(null!)
    const tlRef = useRef(gsap.timeline())

    const keypadTex = useTexture(
        '/KeypadTexture.webp',
        (loader) => {
            loader.flipY = false
        }
    );
    const keyPadMaterial = useMemo(() => new THREE.MeshStandardMaterial({
            map: keypadTex,
            emissive: "white",
            emissiveIntensity: 0.1,
            emissiveMap: keypadTex,
        }), [keypadTex]);
    const keypadMetalTex = useTexture('/SafeBaseColor.webp');
    const keypadMetalRoughness = useTexture('/SafeRoughness.webp');
    const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
            map: keypadMetalTex,
            roughnessMap: keypadMetalRoughness,
            metalness: 0.5,
        }), [keypadMetalTex]);
    const safeNormal = useTexture('/SafeNormal.webp', (loader) => {
            loader.flipY = false
            loader.wrapS = loader.wrapT = THREE.RepeatWrapping
        });
    const safeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
            normalMap: safeNormal,
            roughness: 0.5,
            normalScale: new THREE.Vector2(2, 2),
            metalness: 0.5,
            emissive: '#444',
            emissiveIntensity: 0.1,
            color: "#656565",
            side: THREE.DoubleSide
        }),
        [safeNormal]
    )

    useGSAP(() => {
        if (tlRef.current) tlRef.current.kill()
        const tl = gsap.timeline()
        switch (keyPressed) {
            case "#":
                tl.to(keyHashRef.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(keyHashRef.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "*":
                tl.to(keyStarRef.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(keyStarRef.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "1":
                tl.to(key1Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key1Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "2":
                tl.to(key2Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key2Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "3":
                tl.to(key3Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key3Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "4":
                tl.to(key4Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key4Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "5":
                tl.to(key5Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key5Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "6":
                tl.to(key6Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key6Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "7":
                tl.to(key7Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key7Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "8":
                tl.to(key8Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key8Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "9":
                tl.to(key9Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key9Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
            case "0":
                tl.to(key0Ref.current.position, {
                    z: 0,
                    duration: 0.1
                }).to(key0Ref.current.position, {
                    z: 0.008,
                    duration: 0.1
                }).call(() => setKeyPressed('none'))
                break
        }
        tlRef.current = tl
        return () => {
            if (tlRef.current) tlRef.current.kill()
        }
    }, [keyPressed])

    const checkCode = async () => {
        try {
            const response = await axios.post('/vault/check_code', {code, vault});
            if (Boolean(!!response.data.status)) {
                setSubmitStatus('success')
                setAppState({[qString]: {
                    ...appState[qString],
                    status: 'started',
                    subQ1: 'started'
                }})
            }
            notify("success", `Code Accepted!\nCheck the Desk for the next Quest.`);
            let questData = await axios.get("/quest/get_quest_status");
            setAppState({...questData.data});
        } catch (err: any) {
            setSubmitStatus('failure');
            notify("fail", "Code Incorrect");
        }
    }

    useEffect(() => {
        /* fetch code string for specific user and vault number */
    }, [vault])

    useEffect(() => {
        if (submitStatus !== 'standby') setSubmitStatus('standby')
    }, [code])

    useGSAP(() => {
        if (submitStatus === 'success' || appState[qString].status === 'started') {
            gsap.to(lockRef.current.rotation, {
                z: Math.PI * 0.5,
                duration: 1,
                ease: 'power2.out'
            })
            gsap.to(doorRef.current.rotation,
                {
                    y: Math.PI * 0.8,
                    duration: 3,
                    delay: 1.25,
                    ease: 'power2.out'
                })
        }
        if (folderRef.current) {
            gsap.to(folderRef.current.position,
                {
                    y: 0.5,
                    z: 1.25,
                    duration: 3,
                    delay: 1.75,
                    ease: 'power2.out'
                })
            gsap.to(folderRef.current.rotation,{
                x: Math.PI,
                duration: 3,
                delay: 1.75,
                ease: 'power2.out',
                onComplete: () => {folderRef.current!.visible = false}
            })
        }
    }, [submitStatus, appState[qString].status])

    return <group {...props} dispose={null}>
        { submitStatus === 'success' &&
            <FileFolder active={false}
                        ref={folderRef}
                        position={[0, -0.25, 0]}
                        restPosition={new THREE.Vector3(0, -0.25, 0)}
                        open={false}
                        quest={vault}
                        activateFunc={() => {}}
                        openFunc={() => {}}
                        closeFunc={() => {}}/> }
        <mesh geometry={nodes.Body.geometry} material={safeMaterial}>
            <group position={[0.293, 0, 0.295]}
                   ref={doorRef}
                   rotation={['started', 'completed'].includes(appState[qString].status)
                       && submitStatus === 'standby'
                       ? [0, Math.PI * 0.8, 0]
                       : [0, 0, 0]}>
                {active && available ?
                    <CodeScreen status={submitStatus}
                                material={keyPadMaterial}
                                screenMesh={nodes.Screen}
                                code={code}
                    />
                    : <mesh geometry={nodes.Screen.geometry}
                            position={[-0.293, 0.116, 0.005]}
                    >
                        <meshBasicMaterial color={
                            appState[qString].status === 'unavailable' ? 'black' : "white"
                        }/>
                    </mesh>
                }

                <mesh geometry={nodes.Door_1.geometry} material={safeMaterial}/>
                <mesh geometry={nodes.Door_2.geometry} material={metalMaterial}/>
                <mesh geometry={nodes.Door_3.geometry} material={metalMaterial}/>

                <mesh geometry={nodes.ButtonOne.geometry}
                      ref={key1Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '1')
                          }
                          setKeyPressed('1')
                      }}
                      position={[-0.321, 0.086, 0.008]}
                />

                <mesh geometry={nodes.ButtonTwo.geometry}
                      ref={key2Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '2')
                          }
                          setKeyPressed('2')
                      }}
                      position={[-0.293, 0.086, 0.008]}
                />

                <mesh geometry={nodes.ButtonThree.geometry}
                      ref={key3Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '3')
                          }
                          setKeyPressed('3')
                      }}
                      position={[-0.265, 0.086, 0.008]}
                />

                <mesh geometry={nodes.ButtonFour.geometry}
                        ref={key4Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '4')
                          }
                          setKeyPressed('4')
                      }}
                      position={[-0.321, 0.058, 0.008]}
                />

                <mesh geometry={nodes.ButtonFive.geometry}
                        ref={key5Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '5')
                          }
                          setKeyPressed('5')
                      }}
                      position={[-0.293, 0.058, 0.008]}
                />

                <mesh geometry={nodes.ButtonSix.geometry}
                        ref={key6Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '6')
                          }
                          setKeyPressed('6')
                      }}
                      position={[-0.265, 0.058, 0.008]}
                />

                <mesh geometry={nodes.ButtonSeven.geometry}
                        ref={key7Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '7')
                          }
                          setKeyPressed('7')
                      }}
                      position={[-0.321, 0.03, 0.008]}
                />

                <mesh geometry={nodes.ButtonEight.geometry}
                        ref={key8Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '8')
                          }
                          setKeyPressed('8')
                      }}
                      position={[-0.293, 0.03, 0.008]}
                />

                <mesh geometry={nodes.ButtonNine.geometry}
                        ref={key9Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '9')
                          }
                          setKeyPressed('9')
                      }}
                      position={[-0.265, 0.03, 0.008]}
                />

                <mesh geometry={nodes.ButtonZero.geometry}
                        ref={key0Ref}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length < 6) {
                              setCode(code + '0')
                          }
                          setKeyPressed('0')
                      }}
                      position={[-0.293, 0.002, 0.008]}
                />

                <mesh geometry={nodes.ButtonStar.geometry}
                        ref={keyStarRef}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (code.length > 0) {
                              setCode(code.slice(0, -1))
                          }
                          setKeyPressed('*')
                      }}
                      position={[-0.321, 0.002, 0.008]}
                />

                <mesh geometry={nodes.ButtonHash.geometry}
                        ref={keyHashRef}
                      material={keyPadMaterial}
                      onClick={(event) => {
                          event.stopPropagation()
                          if (appState.walletConnected){
                              if (available && code.length === 6) {
                                  checkCode()
                              } else {
                                  setSubmitStatus('short')
                              }
                          } else {
                              setAppState({
                                  notify: true,
                                  noteText: "Wallet not connected",
                                  noteStyle: "alert"
                              })
                          }
                          setKeyPressed('#')
                      }}
                      position={[-0.265, 0.002, 0.008]}
                />

                <mesh geometry={nodes.Lock.geometry}
                      ref={lockRef}
                      material={metalMaterial}
                      position={[-0.443, 0.061, 0.012]}
                />

                {props.children}
            </group>
        </mesh>
    </group>
}

useGLTF.preload('/safeFull.glb')
useGLTF.preload('/safeFull.glb')
useTexture.preload('/paperNormal512.webp')

function CodeScreen({screenMesh, material, code, status}:
                        {
                            screenMesh: THREE.Mesh,
                            material: THREE.MeshStandardMaterial,
                            code: string,
                            status: 'standby' | 'short' | 'success' | 'failure',
                        }) {
    const offscreenCanvas = useRef(document.createElement('canvas'))
    const screenTexture = useRef(new THREE.CanvasTexture(offscreenCanvas.current))

    useEffect(() => {
        const ctx = offscreenCanvas.current.getContext('2d')!
        let fillColor = '#919191'
        switch (status) {
            case 'short':
                fillColor = 'yellow'
                break
            case 'success':
                fillColor = 'green'
                break
            case 'failure':
                fillColor = 'red'
        }
        ctx.fillStyle = fillColor
        ctx.fillRect(0, 0, 300, 150)
        ctx.fillStyle = 'black'
        ctx.font = '70px Arial'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(code, 150, 95)
        screenTexture.current.needsUpdate = true
    }, [code, status])

    return <>
        <mesh geometry={screenMesh.geometry}
              material={material}
              position={[-0.293, 0.116, 0.005]}
        />
        <mesh position={[-0.293, 0.116, 0.006]}>
            <planeGeometry args={[0.09, 0.025]}/>
            <meshBasicMaterial map={screenTexture.current}
                               transparent
                               blending={THREE.AdditiveBlending}
                               opacity={0.25}/>
        </mesh>
    </>

}
