import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Gallery() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'monospace', padding: '20px' }}>
      <Head>
        <title>VHS Filter - Gallery</title>
      </Head>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, textShadow: '2px 2px 0 #f00, -2px -2px 0 #00f' }}>GALLERY ARCHIVE</h1>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '5px 15px' }}>
          &lt; BACK TO MENU
        </Link>
      </header>

      <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5 }}>
        <h2>TAPE ARCHIVE EMPTY</h2>
        <p>Processed videos will appear here.</p>
      </div>
    </div>
  )
}
