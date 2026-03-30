import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { useRouter } from 'next/router'

interface VHSTapeProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  label: string
  route: string
}

export function VHSTape({ position, rotation = [0, 0, 0], label, route }: VHSTapeProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHover] = useState(false)
  const router = useRouter()

  useCursor(hovered)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      if (hovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1] + 0.2, 0.1)
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1], 0.1)
      }
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHover(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        router.push(route)
      }}
    >
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 2.5]} />
        <meshStandardMaterial color={hovered ? "#333333" : "#222222"} roughness={0.8} />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0.51, 0]}>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Text */}
      <Text
        position={[0, 0.52, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.4}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Spools windows */}
      <mesh position={[-1, 0.51, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[1, 0.51, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Spine label area */}
      <mesh position={[0, 0, 1.26]}>
        <planeGeometry args={[3, 0.6]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      <Text
        position={[0, 0, 1.27]}
        fontSize={0.3}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Flap */}
      <mesh position={[0, 0, -1.25]}>
        <boxGeometry args={[4, 0.8, 0.1]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
    </group>
  )
}
