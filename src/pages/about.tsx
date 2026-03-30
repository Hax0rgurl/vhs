import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      <Head>
        <title>VHS Filter - About</title>
      </Head>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, textShadow: '2px 2px 0 #f00, -2px -2px 0 #00f' }}>ABOUT SYSTEM</h1>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '5px 15px' }}>
          &lt; BACK TO MENU
        </Link>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#111', padding: '40px', border: '1px solid #333' }}>
        <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>SYSTEM INFORMATION</h2>

        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          This application is a VHS filter for videos. It applies analog horror style visual effects
          on top of uploaded videos to simulate the degradation and quirks of analog magnetic tape.
        </p>

        <h3 style={{ marginTop: '30px' }}>FEATURES:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Custom WebGL shader implementation</li>
          <li>Real-time rendering</li>
          <li>Adjustable scanlines density</li>
          <li>Variable RGB chromatic aberration / glitching</li>
          <li>Analog noise and grain simulation</li>
          <li>Interactive 3D menu system</li>
        </ul>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #333', opacity: 0.5, fontSize: '0.9rem' }}>
          <p>SYSTEM BUILD: v1.0.0</p>
          <p>RENDER PIPELINE: WebGL / React Three Fiber</p>
        </div>
      </div>
    </div>
  )
}
