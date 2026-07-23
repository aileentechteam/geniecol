'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type ChartInstance = {
  destroy: () => void
}

type ChartConstructor = new (
  ctx: CanvasRenderingContext2D,
  config: Record<string, unknown>,
) => ChartInstance

declare global {
  interface Window {
    Chart?: ChartConstructor
  }
}

type ScenarioKey = 'good' | 'better' | 'great'

type Inputs = {
  baseAug: number
  baseSep: number
  baseOct: number
  baseNov: number
  baseDec: number
  baseJan: number
  multGood: number
  multBetter: number
  multGreat: number
  aovGood: number
  aovBetter: number
  aovGreat: number
  mer: number
}

const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']

const defaultInputs: Inputs = {
  baseAug: 135000,
  baseSep: 140000,
  baseOct: 142000,
  baseNov: 295000,
  baseDec: 150000,
  baseJan: 110000,
  multGood: 1.5,
  multBetter: 2,
  multGreat: 3,
  aovGood: 53,
  aovBetter: 56,
  aovGreat: 60,
  mer: 1.65,
}

const scenarioConfig: Record<
  ScenarioKey,
  { label: string; color: string; multKey: keyof Inputs; aovKey: keyof Inputs; className: string }
> = {
  good: {
    label: 'Good',
    color: '#5b9bf0',
    multKey: 'multGood',
    aovKey: 'aovGood',
    className: 'scenario-good',
  },
  better: {
    label: 'Better',
    color: '#f0985b',
    multKey: 'multBetter',
    aovKey: 'aovBetter',
    className: 'scenario-better',
  },
  great: {
    label: 'Great',
    color: '#4fd19a',
    multKey: 'multGreat',
    aovKey: 'aovGreat',
    className: 'scenario-great',
  },
}

function money(value: number) {
  return `$${Math.round(value).toLocaleString()}`
}

function number(value: number) {
  return Math.round(value).toLocaleString()
}

function buildData(inputs: Inputs) {
  const base = [
    inputs.baseAug,
    inputs.baseSep,
    inputs.baseOct,
    inputs.baseNov,
    inputs.baseDec,
    inputs.baseJan,
  ]
  const mer = inputs.mer || 1.65

  const scenarios = Object.entries(scenarioConfig).reduce(
    (acc, [key, config]) => {
      const scenarioKey = key as ScenarioKey
      const multiplier = Number(inputs[config.multKey]) || 1
      const aov = Number(inputs[config.aovKey]) || 1
      const revenue = base.map((monthRevenue) => monthRevenue * multiplier)
      const spend = revenue.map((monthRevenue) => monthRevenue / mer)
      const orders = revenue.map((monthRevenue) => monthRevenue / aov)

      acc[scenarioKey] = { revenue, spend, orders, aov }
      return acc
    },
    {} as Record<ScenarioKey, { revenue: number[]; spend: number[]; orders: number[]; aov: number }>,
  )

  return { base, scenarios }
}

export default function RevenueForecastTool() {
  const [inputs, setInputs] = useState(defaultInputs)
  const [chartReady, setChartReady] = useState(false)
  const revenueCanvas = useRef<HTMLCanvasElement | null>(null)
  const spendCanvas = useRef<HTMLCanvasElement | null>(null)
  const revenueChart = useRef<ChartInstance | null>(null)
  const spendChart = useRef<ChartInstance | null>(null)
  const { base, scenarios } = useMemo(() => buildData(inputs), [inputs])

  useEffect(() => {
    if (window.Chart) {
      setChartReady(true)
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-chartjs]')
    if (existingScript) {
      existingScript.addEventListener('load', () => setChartReady(true), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
    script.async = true
    script.dataset.chartjs = 'true'
    script.onload = () => setChartReady(true)
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!chartReady || !window.Chart || !revenueCanvas.current || !spendCanvas.current) {
      return
    }

    revenueChart.current?.destroy()
    spendChart.current?.destroy()

    const gridColor = '#232321'
    const tickColor = '#6f6e6a'
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c1c1a',
          titleColor: '#ececea',
          bodyColor: '#ececea',
          borderColor: '#2e2e2b',
          borderWidth: 1,
          callbacks: {
            label: (context: { dataset: { label?: string }; parsed: { y: number } }) =>
              `${context.dataset.label}: ${money(context.parsed.y)}`,
          },
        },
      },
      scales: {
        y: {
          grid: { color: gridColor },
          ticks: {
            color: tickColor,
            callback: (value: number) => `$${value / 1000}K`,
          },
        },
        x: {
          grid: { display: false },
          ticks: { color: tickColor },
        },
      },
    }

    revenueChart.current = new window.Chart(revenueCanvas.current.getContext('2d')!, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Baseline',
            data: base,
            borderColor: '#6f6e6a',
            borderDash: [3, 3],
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#6f6e6a',
            tension: 0.25,
          },
          ...Object.entries(scenarioConfig).map(([key, config]) => ({
            label: config.label,
            data: scenarios[key as ScenarioKey].revenue,
            borderColor: config.color,
            borderDash: key === 'better' ? [6, 3] : key === 'great' ? [2, 2] : undefined,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: config.color,
            tension: 0.25,
          })),
        ],
      },
      options,
    })

    spendChart.current = new window.Chart(spendCanvas.current.getContext('2d')!, {
      type: 'line',
      data: {
        labels: months,
        datasets: Object.entries(scenarioConfig).map(([key, config]) => ({
          label: config.label,
          data: scenarios[key as ScenarioKey].spend,
          borderColor: config.color,
          borderDash: key === 'better' ? [6, 3] : key === 'great' ? [2, 2] : undefined,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: config.color,
          tension: 0.25,
        })),
      },
      options,
    })

    return () => {
      revenueChart.current?.destroy()
      spendChart.current?.destroy()
    }
  }, [base, chartReady, scenarios])

  function updateInput(key: keyof Inputs, value: string) {
    const numericValue = Number(value)
    setInputs((current) => ({
      ...current,
      [key]: Number.isFinite(numericValue) ? numericValue : 0,
    }))
  }

  const baselineFields: Array<{ key: keyof Inputs; label: string }> = [
    { key: 'baseAug', label: 'Aug' },
    { key: 'baseSep', label: 'Sep' },
    { key: 'baseOct', label: 'Oct' },
    { key: 'baseNov', label: 'Nov (BFCM)' },
    { key: 'baseDec', label: 'Dec' },
    { key: 'baseJan', label: 'Jan' },
  ]

  return (
    <main className="forecast-tool-shell">
      <div className="forecast-tool-wrap">
        <a className="forecast-back-link" href="/preview">
          Back to staging
        </a>
        <h1>Bottlenecks: Jack Henry Forecast</h1>
        <p className="forecast-tool-sub">
          Aug-Jan baseline, scenario multipliers, MER-based ad spend, and AOV-derived orders. Adjust any field -
          everything recalculates live.
        </p>

        <section className="forecast-tool-panel">
          <h2>Baseline monthly revenue</h2>
          <div className="forecast-tool-grid">
            {baselineFields.map((field) => (
              <label key={field.key}>
                <span>{field.label}</span>
                <input
                  type="number"
                  value={inputs[field.key]}
                  onChange={(event) => updateInput(field.key, event.target.value)}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="forecast-tool-panel">
          <h2>Scenario assumptions</h2>
          <div className="forecast-tool-mult-group">
            {Object.entries(scenarioConfig).map(([key, config]) => (
              <label key={key} className={`forecast-tool-mult-row ${config.className}`}>
                <span>{config.label}</span>
                <input
                  type="number"
                  value={inputs[config.multKey]}
                  step="0.1"
                  onChange={(event) => updateInput(config.multKey, event.target.value)}
                />
                <span className="forecast-tool-unit">x baseline</span>
              </label>
            ))}
          </div>
          <div className="forecast-tool-mult-group forecast-tool-aov-group">
            {Object.entries(scenarioConfig).map(([key, config]) => (
              <label key={key} className={`forecast-tool-mult-row ${config.className}`}>
                <span>{config.label} AOV</span>
                <input
                  type="number"
                  value={inputs[config.aovKey]}
                  onChange={(event) => updateInput(config.aovKey, event.target.value)}
                />
              </label>
            ))}
            <label className="forecast-tool-mult-row">
              <span>MER</span>
              <input
                type="number"
                value={inputs.mer}
                step="0.05"
                onChange={(event) => updateInput('mer', event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="forecast-tool-panel">
          <h2>Revenue by month</h2>
          <div className="forecast-tool-legend">
            <span>
              <i style={{ background: '#6f6e6a' }} />
              Baseline
            </span>
            {Object.values(scenarioConfig).map((config) => (
              <span key={config.label}>
                <i style={{ background: config.color }} />
                {config.label}
              </span>
            ))}
          </div>
          <div className="forecast-tool-chartwrap">
            <canvas ref={revenueCanvas} role="img" aria-label="Revenue forecast chart, four lines from August to January" />
          </div>
        </section>

        <section className="forecast-tool-panel">
          <h2>Ad spend by month (revenue / MER)</h2>
          <div className="forecast-tool-chartwrap">
            <canvas ref={spendCanvas} role="img" aria-label="Ad spend forecast chart, three lines from August to January" />
          </div>
        </section>

        <section className="forecast-tool-panel">
          <h2>Month-by-month detail</h2>
          {Object.entries(scenarioConfig).map(([key, config]) => {
            const scenario = scenarios[key as ScenarioKey]
            const sumRevenue = scenario.revenue.reduce((sum, value) => sum + value, 0)
            const sumSpend = scenario.spend.reduce((sum, value) => sum + value, 0)
            const sumOrders = scenario.orders.reduce((sum, value) => sum + value, 0)

            return (
              <div className="forecast-tool-table-section" key={key}>
                <h3 style={{ color: config.color }}>
                  {config.label} - AOV ${scenario.aov}
                </h3>
                <div className="forecast-tool-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Revenue</th>
                        <th>Ad spend</th>
                        <th>Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map((month, index) => (
                        <tr key={month}>
                          <td>{month}</td>
                          <td>{money(scenario.revenue[index])}</td>
                          <td>{money(scenario.spend[index])}</td>
                          <td>{number(scenario.orders[index])}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total</td>
                        <td>{money(sumRevenue)}</td>
                        <td>{money(sumSpend)}</td>
                        <td>{number(sumOrders)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
          <p className="forecast-tool-note">
            Orders = revenue / scenario AOV. Ad spend = revenue / MER. AOV and MER are held flat across months per
            scenario - adjust them above to test sensitivity.
          </p>
        </section>
      </div>
    </main>
  )
}
