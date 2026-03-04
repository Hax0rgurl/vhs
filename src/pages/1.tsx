import React, { useState, useRef } from 'react';
import Head from 'next/head';

export default function VhsMaker() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // VHS Effect States
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0.5);
  const [contrast, setContrast] = useState(1.2);
  const [brightness, setBrightness] = useState(1);
  const [saturation, setSaturation] = useState(1);

  // Overlay Opacities
  const [scanlines, setScanlines] = useState(0.3);
  const [noise, setNoise] = useState(0.15);
  const [colorBleed, setColorBleed] = useState(2); // Pixel offset

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const videoFilter = `
    blur(${blur}px)
    sepia(${sepia})
    contrast(${contrast})
    brightness(${brightness})
    saturate(${saturation})
  `;

  return (
    <div className="min-h-screen bg-neutral-900 text-green-400 font-mono p-4 md:p-8 flex flex-col items-center">
      <Head>
        <title>VHS Video Maker</title>
        <meta name="description" content="Turn your videos into retro VHS style." />
      </Head>

      <main className="w-full max-w-5xl bg-neutral-800 p-6 md:p-8 rounded-xl shadow-2xl border border-neutral-700 flex flex-col md:flex-row gap-8">

        {/* Left Side: Video Preview */}
        <div className="flex-1 flex flex-col items-center space-y-4">
          <header className="text-center w-full pb-4 border-b border-neutral-700">
            <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-green-500 uppercase drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">
              VHS Maker
            </h1>
            <p className="text-sm mt-2 opacity-80 uppercase tracking-widest">
              PLAY  ▶
            </p>
          </header>

          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] border-4 border-neutral-900 flex items-center justify-center">
            {videoSrc ? (
              <>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  controls
                  loop
                  autoPlay
                  className="w-full h-full object-contain mix-blend-screen"
                  style={{ filter: videoFilter }}
                />

                {/* Simulated Color Bleed Overlay */}
                {colorBleed > 0 && (
                   <video
                     src={videoSrc}
                     loop
                     autoPlay
                     muted
                     className="absolute top-0 left-0 w-full h-full object-contain opacity-50 pointer-events-none mix-blend-color-dodge"
                     style={{
                       filter: `blur(${blur}px) sepia(${sepia}) contrast(${contrast})`,
                       transform: `translate(${colorBleed}px, 0)`
                     }}
                   />
                )}

                {/* Scanlines Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
                    backgroundSize: '100% 4px, 6px 100%',
                    opacity: scanlines
                  }}
                />

                {/* Static/Noise Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: noise
                  }}
                />

                {/* VHS UI Overlay elements */}
                <div className="absolute top-4 left-4 pointer-events-none text-xl md:text-2xl font-bold tracking-widest text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  PLAY ▶
                </div>
                <div className="absolute bottom-4 left-4 pointer-events-none text-lg md:text-xl font-bold tracking-widest text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  SP
                </div>
                <div className="absolute bottom-4 right-4 pointer-events-none text-lg md:text-xl font-bold tracking-widest text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  12:00 AM
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-neutral-600">
                <span className="text-4xl mb-4">📹</span>
                <p className="uppercase tracking-widest">NO TAPE INSERTED</p>
              </div>
            )}
          </div>

          <div className="w-full pt-4">
            <label className="block w-full cursor-pointer bg-neutral-700 hover:bg-neutral-600 text-center py-3 rounded-md transition-colors uppercase font-bold tracking-widest border border-neutral-600">
              <span>Insert Tape (Upload Video)</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="w-full md:w-80 flex flex-col space-y-6 bg-neutral-900 p-6 rounded-lg border border-neutral-700">
          <h2 className="text-xl font-bold tracking-widest uppercase text-center border-b border-neutral-700 pb-2 mb-4">
            VCR Controls
          </h2>

          <SliderControl label="Tracking (Blur)" value={blur} min={0} max={10} step={0.5} onChange={setBlur} />
          <SliderControl label="Color Bleed" value={colorBleed} min={0} max={10} step={1} onChange={setColorBleed} />
          <SliderControl label="Noise (Static)" value={noise} min={0} max={1} step={0.05} onChange={setNoise} />
          <SliderControl label="Scanlines" value={scanlines} min={0} max={1} step={0.05} onChange={setScanlines} />
          <SliderControl label="Sepia Tone" value={sepia} min={0} max={1} step={0.1} onChange={setSepia} />
          <SliderControl label="Contrast" value={contrast} min={0.5} max={2} step={0.1} onChange={setContrast} />
          <SliderControl label="Brightness" value={brightness} min={0.5} max={2} step={0.1} onChange={setBrightness} />
          <SliderControl label="Saturation" value={saturation} min={0} max={3} step={0.1} onChange={setSaturation} />

          <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  setBlur(0); setSepia(0.5); setContrast(1.2); setBrightness(1);
                  setSaturation(1); setScanlines(0.3); setNoise(0.15); setColorBleed(2);
                }}
                className="px-4 py-2 bg-red-900/50 hover:bg-red-800 text-red-400 rounded uppercase font-bold text-sm tracking-widest transition-colors border border-red-900"
              >
                Reset Dials
              </button>
          </div>
        </div>

      </main>
    </div>
  );
}

// Reusable Slider Component
function SliderControl({
  label, value, min, max, step, onChange
}: {
  label: string; value: number; min: number; max: number; step: number; onChange: (val: number) => void
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs uppercase tracking-wider text-neutral-400">
        <label>{label}</label>
        <span>{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-green-500 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
