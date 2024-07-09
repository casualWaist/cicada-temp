import {forwardRef, useContext, useEffect, useRef, useState} from "react"
import {GLTF} from "three-stdlib"
import * as THREE from "three"
import {useGLTF, useTexture} from "@react-three/drei"
import {AppContext} from "@/components/AppState"
import {useThree} from "@react-three/fiber"
import {PerspectiveCamera} from "three"

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
        Cube: THREE.Mesh
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
    const camera = useThree((state) => state.camera as PerspectiveCamera)
    const [ appState, setAppState ] = useContext(AppContext)

    useEffect(() => {
        camera.fov = 45
        camera.updateProjectionMatrix()
    }, [camera])

    return <group ref={ref} rotation={[0, Math.PI, 0]} {...props} dispose={null}>
        { appState.section === 'map' ? <MapRoom nodes={nodes}/> : null }
        { appState.section === 'vaults' ? <VaultRoom nodes={nodes}/> : null }
        { appState.section === 'quests' ? <QuestRoom nodes={nodes}/> : null}
        <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material}/>
        <mesh geometry={nodes.Old_Dusty_Bookshelf.geometry} material={nodes.Old_Dusty_Bookshelf.material}
              position={[7.3, -2.031, 12.935]}/>
    </group>
})
export default HouseModel
HouseModel.displayName = 'HouseModel'
useGLTF.preload('/placeholder.glb')

function MapRoom({nodes}: {nodes: GLTFResult['nodes']}) {
    const camera = useThree((state) => state.camera as PerspectiveCamera)
    const [appState, setAppState] = useContext(AppContext)
    const [leftDoorHover, setLeftDoorHover] = useState(false)
    const [rightDoorHover, setRightDoorHover] = useState(false)
    const [place, setPlace] = useState('home' as 'home' | 'tok' | 'map')
    const mapTex = useTexture('/map.png', (loader) => loader.flipY = false)
    const tokTex = useTexture('/TokenomicsTex.webp', (loader) => loader.flipY = false)

    useEffect(() => {
        switch (place) {
            case 'home':
                camera.position.set(0, 0, 10)
                camera.rotation.set(0, 0, 0)
                break
            case 'tok':
                camera.position.set(-4, 0, -7)
                camera.rotation.set(0, 0, 0)
                break
            case 'map':
                camera.position.set(4, 0, -7)
                camera.rotation.set(0, 0, 0)
        }
    }, [place, camera])

    return <>
        <group position={[9.537, -0.093, 5.567]}
               onPointerOver={() => setLeftDoorHover(true)}
               onPointerOut={() => setLeftDoorHover(false)}
               onClick={() => setAppState({section: 'vaults'})}
               rotation={leftDoorHover ? [0, -Math.PI * 0.5, 0] : [0, 0, 0]}>
            <mesh geometry={nodes.Cube028.geometry} material={nodes.Cube028.material}/>
            <mesh geometry={nodes.Cube028_1.geometry} material={nodes.Cube028_1.material}/>
            <mesh geometry={nodes.Cube028_2.geometry} material={nodes.Cube028_2.material}/>
        </group>
        <group position={[9.537, -0.093, 8.787]}>
            <mesh geometry={nodes.Cube029.geometry} material={nodes.Cube029.material}/>
            <mesh geometry={nodes.Cube029_1.geometry} material={nodes.Cube029_1.material}/>
        </group>
        <group position={[-7.969, -0.093, 7.015]}
               onPointerOver={() => setRightDoorHover(true)}
               onPointerOut={() => setRightDoorHover(false)}
               onClick={() => setAppState({section: 'quests'})}
               rotation={rightDoorHover ? [0, Math.PI * 0.5, 0] : [0, 0, 0]}>
            <mesh geometry={nodes.Cube030.geometry} material={nodes.Cube030.material}/>
            <mesh geometry={nodes.Cube030_1.geometry} material={nodes.Cube030_1.material}/>
            <mesh geometry={nodes.Cube030_2.geometry} material={nodes.Cube030_2.material}/>
        </group>
        <group position={[-7.969, -0.093, 3.795]}>
            <mesh geometry={nodes.Cube031.geometry} material={nodes.Cube031.material}/>
            <mesh geometry={nodes.Cube031_1.geometry} material={nodes.Cube031_1.material}/>
        </group>

        <mesh geometry={nodes.Tekenomics.geometry}
              onClick={() => setPlace('tok')}
              position={[4.286, 0.682, 13.263]}>
            <meshStandardMaterial color="white" map={tokTex}/>
        </mesh>
        <mesh geometry={nodes.Roadmap.geometry}
              onClick={() => setPlace('map')}
              position={[-3.844, 0.682, 13.263]}>
            <meshStandardMaterial color="white" map={mapTex}/>
        </mesh>

        { place === 'map' ?
            <mesh position={[-3.844, -0.682, 13.263]}
                  rotation={[-Math.PI * 0.75, 0, 0]}
                  onClick={() => setPlace('home')}>
                <planeGeometry args={[1, 1]}/>
                <meshStandardMaterial color="red"/>
            </mesh>
            : null }

        {place === 'tok' ?
            <mesh position={[4.286, -0.682, 13.263]}
                  rotation={[-Math.PI * 0.75, 0, 0]}
                  onClick={() => setPlace('home')}>
                <planeGeometry args={[1, 1]}/>
                <meshStandardMaterial color="red"/>
            </mesh>
            : null}
    </>
}

function VaultRoom({nodes}: { nodes: GLTFResult['nodes'] }) {
    const camera = useThree((state) => state.camera as PerspectiveCamera)
    const [appState, setAppState] = useContext(AppContext)
    const [place, setPlace] =
        useState('home' as 'home' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10' | 'tut')
    const returnButton = useRef<THREE.Mesh>(null!)
    const vaultTutTex = useTexture('/vaultsTut.webp', (loader) => loader.flipY = false)

    useEffect(() => {
        switch (place) {
            case 'home':
                camera.position.set(-15, 0, 5)
                camera.rotation.set(0, Math.PI * 0.0625, 0)
                break
            case 's1':
                camera.position.set(-12.5, -0.685, -9.75)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(12.414, -0.887, 11.756)
                break
            case 's2':
                camera.position.set(-15, -0.687, -9.756)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(15.232, -0.887, 11.756)
                break
            case 's3':
                camera.position.set(-18, -0.687, -9.756)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(18.141, -0.887, 11.756)
                break
            case 's4':
                camera.position.set(-12.75, 0.887, -9.756)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(12.645, 0.885, 11.756)
                break
            case 's5':
                camera.position.set(-14.75, 0.887, -9.756)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(14.732, 0.887, 11.756)
                break
            case 's6':
                camera.position.set(-16.75, 0.887, -9.756)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(16.732, 0.887, 11.756)
                break
            case 's7':
                camera.position.set(-18.75, 0.887, -9.756)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(18.232, 0.887, 11.756)
                break
            case 's8':
                camera.position.set(-13.824, 2.463, -9.75)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(13.232, 2.125, 11.756)
                break
            case 's9':
                camera.position.set(-15.424, 2.463, -9.75)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(15.232, 2.125, 11.756)
                break
            case 's10':
                camera.position.set(-17.746, 2.463, -9.75)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(17.732, 2.125, 11.756)
                break
            case 'tut':
                camera.position.set(-15.5, 1, -8)
                camera.rotation.set(0, Math.PI * 0.5, 0)
                returnButton.current.position.set(22.667, -1.309, 8.201)
                break
        }
    }, [place, camera])

    return <>
        <mesh geometry={nodes.Vaults.geometry} material={nodes.Vaults.material} position={[15.13, 0.996, 11.923]}/>
        <mesh onClick={() => setPlace('tut')}
              rotation={[Math.PI, -Math.PI * 0.5, 0]}
              scale={[-1, 1, 1]}
              position={[22.667, 0.809, 8.201]}>
            <planeGeometry args={[4, 3]}/>
            <meshStandardMaterial color="white" map={vaultTutTex}/>
        </mesh>

        <mesh geometry={nodes.Safe2Door.geometry}
              material={nodes.Safe2Door.material}
              onClick={() => setPlace('s2')}
              rotation={appState.vault2 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[14.732, -0.687, 11.756]}/>
        <mesh geometry={nodes.Safe3Door.geometry}
              material={nodes.Safe3Door.material}
              onClick={() => setPlace('s3')}
              rotation={appState.vault3 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[17.641, -0.687, 11.756]}/>
        <mesh geometry={nodes.Safe1Door.geometry}
              material={nodes.Safe1Door.material}
              onClick={() => setPlace('s1')}
              position={[11.914, -0.687, 11.756]}/>
        <mesh geometry={nodes.Safe7Door.geometry}
              material={nodes.Safe7Door.material}
              onClick={() => setPlace('s7')}
              rotation={appState.vault7 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[18.17, 0.885, 11.756]}/>
        <mesh geometry={nodes.Safe6Door.geometry}
              material={nodes.Safe6Door.material}
              onClick={() => setPlace('s6')}
              rotation={appState.vault6 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[16.208, 0.885, 11.756]}/>
        <mesh geometry={nodes.Safe5Door.geometry}
              material={nodes.Safe5Door.material}
              onClick={() => setPlace('s5')}
              rotation={appState.vault5 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[14.021, 0.885, 11.756]}/>
        <mesh geometry={nodes.Safe4Door.geometry}
              material={nodes.Safe4Door.material}
              onClick={() => setPlace('s4')}
              rotation={appState.vault4 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[12.145, 0.885, 11.756]}/>
        <mesh geometry={nodes.Safe10Door.geometry}
              material={nodes.Safe10Door.material}
              onClick={() => setPlace('s10')}
              rotation={appState.vault10 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[17.146, 2.463, 11.756]}/>
        <mesh geometry={nodes.Safe9Door.geometry}
              material={nodes.Safe9Door.material}
              onClick={() => setPlace('s9')}
              rotation={appState.vault9 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[14.855, 2.463, 11.756]}/>
        <mesh geometry={nodes.Safe8Door.geometry}
              material={nodes.Safe8Door.material}
              onClick={() => setPlace('s8')}
              rotation={appState.vault8 === 'unlocked' ? [0, Math.PI * 0.75, 0] : [0, 0, 0]}
              position={[13.124, 2.463, 11.756]}/>

        <mesh ref={returnButton}
              visible={place !== 'home'}
              rotation={[-Math.PI * 0.75, 0, 0]}
              onClick={() => setPlace('home')}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[-Math.PI * 0.75, 0, 0]}
              position={[12, -0.685, 5]}
              onClick={() => setAppState({section: 'map'})}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    </>
}

function QuestRoom({nodes}: {nodes: GLTFResult['nodes']}) {
    const mapTex = useTexture('/map.png', (loader) => loader.flipY = false)
    const [place, setPlace] =
        useState('home' as 'home' | 'sqMap' | 'map' | 'tut' | 'sqTut' | 'rev')
    const [appState, setAppState] = useContext(AppContext)
    const camera = useThree((state) => state.camera as PerspectiveCamera)
    const sqTutorialTex = useTexture('/SQTutorial.webp', (loader) => loader.flipY = false)
    const questsTutTex = useTexture('/questsTut.webp', (loader) => loader.flipY = false)
    const returnButton = useRef<THREE.Mesh>(null!)
    const revReturnButton = useRef<THREE.Mesh>(null!)

    useEffect(() => {
        switch (place) {
            case 'home':
                camera.position.set(15, 0, 0)
                camera.rotation.set(0, -Math.PI * 0.125, 0)
                break
            case 'sqMap':
                camera.position.set(15, 0, -7)
                camera.rotation.set(0, 0, 0)
                returnButton.current.position.set(-15, -0.685, 10)
                break
            case 'map':
                camera.position.set(19, 0, 0)
                camera.rotation.set(0, -Math.PI * 0.5, 0)
                revReturnButton.current.position.set(-23, 1, -1.5)
                break
            case 'tut':
                camera.position.set(17, 0, -5)
                camera.rotation.set(0, -Math.PI, 0)
                revReturnButton.current.position.set(-17, -1.885, 0)
                break
            case 'rev':
                camera.position.set(15, 0, -10)
                camera.rotation.set(0, -Math.PI * 0.85, 0)
                break
            case 'sqTut':
                camera.position.set(15, 0, -9)
                camera.rotation.set(0, -Math.PI * 0.5, 0)
                returnButton.current.position.set(-19, -0.685, 10)
                break
        }
    }, [place, camera])

    return <>
        <mesh geometry={nodes.Sidequest_Map.geometry}
              onClick={() => setPlace('sqMap')}
              position={[-15.917, 0.682, 13.263]}>
            <meshStandardMaterial color="white" map={mapTex}/>
        </mesh>
        <mesh rotation={[-Math.PI, Math.PI, 0]}
              scale={[-1, 1, 1]}
              onClick={() => setPlace('tut')}
              position={[-17.337, 0.609, -2.567]}>
            <planeGeometry args={[5, 3]}/>
            <meshStandardMaterial color="white" map={questsTutTex}/>
        </mesh>
        <mesh rotation={[Math.PI, Math.PI * 0.5, 0]}
              onClick={() => setPlace('sqTut')}
              scale={[-1, 1, 1]}
              position={[-23.429, 0.694, 9.92]}>
            <planeGeometry args={[5, 3]}/>
            <meshStandardMaterial color="white" map={sqTutorialTex}/>
        </mesh>

        <mesh ref={returnButton}
              visible={place !== 'home'}
              rotation={[-Math.PI * 0.75, 0, 0]}
              onClick={() => setPlace('home')}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
        <mesh ref={revReturnButton}
              visible={place !== 'rev'}
              rotation={[Math.PI * 0.75, Math.PI, -Math.PI * 0.1]}
              onClick={() => setPlace('rev')}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[Math.PI * 0.75, Math.PI, 0]}
              position={[-17, -1.885, 3]}
              onClick={() => setPlace('home')}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[-Math.PI * 0.75, 0, 0]}
              position={[-15, -0.685, 5]}
              onClick={() => setAppState({section: 'map'})}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
        <mesh rotation={[-Math.PI * 0.75, Math.PI * 0.125, 0]}
              position={[-18, -0.885, 3.5]}
              onClick={() => setPlace('rev')}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="blue"/>
        </mesh>

        <group position={[-23.03, -0.553, -0.422]} onClick={() => setPlace('map')}>
            <mesh geometry={nodes.Desk_1.geometry} material={nodes.Desk_1.material}/>
            <mesh geometry={nodes.Desk_2.geometry} material={nodes.Desk_2.material}/>
            <mesh geometry={nodes.Desk_3.geometry} material={nodes.Desk_3.material}/>
            <mesh geometry={nodes.Desk_4.geometry} material={nodes.Desk_4.material}/>
            <mesh geometry={nodes.Desk_5.geometry} material={nodes.Desk_5.material}/>
            <mesh geometry={nodes.Desk_6.geometry} material={nodes.Desk_6.material}/>
            <mesh geometry={nodes.Desk_7.geometry} material={nodes.Desk_7.material}/>
            <mesh geometry={nodes.Desk_8.geometry} material={nodes.Desk_8.material}/>
            <mesh geometry={nodes.Desk_9.geometry} material={nodes.Desk_9.material}/>
            <mesh geometry={nodes.Desk_10.geometry} material={nodes.Desk_10.material}/>
            <mesh geometry={nodes.Desk_11.geometry} material={nodes.Desk_11.material}/>
            <mesh geometry={nodes.Desk_12.geometry} material={nodes.Desk_12.material}/>
            <mesh geometry={nodes.Desk_13.geometry} material={nodes.Desk_13.material}/>
            <mesh geometry={nodes.Desk_14.geometry} material={nodes.Desk_14.material}/>
            <mesh geometry={nodes.Desk_15.geometry} material={nodes.Desk_15.material}/>
            <mesh geometry={nodes.Desk_16.geometry} material={nodes.Desk_16.material}/>
            <mesh geometry={nodes.Desk_17.geometry} material={nodes.Desk_17.material}/>
            <mesh geometry={nodes.Desk_18.geometry} material={nodes.Desk_18.material}/>
            <mesh geometry={nodes.Desk_19.geometry} material={nodes.Desk_19.material}/>
        </group>
    </>
}
