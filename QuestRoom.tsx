/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 ./public/questRoom.glb -t
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/questRoom.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Backdrop.geometry} material={nodes.Backdrop.material} position={[4.027, 0, -3.898]} rotation={[Math.PI / 2, 0, 1]} />
      <mesh geometry={nodes.Bookcase.geometry} material={nodes.Bookcase.material} position={[-2.874, 0.155, -3.649]} rotation={[0, -1.571, 0]} scale={[0.421, 0.39, 0.26]} />
      <mesh geometry={nodes.BoxShortStack1.geometry} material={nodes.BoxShortStack1.material} position={[-2.137, -0.441, -3.602]} rotation={[0, 0, Math.PI]} />
      <mesh geometry={nodes.BoxShortStack4.geometry} material={nodes.BoxShortStack4.material} position={[-0.841, -0.441, -3.602]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh geometry={nodes.BoxesBehindMap.geometry} material={nodes.BoxesBehindMap.material} position={[-3.297, -1, -2.909]} />
      <mesh geometry={nodes.BoxTopOfFiles.geometry} material={nodes.BoxTopOfFiles.material} position={[0.319, 0.62, -3.783]} rotation={[0, 1.571, 0]} />
      <group position={[-2.819, 0.978, -3.564]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.booksFacade_1.geometry} material={nodes.booksFacade_1.material} />
        <mesh geometry={nodes.booksFacade_2.geometry} material={nodes.booksFacade_2.material} />
      </group>
      <mesh geometry={nodes.SidequestsMap.geometry} material={nodes.SidequestsMap.material} position={[-2.888, 0.305, -2.544]} rotation={[Math.PI / 2, 0, -1.528]} />
      <mesh geometry={nodes.SideQuestTutorial.geometry} material={nodes.SideQuestTutorial.material} position={[-1.422, 0.26, -3.976]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.PaperBoxLeft.geometry} material={nodes.PaperBoxLeft.material} position={[-3.309, 0.848, -2.119]} rotation={[0, 0.047, 0]} />
      <mesh geometry={nodes.PaperBoxRight.geometry} material={nodes.PaperBoxRight.material} position={[-3.152, 0.848, -2.682]} rotation={[-Math.PI, 1.524, -Math.PI]} />
      <mesh geometry={nodes.SmallCabinet.geometry} material={nodes.SmallCabinet.material} position={[0.242, -1, -3.753]} />
      <mesh geometry={nodes.BoxUnderTutBottom.geometry} material={nodes.BoxUnderTutBottom.material} position={[2.801, -0.999, 0.217]} />
      <mesh geometry={nodes.BoxUnderTutTop.geometry} material={nodes.BoxUnderTutTop.material} position={[2.801, -0.659, 0.211]} rotation={[Math.PI, 0, Math.PI]} />
      <group position={[3.02, 1.24, -0.479]} rotation={[0, 0, Math.PI / 2]}>
        <mesh geometry={nodes.WallLamp_1.geometry} material={nodes.WallLamp_1.material} />
        <mesh geometry={nodes.WallLamp_2.geometry} material={nodes.WallLamp_2.material} />
      </group>
      <group position={[2.613, -0.322, 0.253]} rotation={[0, -1.571, 0]}>
        <mesh geometry={nodes.Encyclopedias_1.geometry} material={nodes.Encyclopedias_1.material} />
        <mesh geometry={nodes.Encyclopedias_2.geometry} material={nodes.Encyclopedias_2.material} />
      </group>
      <mesh geometry={nodes.FileCabinetsLeft.geometry} material={nodes.FileCabinetsLeft.material} position={[1.01, -1, -3.688]} rotation={[0, -0.526, 0]} />
      <mesh geometry={nodes.FileCabinetsMiddleLeft.geometry} material={nodes.FileCabinetsMiddleLeft.material} position={[1.465, -1, -3.29]} rotation={[0, -1.058, 0]} />
      <mesh geometry={nodes.FileCabinetsMiddleRight.geometry} material={nodes.FileCabinetsMiddleRight.material} position={[2.375, -1, -1.675]} rotation={[0, -1.058, 0]} />
      <group position={[2.592, -1, -1.3]} rotation={[0, -0.947, 0]}>
        <mesh geometry={nodes.FileCabinetsRight_1.geometry} material={nodes.FileCabinetsRight_1.material} />
        <mesh geometry={nodes.FileCabinetsRight_2.geometry} material={nodes.FileCabinetsRight_2.material} />
      </group>
      <mesh geometry={nodes.NewspaperLeft.geometry} material={nodes.NewspaperLeft.material} position={[1.522, -0.195, -2.669]} rotation={[Math.PI / 2, 0, 0.984]} />
      <mesh geometry={nodes.NewspaperRight.geometry} material={nodes.NewspaperRight.material} position={[1.901, -0.195, -2.1]} rotation={[Math.PI / 2, 0, 0.984]} />
      <mesh geometry={nodes.NewspaperStack.geometry} material={nodes.NewspaperStack.material} position={[2.389, 0.371, -1.217]} rotation={[0.059, -0.497, 0.019]} />
      <group position={[2.89, -0.929, 0.282]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.RowOfBooks_1.geometry} material={nodes.RowOfBooks_1.material} />
        <mesh geometry={nodes.RowOfBooks_2.geometry} material={nodes.RowOfBooks_2.material} />
      </group>
      <group position={[2.896, -1, -0.602]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.Radiator_1.geometry} material={nodes.Radiator_1.material} />
        <mesh geometry={nodes.Radiator_2.geometry} material={nodes.Radiator_2.material} />
      </group>
      <mesh geometry={nodes.LargeStackOfNewspapers.geometry} material={nodes.LargeStackOfNewspapers.material} position={[1.522, -0.195, -2.669]} rotation={[0, -1.016, 0]} />
      <mesh geometry={nodes.NewspaperStrings.geometry} material={nodes.NewspaperStrings.material} position={[2.366, 0.488, -1.392]} rotation={[0.059, -0.497, 0.019]} />
      <group position={[0.73, -1.005, -0.212]} rotation={[0, -0.977, 0]}>
        <mesh geometry={nodes.Desk.geometry} material={nodes.Desk.material} />
        <mesh geometry={nodes.Desk_1.geometry} material={nodes.Desk_1.material} />
      </group>
      <mesh geometry={nodes.globe.geometry} material={nodes.globe.material} position={[1.535, -0.22, 0.532]} rotation={[-Math.PI, -1.464, -2.752]} scale={0.212} />
      <group position={[0.743, 0.488, -1.451]} rotation={[0, -0.631, 0]}>
        <mesh geometry={nodes.Cylinder008.geometry} material={nodes.Cylinder008.material} />
        <mesh geometry={nodes.Cylinder008_1.geometry} material={nodes.Cylinder008_1.material} />
        <mesh geometry={nodes.Cylinder008_2.geometry} material={nodes.Cylinder008_2.material} />
        <mesh geometry={nodes.Cylinder008_3.geometry} material={nodes.Cylinder008_3.material} />
        <mesh geometry={nodes.Cylinder008_4.geometry} material={nodes.Cylinder008_4.material} />
      </group>
      <mesh geometry={nodes.DeskLamp.geometry} material={nodes.DeskLamp.material} position={[1.13, -0.111, -0.112]} rotation={[0, -0.305, 0]} />
      <mesh geometry={nodes.DeskLampNear.geometry} material={nodes.DeskLampNear.material} position={[0.055, -0.116, -1.422]} rotation={[0, -1.556, 0]} />
      <mesh geometry={nodes.CharlieScraps.geometry} material={nodes.CharlieScraps.material} position={[0.644, 0.488, -1.519]} rotation={[Math.PI / 2, 0, 0.631]} scale={0.008} />
      <group position={[1.17, -0.113, 0.248]}>
        <mesh geometry={nodes.ashTray_1.geometry} material={nodes.ashTray_1.material} />
        <mesh geometry={nodes.ashTray_2.geometry} material={nodes.ashTray_2.material} />
      </group>
      <group position={[0.396, -0.11, -0.363]} rotation={[-0.087, 0.431, 0.046]}>
        <mesh geometry={nodes.Glasses_1.geometry} material={nodes.Glasses_1.material} />
        <mesh geometry={nodes.Glasses_2.geometry} material={nodes.Glasses_2.material} />
        <mesh geometry={nodes.Glasses_3.geometry} material={nodes.Glasses_3.material} />
      </group>
      <group position={[0.41, -0.114, -0.378]} rotation={[0, -0.729, 0]}>
        <mesh geometry={nodes.OpenBook_1.geometry} material={nodes.OpenBook_1.material} />
        <mesh geometry={nodes.OpenBook_2.geometry} material={nodes.OpenBook_2.material} />
        <mesh geometry={nodes.OpenBook_3.geometry} material={nodes.OpenBook_3.material} />
      </group>
      <mesh geometry={nodes.LeatherBookBack.geometry} material={nodes.LeatherBookBack.material} position={[0.393, -0.08, -1.188]} rotation={[Math.PI, 0, Math.PI / 2]} />
      <mesh geometry={nodes.LeatherBookFront.geometry} material={nodes.LeatherBookFront.material} position={[0.307, -0.08, -1.051]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.WrappedLeatherBook.geometry} material={nodes.WrappedLeatherBook.material} position={[0.264, -0.102, -0.826]} rotation={[0, 0, -1.58]} />
      <mesh geometry={nodes.TheSecretWarning.geometry} material={nodes.TheSecretWarning.material} position={[0.487, -0.076, -0.822]} rotation={[-Math.PI / 2, 0, 1.401]} />
      <group position={[0.343, -0.01, -1.278]} rotation={[Math.PI / 2, 0, -0.281]} scale={0.823}>
        <mesh geometry={nodes.OldLeatherBook_1.geometry} material={nodes.OldLeatherBook_1.material} />
        <mesh geometry={nodes.OldLeatherBook_2.geometry} material={nodes.OldLeatherBook_2.material} />
      </group>
      <mesh geometry={nodes.Magnifier001.geometry} material={nodes.Magnifier001.material} position={[0.508, -0.12, -0.709]} rotation={[0, -0.852, 0]} />
      <group position={[0.006, 0.061, -1.296]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.Typewriter_1.geometry} material={nodes.Typewriter_1.material} />
        <mesh geometry={nodes.Typewriter_2.geometry} material={nodes.Typewriter_2.material} />
        <mesh geometry={nodes.Typewriter_3.geometry} material={nodes.Typewriter_3.material} />
        <mesh geometry={nodes.Typewriter_4.geometry} material={nodes.Typewriter_4.material} />
        <mesh geometry={nodes.Typewriter_5.geometry} material={nodes.Typewriter_5.material} />
        <mesh geometry={nodes.Typewriter_6.geometry} material={nodes.Typewriter_6.material} />
        <mesh geometry={nodes.Typewriter_7.geometry} material={nodes.Typewriter_7.material} />
      </group>
      <mesh geometry={nodes.EnvolopeStack.geometry} material={nodes.EnvolopeStack.material} position={[-0.211, -0.116, -1.194]} rotation={[0, -1.558, 0]} />
      <mesh geometry={nodes.EnvolopeTop.geometry} material={nodes.EnvolopeTop.material} position={[-0.213, -0.06, -1.213]} rotation={[0, 1.509, -Math.PI]} />
      <group position={[0.186, -0.116, -0.759]}>
        <mesh geometry={nodes.DateBook_1.geometry} material={nodes.DateBook_1.material} />
        <mesh geometry={nodes.DateBook_2.geometry} material={nodes.DateBook_2.material} />
        <mesh geometry={nodes.DateBook_3.geometry} material={nodes.DateBook_3.material} />
        <mesh geometry={nodes.DateBook_4.geometry} material={nodes.DateBook_4.material} />
      </group>
      <group position={[0.255, -0.102, -0.709]}>
        <mesh geometry={nodes.Pen_1.geometry} material={nodes.Pen_1.material} />
        <mesh geometry={nodes.Pen_2.geometry} material={nodes.Pen_2.material} />
      </group>
      <mesh geometry={nodes.GoldCoins.geometry} material={nodes.GoldCoins.material} position={[0.582, -0.118, -0.916]} />
      <mesh geometry={nodes.DeskBlotter.geometry} material={nodes.DeskBlotter.material} position={[0.804, -0.113, -0.045]} rotation={[0, -0.984, 0]} />
      <mesh geometry={nodes.StackOfPaper.geometry} material={nodes.StackOfPaper.material} position={[0.748, -0.113, -0.545]} />
      <group position={[0.021, -1.003, -0.081]} rotation={[0, -1.323, 0]}>
        <mesh geometry={nodes.Chair_1.geometry} material={nodes.Chair_1.material} />
        <mesh geometry={nodes.Chair_2.geometry} material={nodes.Chair_2.material} />
        <mesh geometry={nodes.Chair_3.geometry} material={nodes.Chair_3.material} />
        <mesh geometry={nodes.Chair_4.geometry} material={nodes.Chair_4.material} />
      </group>
      <mesh geometry={nodes.Room_1.geometry} material={nodes.Room_1.material} />
      <mesh geometry={nodes.Room_2.geometry} material={nodes.Room_2.material} />
    </group>
  )
}

useGLTF.preload('/questRoom.glb')