import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    FolderBack: THREE.Mesh
    FolderFront: THREE.Mesh
    Page: THREE.Mesh
  }
  materials: {}
}

export function FileFolder(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/fileFolder.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.FolderBack.geometry} material={nodes.FolderBack.material}>
        <mesh geometry={nodes.FolderFront.geometry} material={nodes.FolderFront.material} position={[-0.115, 0.002, 0]} />
        <mesh geometry={nodes.Page.geometry} material={nodes.Page.material} position={[0, 0.001, 0]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/fileFolder.glb')
