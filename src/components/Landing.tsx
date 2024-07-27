'use client'

import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {Float, Html, useFBO, useTexture} from "@react-three/drei"
import { Amatic_SC } from "next/font/google"
import {useEffect, useMemo, useRef, useState} from "react"
import * as THREE from "three"
import {CicadaShaderUniforms, CicadaSimShaderUniforms, CicadaShader, CicadaSimShader} from "@/components/LandingMaterials"
import Countdown from "react-countdown"
import moment from "moment-timezone"

const amatic = Amatic_SC({subsets: ['latin'], weight: ['400', '700']})

export default function Landing() {
    const targetDateCT = moment.tz('2024-08-05 12:00', 'America/Chicago')
    const userDateTZ = targetDateCT.clone().tz(moment.tz.guess())

    return <>
        <Scene />
        <Float>
            <Html position={[0, -2, 1]}
                  center transform as="h1"
                  className={`flex items-center justify-center ${amatic.className}`}
                  scale={0.25}>
                <div className="p-2 min-w-[500px]"
                     style={{
                         transform: 'scale(4)',
                         textAlign: 'center',
                         textShadow: '0 0 1px #000',
                         color: '#801b1b'
                }}>
                    <Countdown date={userDateTZ.toDate()} />
                </div>
            </Html>
        </Float>
    </>
}

function Scene() {
    const camera = useThree((state) => state.camera)
    const view = useThree((state) => state.viewport)
    const [simCamera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))
    const [simScene] = useState(() => new THREE.Scene())
    const shader = useRef<CicadaShaderUniforms & THREE.ShaderMaterial>(null!)
    const simShader = useRef<CicadaSimShaderUniforms & THREE.ShaderMaterial>(null!)
    const points = useRef<THREE.Points>(null!)
    const texWorld = useTexture('/cicada-3301.png')

    const tGeo = useMemo(() => new THREE.PlaneGeometry(
        view.width,
        view.width * 0.5625,
        128,
        128),
        [view])

    const { size, texture } = useMemo(() => {

        const tMesh = new THREE.Mesh(tGeo)
        const size = Math.ceil(Math.sqrt(tMesh.geometry.attributes.position.array.length / 3))
        const data = new Float32Array(size * size * 4)
        for (let i = 0; i < size * size; i++) {
            const d = i * 4
            const t = i * 3
            data[d] = tMesh.geometry.attributes.position.array[t]
            data[d + 1] = tMesh.geometry.attributes.position.array[t + 1]
            data[d + 2] = tMesh.geometry.attributes.position.array[t + 2]
            data[d + 3] = 1
            if (isNaN(data[d])) {
                data[d] = 0
                data[d + 1] = 0
                data[d + 2] = 0
            }

            const u = i * 2
            tMesh.geometry.attributes.uv.array[u] = (i % size) / size
            tMesh.geometry.attributes.uv.array[u + 1] = Math.floor(i / size) / size
        }

        return {
            size: size,
            texture: new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType)
        }
    }, [tGeo])

    const target = useFBO(size, size, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType
    })

    useEffect(() => {
        simShader.current.uPositions = texture
        simShader.current.uPositions.needsUpdate = true
        camera.position.set(0, -1.5, 4.5)
        camera.lookAt(0, 0, 0)
    }, []);

    useFrame((state) => {
        state.gl.setRenderTarget(target)
        state.gl.clear()
        state.gl.render(simScene, simCamera)
        state.gl.setRenderTarget(null)
        shader.current.uPositions = target.texture as THREE.DataTexture
        shader.current.uCamera = camera.position
    })

    return <>
        {createPortal(
            <mesh>
                <planeGeometry args={[2, 2]}/>
                <CicadaSimShader ref={simShader} />
            </mesh>,
            simScene
        )}
        <group position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
            <points ref={points} >
                <bufferGeometry attach="geometry" {...tGeo} />
                <CicadaShader ref={shader}
                              uPositions={texture}
                              depthWrite={false}
                              transparent
                              blending={THREE.NormalBlending}
                              uTexture={texWorld}
                              uColor={new THREE.Color(0.46, 0.7333, 0.904)}/>
            </points>
        </group>
    </>
}
