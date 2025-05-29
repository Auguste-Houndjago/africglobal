import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AfricGlobal - Connect Exporters and Investors',
  description: 'Connect exporters and investors in agriculture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
         <body className={inter.className}>
        <Navbar />
        <main className='min-h-screen'>
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
