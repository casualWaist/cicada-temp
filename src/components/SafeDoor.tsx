/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 ./public/safeDoor.glb -t
*/

import * as THREE from 'three'
import React, {useContext, useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useFrame} from "@react-three/fiber"
import {AppContext} from "@/components/AppState"
import {questString} from "@/components/FileFolder"

type GLTFResult = GLTF & {
    nodes: {
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

export function SafeDoor({available, active, vault, ...props}:
                             SafeProps & JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/safeDoor.glb') as GLTFResult
    const [appState, setAppState] = useContext(AppContext)
    const [correctCode, setCorrectCode] = useState('121212')
    const [code, setCode] = useState('')
    const [submitStatus, setSubmitStatus] = useState(
        'standby' as 'standby' | 'short' | 'success' | 'failure'
    )
    const checkCode = () => {
        if (code === correctCode){
            setSubmitStatus('success')
            setAppState({
                [questString(vault)]: {
                    ...appState[questString(vault)],
                    status: 'started',
                    subQ1: 'started'
                },
                notify: true,
                noteText: `Code Accepted!`,
                noteStyle: 'success'
            })
        } else {
            setSubmitStatus('failure')
            setAppState({
                notify: true,
                noteText: `Code Incorrect!`,
                noteStyle: 'fail'
            })
        }
    }

    useEffect(() => {
        /* fetch code string for specific user and vault number */
    }, [vault])

    useEffect(() => {
        if (submitStatus !== 'standby') setSubmitStatus('standby')
    }, [code])

    return <group {...props} dispose={null}>
        {active && available ? <CodeScreen status={submitStatus}
                              screenMesh={nodes.Screen}
                              code={code}
            />
            : <mesh geometry={nodes.Screen.geometry}
                    position={[-0.293, 0.116, 0.005]}
            >
                <meshBasicMaterial color={
                    appState[questString(vault)].status === 'unavailable' ? 'black' : "white"
                }/>
            </mesh>
        }

        <mesh geometry={nodes.Door_1.geometry} material={nodes.Door_1.material}/>
        <mesh geometry={nodes.Door_2.geometry} material={nodes.Door_2.material}/>
        <mesh geometry={nodes.Door_3.geometry} material={nodes.Door_3.material}/>

        <mesh geometry={nodes.ButtonOne.geometry}
              material={nodes.ButtonOne.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '1')
                  }
              }}
              position={[-0.321, 0.086, 0.008]}
        />

        <mesh geometry={nodes.ButtonTwo.geometry}
              material={nodes.ButtonTwo.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '2')
                  }
              }}
              position={[-0.293, 0.086, 0.008]}
        />

        <mesh geometry={nodes.ButtonThree.geometry}
              material={nodes.ButtonThree.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '3')
                  }
              }}
              position={[-0.265, 0.086, 0.008]}
        />

        <mesh geometry={nodes.ButtonFour.geometry}
              material={nodes.ButtonFour.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '4')
                  }
              }}
              position={[-0.321, 0.058, 0.008]}
        />

        <mesh geometry={nodes.ButtonFive.geometry}
              material={nodes.ButtonFive.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '5')
                  }
              }}
              position={[-0.293, 0.058, 0.008]}
        />

        <mesh geometry={nodes.ButtonSix.geometry}
              material={nodes.ButtonSix.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '6')
                  }
              }}
              position={[-0.265, 0.058, 0.008]}
        />

        <mesh geometry={nodes.ButtonSeven.geometry}
              material={nodes.ButtonSeven.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '7')
                  }
              }}
              position={[-0.321, 0.03, 0.008]}
        />

        <mesh geometry={nodes.ButtonEight.geometry}
              material={nodes.ButtonEight.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '8')
                  }
              }}
              position={[-0.293, 0.03, 0.008]}
        />

        <mesh geometry={nodes.ButtonNine.geometry}
              material={nodes.ButtonNine.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '9')
                  }
              }}
              position={[-0.265, 0.03, 0.008]}
        />

        <mesh geometry={nodes.ButtonZero.geometry}
              material={nodes.ButtonZero.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length < 6) {
                      setCode(code + '0')
                  }
              }}
              position={[-0.293, 0.002, 0.008]}
        />

        <mesh geometry={nodes.ButtonStar.geometry}
              material={nodes.ButtonStar.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (code.length > 0) {
                      setCode(code.slice(0, -1))
                  }
              }}
              position={[-0.321, 0.002, 0.008]}
        />

        <mesh geometry={nodes.ButtonHash.geometry}
              material={nodes.ButtonHash.material}
              onClick={(event) => {
                  event.stopPropagation()
                  if (available && code.length === 6) {
                      checkCode()
                  } else {
                      setSubmitStatus('short')
                  }
              }}
              position={[-0.265, 0.002, 0.008]}
        />

        <mesh geometry={nodes.Lock.geometry}
              material={nodes.Lock.material}
              position={[-0.443, 0.061, 0.012]}
        />

        { props.children }

    </group>
}

useGLTF.preload('/safeDoor.glb')

function CodeScreen({screenMesh, code, status}:
                        {
                            screenMesh: THREE.Mesh,
                            code: string,
                            status: 'standby' | 'short' | 'success' | 'failure',
                        }) {
    const offscreenCanvas = useRef(document.createElement('canvas'))
    const screenTexture = useRef(new THREE.CanvasTexture(offscreenCanvas.current))

    useEffect(() => {
        const ctx = offscreenCanvas.current.getContext('2d')!
        let fillColor = 'white'
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
              material={screenMesh.material}
              position={[-0.293, 0.116, 0.005]}
        />
        <mesh position={[-0.293, 0.116, 0.006]}>
        <planeGeometry args={[0.09, 0.025]}/>
            <meshBasicMaterial map={screenTexture.current} transparent opacity={0.5} />
        </mesh>
    </>

}
