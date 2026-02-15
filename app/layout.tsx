import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'
import AccessibilityToolbar from '@/components/AccessibilityToolbar'
import { jsonLdDocument, jsonLdScriptProps, organizationSchema, webSiteSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://visitshaftesbury.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Visit Shaftesbury',
    template: '%s | Visit Shaftesbury',
  },
  description: 'Discover events, shops, services and things to do in Shaftesbury, Dorset. Your guide to this historic hilltop town.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Visit Shaftesbury',
    title: 'Visit Shaftesbury',
    description: 'Discover events, shops, services and things to do in Shaftesbury, Dorset. Your guide to this historic hilltop town.',
    url: SITE_URL,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Visit Shaftesbury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Shaftesbury',
    description: 'Discover events, shops, services and things to do in Shaftesbury, Dorset.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const siteSchemas = jsonLdDocument(
  organizationSchema(),
  webSiteSchema(),
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script {...jsonLdScriptProps(siteSchemas)} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-019RKK15W2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-019RKK15W2');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <AccessibilityToolbar />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
