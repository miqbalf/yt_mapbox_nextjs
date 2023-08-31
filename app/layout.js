import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link href='https://api.tiles.mapbox.com/mapbox-gl-js/vpk.eyJ1IjoibXVoZmlyZGF1c2lxYmFsIiwiYSI6ImNrZDVqMmVtczFmNG4ycm8zNjQ3bTZnanIifQ.rY8EemTRu60WjZrXH-oxdQ/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}