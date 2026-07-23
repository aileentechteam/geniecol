import type { Metadata } from 'next'
import RevenueForecastTool from './RevenueForecastTool'

export const metadata: Metadata = {
  title: 'Jack Henry Seasonal Forecast | Genie Collective',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function RevenueForecastPage() {
  return <RevenueForecastTool />
}
