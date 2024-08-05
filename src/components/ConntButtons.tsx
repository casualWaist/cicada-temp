import React from "react"

export default function ConntButtons() {
    return <>
        <mesh position={[-1, 2, -12]}
              onClick={() => {

              }}>
            <planeGeometry args={[0.5, 0.25]}/>
            <meshBasicMaterial color="red"/>
        </mesh>
        <mesh position={[1, 2, -12]}
              onClick={() => {

              }}>
            <planeGeometry args={[0.5, 0.25]}/>
            <meshBasicMaterial color="blue"/>
        </mesh>
        <mesh position={[-2, 2, -12]}
              onClick={() => {

              }}>
            <planeGeometry args={[0.5, 0.25]}/>
            <meshBasicMaterial color="green"/>
        </mesh>
        <mesh position={[2, 2, -12]}
              onClick={() => {

              }}>
            <planeGeometry args={[0.5, 0.25]}/>
            <meshBasicMaterial color="yellow"/>
        </mesh>
    </>
}
