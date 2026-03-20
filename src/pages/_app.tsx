import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <Component {...pageProps} />
      <Toaster />
      <Script src="https://assets.co.dev/files/codevscript.js" strategy="afterInteractive" />
    </div>
  )
}