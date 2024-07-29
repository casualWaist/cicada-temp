import * as THREE from 'three'
import React, {useMemo} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        String: THREE.Mesh
        Base: THREE.Mesh
        Cover: THREE.Mesh
        DirectionNeedle: THREE.Mesh
    }
    materials: {}
}

export function Compass({open, ...props}:
                            {open: boolean} & JSX.IntrinsicElements['group']) {
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

    return <group {...props} rotation={[0, Math.PI * 0.5, 0]} dispose={null}>
        <mesh geometry={nodes.String.geometry}
              position={[0, 0.479, -0.004]}>
            <mesh geometry={nodes.Base.geometry} material={material} position={[0, -0.48, -0.01]}>
                <mesh geometry={nodes.Cover.geometry}
                      material={material}
                      rotation={open ? [Math.PI * 0.6, 0, 0] : [0, 0, 0]}
                      position={[0, -0.043, 0.016]}/>
                <mesh geometry={nodes.DirectionNeedle.geometry} material={material}/>
            </mesh>
            <meshBasicMaterial color={'#000'} />
        </mesh>
    </group>
}

useGLTF.preload('/compassFinal.glb')
