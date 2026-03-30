import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface VHSShaderProps {
  videoSrc: string
  scanlines: number
  rgbGlitch: number
  grain: number
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float time;
  uniform float scanlines;
  uniform float rgbGlitch;
  uniform float grain;

  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 p = vUv;

    // RGB Glitch / chromatic aberration
    float jitter = rgbGlitch * 0.01 * rand(vec2(time, p.y));
    vec4 color1 = texture2D(tDiffuse, vec2(p.x + jitter, p.y));
    vec4 color2 = texture2D(tDiffuse, vec2(p.x - jitter, p.y));
    vec4 color3 = texture2D(tDiffuse, p);

    vec4 color = vec4(color1.r, color3.g, color2.b, 1.0);

    // Scanlines
    float count = 800.0;
    vec2 sl = vec2(sin(p.y * count), cos(p.y * count));
    vec3 scanlinesColor = vec3(sl.x, sl.y, sl.x);
    color.rgb -= scanlinesColor * (scanlines * 0.1);

    // Noise / Grain
    float noise = (rand(p * time) - 0.5) * grain;
    color.rgb += noise;

    // Vignette
    float d = distance(p, vec2(0.5, 0.5));
    color.rgb *= 1.0 - (d * 0.5);

    gl_FragColor = color;
  }
`

export function VHSShader({ videoSrc, scanlines, rgbGlitch, grain }: VHSShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const video = useMemo(() => {
    const v = document.createElement('video')
    v.crossOrigin = 'Anonymous'
    v.loop = true
    v.muted = true
    v.src = videoSrc
    v.play()
    return v
  }, [videoSrc])

  const videoTexture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.format = THREE.RGBAFormat
    return tex
  }, [video])

  // Cleanup
  useEffect(() => {
    return () => {
      video.pause()
      video.src = ''
      video.load()
      videoTexture.dispose()
    }
  }, [video, videoTexture])

  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: videoTexture },
      time: { value: 0.0 },
      scanlines: { value: scanlines },
      rgbGlitch: { value: rgbGlitch },
      grain: { value: grain },
    }),
    [videoTexture, scanlines, rgbGlitch, grain]
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
      materialRef.current.uniforms.scanlines.value = scanlines
      materialRef.current.uniforms.rgbGlitch.value = rgbGlitch
      materialRef.current.uniforms.grain.value = grain
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[16, 9]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
