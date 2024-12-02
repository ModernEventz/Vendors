/* eslint-disable camelcase */
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/lib/store';


import './globals.css';
import '../styles/prism.css';
import { ThemeProvider } from '@/context/ThemeProvider';

import StoreProvider from './storeProvider';
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})
 
export const metadata: Metadata = {
  title: 'Save TheDate',
  description: 'A platform where you can your wedding venues, Caterer,decorators,mc,dj,makeup stylist etc to make event a memorable one.',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary: 'primary-gradient',
                footerActionLink: 'primary-text-gradient hover:text-primary-500'
              }
            }}
          >
            <StoreProvider>
            <ThemeProvider>
            
              {children}
              
            </ThemeProvider>
            </StoreProvider>
           
          </ClerkProvider>
        </body>
      </html>
  )
}