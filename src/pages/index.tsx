import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { VHSTape } from '../components/VHSTape'
import Head from 'next/head'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Head>
        <title>VHS Filter App</title>
        <meta name="description" content="Analog horror style VHS filter app" />
      </Head>

      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', color: '#fff', pointerEvents: 'none', fontFamily: 'monospace' }}>
        <h1 style={{ fontSize: '3rem', margin: 0, textShadow: '2px 2px 0 #f00, -2px -2px 0 #00f' }}>VHS FILTER</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', opacity: 0.8 }}>Select a tape to continue</p>
      </div>

      <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <VHSTape
              position={[-5, 0, 0]}
              rotation={[0, Math.PI / 8, 0]}
              label="FILTER"
              route="/filter"
            />
            <VHSTape
              position={[0, 0, 1]}
              rotation={[0, 0, 0]}
              label="GALLERY"
              route="/gallery"
            />
            <VHSTape
              position={[5, 0, 0]}
              rotation={[0, -Math.PI / 8, 0]}
              label="ABOUT"
              route="/about"
            />
          </group>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 6px 100%',
        pointerEvents: 'none',
        zIndex: 20,
        opacity: 0.5
      }} />
    </div>
  )
}
