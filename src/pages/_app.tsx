import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from 'react';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Get the color-scheme value from :root
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    // Use an optimized single-pass regex to sanitize the mode value
    const colorScheme = computedStyle.getPropertyValue('--mode').replace(/['"\s]/g, '');

    // Wrap DOM writes in requestAnimationFrame to avoid synchronous layout thrashing
    requestAnimationFrame(() => {
      if (colorScheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Component {...pageProps} />
      <Toaster />
      <Script src="https://assets.co.dev/files/codevscript.js" strategy="afterInteractive" />
    </div>
  )
}
