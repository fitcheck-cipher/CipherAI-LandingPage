import type { Metadata } from 'next'
import { ThemeProvider } from './theme-context'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import PageLoader from '@/components/PageLoader'
import './globals.css'

export const metadata: Metadata = {
  title: 'CipherAI',
  description: 'AI-powered personal fashion stylist',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <PageLoader />
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
