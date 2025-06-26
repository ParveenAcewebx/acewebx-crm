'use client'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const CandidateChart = ({ current = 0, expect = 0 }) => {
  const [percentValue, setPercentValue] = useState(0)

  useEffect(() => {
    if (current > 0 && expect > 0) {
      const percent = Math.round(((expect - current) * 100) / current)
      setPercentValue(percent)
    } else {
      setPercentValue(0)
    }
  }, [current, expect])

  const chartOptions = {
    chart: {
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#8C57FF',
            formatter: function (val) {
              return `${val}%`
            }
          }
        }
      }
    },
    colors: ['#8C57FF'],
    labels: ['AVG. Exceptions']
  }

  return (
    <div className='chart-container' style={{ textAlign: 'center' }}>
      <Chart options={chartOptions} series={[percentValue]} type='radialBar' height={250} />
    </div>
  )
}

export default CandidateChart
