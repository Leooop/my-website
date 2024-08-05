import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {languages} from '@/lib/i18n/settings'
import {ELanguages} from '@/types/enums'
import {ThemeProvider} from 'next-themes'
import {SpotlightBackground} from '@/components/spotlight-background'
import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'

const inter = Inter({subsets: ['latin']})

export async function generateStaticParams() {
  return languages.map(lng => ({lng}))
}

export const metadata: Metadata = {
  title: 'Léo Petit',
  description: 'Personal Website of Léo Petit',
}

export default function RootLayout({
  children,
  params: {lng},
}: Readonly<{
  children: React.ReactNode
  params: {lng: ELanguages}
}>) {
  return (
    <html lang={lng} suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute='class'>
          <SpotlightBackground>
            <div className='flex h-screen w-screen flex-col items-center'>
              {children}
            </div>
          </SpotlightBackground>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
