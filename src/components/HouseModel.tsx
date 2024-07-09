import React, {forwardRef, useContext, useEffect} from "react"
import {GLTF} from "three-stdlib"
import * as THREE from "three"
import {useGLTF, useTexture} from "@react-three/drei"
import {AppContext} from "@/components/AppState"
import {useThree} from "@react-three/fiber"

type GLTFResult = GLTF & {
    nodes: {
        Safe2Door: THREE.Mesh
        Safe3Door: THREE.Mesh
        Safe1Door: THREE.Mesh
        Safe7Door: THREE.Mesh
        Safe6Door: THREE.Mesh
        Safe5Door: THREE.Mesh
        Safe4Door: THREE.Mesh
        Safe10Door: THREE.Mesh
        Safe9Door: THREE.Mesh
        Safe8Door: THREE.Mesh
        Desk_1: THREE.Mesh
        Desk_2: THREE.Mesh
        Desk_3: THREE.Mesh
        Desk_4: THREE.Mesh
        Desk_5: THREE.Mesh
        Desk_6: THREE.Mesh
        Desk_7: THREE.Mesh
        Desk_8: THREE.Mesh
        Desk_9: THREE.Mesh
        Desk_10: THREE.Mesh
        Desk_11: THREE.Mesh
        Desk_12: THREE.Mesh
        Desk_13: THREE.Mesh
        Desk_14: THREE.Mesh
        Desk_15: THREE.Mesh
        Desk_16: THREE.Mesh
        Desk_17: THREE.Mesh
        Desk_18: THREE.Mesh
        Desk_19: THREE.Mesh
        Vaults: THREE.Mesh
        Cube003: THREE.Mesh
        Cube003_1: THREE.Mesh
        Cube003_2: THREE.Mesh
        Cube003_3: THREE.Mesh
        Cube003_4: THREE.Mesh
        Cube003_5: THREE.Mesh
        Cube003_6: THREE.Mesh
        Cube003_7: THREE.Mesh
        Cube003_8: THREE.Mesh
        Cube003_9: THREE.Mesh
        Cube003_10: THREE.Mesh
        Cube003_11: THREE.Mesh
        Cube003_12: THREE.Mesh
        Cube003_13: THREE.Mesh
        Cube003_14: THREE.Mesh
        Cube003_15: THREE.Mesh
        Cube003_16: THREE.Mesh
        Cube003_17: THREE.Mesh
        Cube003_18: THREE.Mesh
        Cube003_19: THREE.Mesh
        Cube003_20: THREE.Mesh
        Cube003_21: THREE.Mesh
        Cube003_22: THREE.Mesh
        Cube003_23: THREE.Mesh
        Cube003_24: THREE.Mesh
        Cube003_25: THREE.Mesh
        Tekenomics: THREE.Mesh
        Roadmap: THREE.Mesh
        Cube028: THREE.Mesh
        Cube028_1: THREE.Mesh
        Cube028_2: THREE.Mesh
        Cube029: THREE.Mesh
        Cube029_1: THREE.Mesh
        Cube030: THREE.Mesh
        Cube030_1: THREE.Mesh
        Cube030_2: THREE.Mesh
        Cube031: THREE.Mesh
        Cube031_1: THREE.Mesh
        Sidequest_Map: THREE.Mesh
        Cube033: THREE.Mesh
        Cube033_1: THREE.Mesh
        Cube033_2: THREE.Mesh
        Cube034: THREE.Mesh
        Cube034_1: THREE.Mesh
        Safe_Tutorial: THREE.Mesh
        Quest_Tutorial: THREE.Mesh
        Sidequest_Tutorial: THREE.Mesh
        Old_Dusty_Bookshelf: THREE.Mesh
    }
    materials: {}
}

type Props = JSX.IntrinsicElements['group']

const HouseModel = forwardRef<THREE.Group, Props>((props: Props, ref) => {
    const { nodes } = useGLTF('/placeholder.glb') as GLTFResult
    const camera = useThree((state) => state.camera)
    const [ appState, setAppState ] = useContext(AppContext)
    const mapTex = useTexture('/map.png', (loader) => loader.flipY = false)
    const tokTex = useTexture('/TokenomicsTex.webp', (loader) => loader.flipY = false)
    const sqTutorialTex = useTexture('/SQTutorial.webp', (loader) => loader.flipY = false)

    useEffect(() => {
        mapTex.flipY = false
        switch (appState.section) {
            case 'ext':
                camera.position.set(0, -2.5, 30)
                break
            case 'map':
                camera.position.set(0, 0, -5)
                break
            case 'vaults':
                camera.position.set(-13, 0, -5)
                break
            case 'quests':
                camera.position.set(12, 0, -5)
                break
            default:
                camera.position.set(0, 0, 5)
        }
    }, [appState.section, camera])

    return <group ref={ref} rotation={[0, Math.PI, 0]} {...props} dispose={null}>
        <mesh geometry={nodes.Safe2Door.geometry} material={nodes.Safe2Door.material} position={[11.972, -0.687, 11.756]} />
        <mesh geometry={nodes.Safe3Door.geometry} material={nodes.Safe3Door.material} position={[14.881, -0.687, 11.756]} />
        <mesh geometry={nodes.Safe1Door.geometry} material={nodes.Safe1Door.material} position={[9.154, -0.687, 11.756]} />
        <mesh geometry={nodes.Safe7Door.geometry} material={nodes.Safe7Door.material} position={[15.41, 0.885, 11.756]} />
        <mesh geometry={nodes.Safe6Door.geometry} material={nodes.Safe6Door.material} position={[13.449, 0.885, 11.756]} />
        <mesh geometry={nodes.Safe5Door.geometry} material={nodes.Safe5Door.material} position={[11.262, 0.885, 11.756]} />
        <mesh geometry={nodes.Safe4Door.geometry} material={nodes.Safe4Door.material} position={[9.385, 0.885, 11.756]} />
        <mesh geometry={nodes.Safe10Door.geometry} material={nodes.Safe10Door.material} position={[14.387, 2.463, 11.756]} />
        <mesh geometry={nodes.Safe9Door.geometry} material={nodes.Safe9Door.material} position={[12.096, 2.463, 11.756]} />
        <mesh geometry={nodes.Safe8Door.geometry} material={nodes.Safe8Door.material} position={[10.365, 2.463, 11.756]} />
        <group position={[-16.68, -0.553, -0.422]}>
            <mesh geometry={nodes.Desk_1.geometry} material={nodes.Desk_1.material} />
            <mesh geometry={nodes.Desk_2.geometry} material={nodes.Desk_2.material} />
            <mesh geometry={nodes.Desk_3.geometry} material={nodes.Desk_3.material} />
            <mesh geometry={nodes.Desk_4.geometry} material={nodes.Desk_4.material} />
            <mesh geometry={nodes.Desk_5.geometry} material={nodes.Desk_5.material} />
            <mesh geometry={nodes.Desk_6.geometry} material={nodes.Desk_6.material} />
            <mesh geometry={nodes.Desk_7.geometry} material={nodes.Desk_7.material} />
            <mesh geometry={nodes.Desk_8.geometry} material={nodes.Desk_8.material} />
            <mesh geometry={nodes.Desk_9.geometry} material={nodes.Desk_9.material} />
            <mesh geometry={nodes.Desk_10.geometry} material={nodes.Desk_10.material} />
            <mesh geometry={nodes.Desk_11.geometry} material={nodes.Desk_11.material} />
            <mesh geometry={nodes.Desk_12.geometry} material={nodes.Desk_12.material} />
            <mesh geometry={nodes.Desk_13.geometry} material={nodes.Desk_13.material} />
            <mesh geometry={nodes.Desk_14.geometry} material={nodes.Desk_14.material} />
            <mesh geometry={nodes.Desk_15.geometry} material={nodes.Desk_15.material} />
            <mesh geometry={nodes.Desk_16.geometry} material={nodes.Desk_16.material} />
            <mesh geometry={nodes.Desk_17.geometry} material={nodes.Desk_17.material} />
            <mesh geometry={nodes.Desk_18.geometry} material={nodes.Desk_18.material} />
            <mesh geometry={nodes.Desk_19.geometry} material={nodes.Desk_19.material} />
        </group>
        <mesh geometry={nodes.Vaults.geometry} material={nodes.Vaults.material} position={[12.372, 0.996, 11.923]} />
        <group position={[-3.391, 1.553, 4.603]}>
            <mesh geometry={nodes.Cube003.geometry} material={nodes.Cube003.material} />
            <mesh geometry={nodes.Cube003_1.geometry} material={nodes.Cube003_1.material} />
            <mesh geometry={nodes.Cube003_2.geometry} material={nodes.Cube003_2.material} />
            <mesh geometry={nodes.Cube003_3.geometry} material={nodes.Cube003_3.material} />
            <mesh geometry={nodes.Cube003_4.geometry} material={nodes.Cube003_4.material} />
            <mesh geometry={nodes.Cube003_5.geometry} material={nodes.Cube003_5.material} />
            <mesh geometry={nodes.Cube003_6.geometry} material={nodes.Cube003_6.material} />
            <mesh geometry={nodes.Cube003_7.geometry} material={nodes.Cube003_7.material} />
            <mesh geometry={nodes.Cube003_8.geometry} material={nodes.Cube003_8.material} />
            <mesh geometry={nodes.Cube003_9.geometry} material={nodes.Cube003_9.material} />
            <mesh geometry={nodes.Cube003_10.geometry} material={nodes.Cube003_10.material} />
            <mesh geometry={nodes.Cube003_11.geometry} material={nodes.Cube003_11.material} />
            <mesh geometry={nodes.Cube003_12.geometry} material={nodes.Cube003_12.material} />
            <mesh geometry={nodes.Cube003_13.geometry} material={nodes.Cube003_13.material} />
            <mesh geometry={nodes.Cube003_14.geometry} material={nodes.Cube003_14.material} />
            <mesh geometry={nodes.Cube003_15.geometry} material={nodes.Cube003_15.material} />
            <mesh geometry={nodes.Cube003_16.geometry} material={nodes.Cube003_16.material} />
            <mesh geometry={nodes.Cube003_17.geometry} material={nodes.Cube003_17.material} />
            <mesh geometry={nodes.Cube003_18.geometry} material={nodes.Cube003_18.material} />
            <mesh geometry={nodes.Cube003_19.geometry} material={nodes.Cube003_19.material} />
            <mesh geometry={nodes.Cube003_20.geometry} material={nodes.Cube003_20.material} />
            <mesh geometry={nodes.Cube003_21.geometry} material={nodes.Cube003_21.material} />
            <mesh geometry={nodes.Cube003_22.geometry} material={nodes.Cube003_22.material} />
            <mesh geometry={nodes.Cube003_23.geometry} material={nodes.Cube003_23.material} />
            <mesh geometry={nodes.Cube003_24.geometry} material={nodes.Cube003_24.material} />
            <mesh geometry={nodes.Cube003_25.geometry} material={nodes.Cube003_25.material} />
        </group>
        <mesh geometry={nodes.Tekenomics.geometry} position={[4.286, 0.682, 13.263]}>
            <meshStandardMaterial color="white" map={tokTex} />
        </mesh>
        <mesh geometry={nodes.Roadmap.geometry} position={[-3.844, 0.682, 13.263]}>
            <meshStandardMaterial color="white" map={mapTex} />
        </mesh>
        <group position={[8.395, -0.093, 1.205]}>
            <mesh geometry={nodes.Cube028.geometry} material={nodes.Cube028.material} />
            <mesh geometry={nodes.Cube028_1.geometry} material={nodes.Cube028_1.material} />
            <mesh geometry={nodes.Cube028_2.geometry} material={nodes.Cube028_2.material} />
        </group>
        <group position={[8.395, -0.093, 4.425]}>
            <mesh geometry={nodes.Cube029.geometry} material={nodes.Cube029.material} />
            <mesh geometry={nodes.Cube029_1.geometry} material={nodes.Cube029_1.material} />
        </group>
        <group position={[-8.453, -0.093, 8.001]}>
            <mesh geometry={nodes.Cube030.geometry} material={nodes.Cube030.material} />
            <mesh geometry={nodes.Cube030_1.geometry} material={nodes.Cube030_1.material} />
            <mesh geometry={nodes.Cube030_2.geometry} material={nodes.Cube030_2.material} />
        </group>
        <group position={[-8.453, -0.093, 4.781]}>
            <mesh geometry={nodes.Cube031.geometry} material={nodes.Cube031.material} />
            <mesh geometry={nodes.Cube031_1.geometry} material={nodes.Cube031_1.material} />
        </group>
        <mesh geometry={nodes.Sidequest_Map.geometry} position={[-11.917, 0.682, 13.263]}>
            <meshStandardMaterial color="white" map={mapTex} />
        </mesh>
        <group position={[1.559, -0.093, -2.781]}>
            <mesh geometry={nodes.Cube033.geometry} material={nodes.Cube033.material} />
            <mesh geometry={nodes.Cube033_1.geometry} material={nodes.Cube033_1.material} />
            <mesh geometry={nodes.Cube033_2.geometry} material={nodes.Cube033_2.material} />
        </group>
        <group position={[-1.661, -0.093, -2.781]}>
            <mesh geometry={nodes.Cube034.geometry} material={nodes.Cube034.material} />
            <mesh geometry={nodes.Cube034_1.geometry} material={nodes.Cube034_1.material} />
        </group>
        <mesh geometry={nodes.Safe_Tutorial.geometry} position={[17.324, 0.809, 8.201]}>
            <meshStandardMaterial color="white" />
        </mesh>
        <mesh geometry={nodes.Quest_Tutorial.geometry} position={[-12.337, 0.609, -2.567]}>
            <meshStandardMaterial color="white" />
        </mesh>
        <mesh geometry={nodes.Sidequest_Tutorial.geometry} position={[-17.054, 0.694, 9.92]}>
            <meshStandardMaterial color="white" map={sqTutorialTex} />
        </mesh>
        <mesh geometry={nodes.Old_Dusty_Bookshelf.geometry} material={nodes.Old_Dusty_Bookshelf.material} position={[7.3, -2.031, 12.935]} />
    </group>
})
export default HouseModel
HouseModel.displayName = 'HouseModel'
useGLTF.preload('/placeholder.glb')
