import {forwardRef, useContext, useEffect} from "react"
import {GLTF} from "three-stdlib"
import * as THREE from "three"
import {useGLTF} from "@react-three/drei"
import {AppContext} from "@/components/AppState"
import {useThree} from "@react-three/fiber"

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh
    }
    materials: {
    }
}

type Props = JSX.IntrinsicElements['group']

const HouseModel = forwardRef<THREE.Group, Props>((props: Props, ref) => {
    const { nodes } = useGLTF('/placeholder.glb') as GLTFResult
    const camera = useThree((state) => state.camera)
    const [ appState, setAppState ] = useContext(AppContext)

    useEffect(() => {
        switch (appState.section) {
            case 'ext':
                camera.position.set(0, -2.5, 35)
                break
            case 'map':
                camera.position.set(0, 0, 5)
                break
            case 'vaults':
                camera.position.set(-15, 0, 5)
                break
            case 'quests':
                camera.position.set(12, 0, 5)
                break
            default:
                camera.position.set(0, 0, 5)
        }
    }, [appState.section, camera])

    return <group ref={ref} rotation={[0, Math.PI, 0]} position={[2.5, 0, 0]} {...props} dispose={null}>
        { Object.keys(nodes).map((value, index) =>
            <mesh key={`${value}${index}`} geometry={nodes[value].geometry}>
                <meshStandardMaterial color="grey"/>
            </mesh>) }
    </group>
})
export default HouseModel
HouseModel.displayName = 'HouseModel'
useGLTF.preload('/placeholder.glb')
