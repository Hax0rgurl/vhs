import React, { useState, useRef, useEffect, Suspense } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { VHSShader } from '../components/VHSShader'

export default function Filter() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [scanlines, setScanlines] = useState(0.5)
  const [rgbGlitch, setRgbGlitch] = useState(0.3)
  const [grain, setGrain] = useState(0.4)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc)
      }
      const url = URL.createObjectURL(file)
      setVideoSrc(url)
    }
  }

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc)
      }
    }
  }, [videoSrc])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      <Head>
        <title>VHS Filter - Process Video</title>
      </Head>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, textShadow: '2px 2px 0 #f00, -2px -2px 0 #00f' }}>VHS PROCESSOR</h1>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '5px 15px' }}>
          &lt; BACK TO MENU
        </Link>
      </header>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Left Column: UI Controls */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <div style={{ background: '#111', padding: '20px', border: '1px solid #333', marginBottom: '20px' }}>
            <h2 style={{ marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '10px' }}>INPUT SOURCE</h2>

            <label style={{ display: 'block', marginBottom: '20px' }}>
              <span style={{ display: 'block', marginBottom: '5px' }}>UPLOAD VIDEO:</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                style={{ width: '100%', background: '#222', color: '#fff', padding: '10px' }}
              />
            </label>
          </div>

          <div style={{ background: '#111', padding: '20px', border: '1px solid #333' }}>
            <h2 style={{ marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '10px' }}>EFFECT CONTROLS</h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>SCANLINES</span>
                <span>{Math.round(scanlines * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={scanlines}
                onChange={(e) => setScanlines(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>RGB GLITCH</span>
                <span>{Math.round(rgbGlitch * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={rgbGlitch}
                onChange={(e) => setRgbGlitch(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>NOISE / GRAIN</span>
                <span>{Math.round(grain * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={grain}
                onChange={(e) => setGrain(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: WebGL Render Area */}
        <div style={{ flex: '2 1 500px', minHeight: '600px', border: '1px solid #333', background: '#050505', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {!videoSrc ? (
            <div style={{ opacity: 0.5 }}>NO SIGNAL - PLEASE UPLOAD VIDEO</div>
          ) : (
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ width: '100%', height: '100%' }}>
              <color attach="background" args={['#000']} />
              <Suspense fallback={null}>
                <Center>
                  <VHSShader
                    videoSrc={videoSrc}
                    scanlines={scanlines}
                    rgbGlitch={rgbGlitch}
                    grain={grain}
                  />
                </Center>
              </Suspense>
              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          )}
        </div>
      </div>
    </div>
  )
}
