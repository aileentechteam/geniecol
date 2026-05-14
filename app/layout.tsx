import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Genie Collective',
  description: 'We make brand magic happen.',
  icons: {
    icon: '/brand/crest.svg',
    shortcut: '/brand/crest.svg',
    apple: '/brand/crest.svg',
  },
  openGraph: {
    title: 'Genie Collective',
    description: 'We make brand magic happen.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
