'use client'

import { colorPalette } from '@/components/DefaultValues/pipelineDashboard'
import { errorMessage } from '@/components/ToasterMessage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PipelineDashboardServices } from '@/services/Pipeline/pipeline'
import { Chart } from 'chart.js/auto'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function PipelineDashboard() {
  // Color palette to assign dynamic colors

  const [pipelineData, setPipeLineData] = useState({})
  const [tabColors, setTabColors] = useState({}) // 🟢 dynamic colors

  const getpipelineDashboard = async () => {
    try {
      const response = await PipelineDashboardServices.getPipelineDashboard()
      console.log('response', response)

      if (response.data.status === true) {
        const data = response.data.data
        setPipeLineData(data)

        // Dynamically create tabColors map
        const newTabColors = {}
        Object.values(data).forEach((tab, index) => {
          newTabColors[tab.value] = colorPalette[index % colorPalette.length]
        })
        setTabColors(newTabColors)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getpipelineDashboard()
  }, [])

  console.log('pipelineDatqa', pipelineData)

  const [activeTab, setActiveTab] = useState('leadPipeline')
  const chartRefs = useRef({})

  const getChartId = (tab, index) => `chart-${tab}-${index}`

  const createChart = (canvasId, data) => {
    const ctx = document.getElementById(canvasId)?.getContext('2d')
    if (!ctx) return

    if (chartRefs.current[canvasId]) {
      chartRefs.current[canvasId].destroy()
    }

    chartRefs.current[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Hot', 'Delayed', 'Status Overdue', 'Hold'],
        datasets: [
          {
            data: [
              parseInt(data.hot),
              parseInt(data.delayed),
              parseInt(data.statusOverdue),
              parseInt(data.hold)
            ],
            backgroundColor: ['#FF708F', '#36A2EB', '#FFCE56', '#F52F5A']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    })
  }

  useLayoutEffect(() => {
    Object.values(chartRefs.current).forEach(chart => chart?.destroy())
    chartRefs.current = {}

    const currentPipeline = pipelineData[activeTab]
    if (currentPipeline) {
      currentPipeline.status.forEach((item, index) => {
        const id = getChartId(activeTab, index)
        createChart(id, item)
      })
    }
  }, [activeTab, pipelineData])

  const PipelineCards = ({ data, tab }) => {
    if (!data.status.length) {
      return (
        <div className='flex h-40 items-center justify-center text-gray-500'>
          No data found
        </div>
      )
    }

    return (
      <div className='flex flex-wrap gap-4'>
        {data.status.map((item, index) => {
          const legendData = [
            { label: 'Hot', value: parseInt(item.hot), color: '#FF708F' },
            {
              label: 'Delayed',
              value: parseInt(item.delayed),
              color: '#36A2EB'
            },
            {
              label: 'Status Overdue',
              value: parseInt(item.statusOverdue),
              color: '#FFCE56'
            },
            { label: 'Hold', value: parseInt(item.hold), color: '#F52F5A' }
          ]
          const maxLegendValue = Math.max(...legendData.map(l => l.value))
          const isAllZero = legendData.every(l => l.value === 0)

          return (
            <div key={index} className='child-papline-outer'>
              <div className='mb-2 flex items-center justify-center gap-4'>
                <span className='text-lg font-semibold'>{item.status}</span>
                <span className='graph-qtyp flex h-10 w-10 items-center justify-center rounded-full border text-lg font-bold text-black'>
                  {item.qty}
                </span>
              </div>
              {isAllZero ? (
                <div className='flex h-40 items-center justify-center text-gray-500'>
                  No data available yet
                </div>
              ) : (
                <div className='flex w-full'>
                  <div className='w-1/2 p-2'>
                    <canvas id={getChartId(tab, index)} height='200'></canvas>
                  </div>
                  <div className='flex w-1/2 flex-col justify-center p-2'>
                    {legendData.map((l, idx) => {
                      const barWidth = (l.value / maxLegendValue) * 100
                      return (
                        <div key={idx} className='mb-1 flex items-center'>
                          <div className='mr-2 w-24 text-sm'>{l.label}</div>
                          <div className='progress-bar relative mr-2 h-3 flex-1 rounded bg-gray-200'>
                            <div
                              className='h-3'
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: l.color
                              }}
                            ></div>
                          </div>
                          <div className='w-6 text-right text-xs font-semibold'>
                            {l.value}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className='p-4'>
      <h1 className='mb-8 text-4xl font-bold'>Pipeline Dashboard</h1>
      <Tabs defaultValue='leadPipeline' onValueChange={setActiveTab}>
        <TabsList className='mb-4 rounded bg-gray-100 p-1 !text-2xl'>
          {Object.values(pipelineData).map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`rounded-none px-8 py-2 !text-xl !font-normal !text-black ${
                activeTab === tab.value
                  ? 'border-b-4 border-black font-semibold shadow-sm'
                  : ''
              }`}
              style={{ backgroundColor: tabColors[tab.value] || '#F5F5F5' }}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div
          className='rounded-md p-4 transition-all duration-300'
          style={{ backgroundColor: tabColors[activeTab] || '#F5F5F5' }}
        >
          {Object.values(pipelineData).map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <PipelineCards data={tab} tab={tab.value} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
