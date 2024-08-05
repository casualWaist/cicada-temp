import * as THREE from 'three'
import React, {useMemo, useRef} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import gsap from "gsap"
import {useGSAP} from "@gsap/react"

type GLTFResult = GLTF & {
    nodes: {
        String: THREE.Mesh
        Base: THREE.Mesh
        Cover: THREE.Mesh
        DirectionNeedle: THREE.Mesh
    }
    materials: {}
}

export function Compass({chanceStatus, needleRotation = 0, ...props}:
    {chanceStatus: 'standby' | 'spinning' | 'won', needleRotation: number}
    & JSX.IntrinsicElements['group']
) {
    const { nodes, materials } = useGLTF('/compassFinal.glb') as GLTFResult
    const texture = useTexture(
        '/Compass1K.webp',
        (loader) => loader.flipY = false
    )
    const normalTex = useTexture(
        '/CompassNormal1K.webp',
        (loader) => loader.flipY = false
    )
    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            map: texture,
            normalMap: normalTex,
            roughness: 0.15,
            metalness: 0.5,
        })
    }, [texture])
    const coverRef = useRef<THREE.Mesh>(null!)
    const spinnerRef = useRef<THREE.Mesh>(null!)

    useGSAP(() => {
        if (chanceStatus === 'spinning') {
            gsap.to(coverRef.current.rotation, {x: Math.PI * 0.6, duration: 1})
        } else {
            gsap.to(coverRef.current.rotation, {x: 0, duration: 1})
        }
    }, [chanceStatus])

    useGSAP(() => {
        gsap.to(spinnerRef.current.rotation, {
            z: needleRotation,
            duration: needleRotation === 0 ? 0.5 : 4,
            ease: 'power4.out',
        })
    }, [needleRotation])

    return <group {...props} rotation={[0, Math.PI * 0.5, 0]} dispose={null}>
        <mesh geometry={nodes.String.geometry}
              position={[0, 0.479, -0.004]}>
            <mesh geometry={nodes.Base.geometry}
                  material={material}
                  position={[0, -0.48, -0.01]}>
                <mesh geometry={nodes.Cover.geometry}
                      ref={coverRef}
                      material={material}
                      position={[0, -0.043, 0.016]}/>
                <mesh geometry={nodes.DirectionNeedle.geometry}
                      ref={spinnerRef}
                      material={material}/>
            </mesh>
            <meshBasicMaterial color={'#000'}/>
        </mesh>
    </group>
}

useGLTF.preload('/compassFinal.glb')
