import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DPO DAO',
  description: 'DPO DAO WHERE SHARE HOLDERS VOTE ON POLLS AND A DECISION IS MADE BASED ON THE POPULAR VOTE',
  keywords:["DPO",'DAO','DECENTRALIZED','BLOCKCHAIN','AUTONOMOUS','SHAREHOLDER','DIRECT PRIVATE OFFERS']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
