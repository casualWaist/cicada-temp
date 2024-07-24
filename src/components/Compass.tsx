import * as THREE from 'three'
import React, {useMemo} from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
      Base: THREE.Mesh
      Cover: THREE.Mesh
      DirectionNeedle: THREE.Mesh
    }
    materials: {}
}

export function Compass({open, ...props}:
                            {open: boolean} & JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/compass.glb') as GLTFResult
    const texture = useTexture(
        '/Compass.webp',
(loader) => loader.flipY = false
    )
    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.15,
        })
    }, [texture])

    return <group {...props} scale={0.015} rotation={[0, -Math.PI * 0.5, Math.PI * 0.5]} dispose={null}>
        <mesh geometry={nodes.Base.geometry} material={material} />
        <mesh geometry={nodes.Cover.geometry}
              material={material}
              rotation={open ? [0, Math.PI * 0.6, 0] : [0, 0, 0]}
              position={[-4.329, 0, -1.631]}
        />
        <mesh geometry={nodes.DirectionNeedle.geometry} material={material} />
    </group>
}

useGLTF.preload('/compass.glb')
