import './styles/global.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Inter } from 'next/font/google';

import { TopNav } from './components/Nav/nav';

const inter = Inter({ subsets: ['latin'] })

// built-in seo
export const metadata = {
    title: 'Home - Mapbox react-map-gl',
    description: 'Mapbox react-map-gl demo',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TopNav/>
                {children}
            </body>
        </html>
    )
}