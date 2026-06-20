'use client'

import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('./home-page'), { ssr: false })

export default function HomePageLoader() {
  return <HomePage />
}
