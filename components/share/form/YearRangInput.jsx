import * as Slider from '@radix-ui/react-slider'
import { useEffect } from 'react'

export function YearRangInput({ form, name, label, ...props }) {
  const rawValue = form.watch(name) ?? ['', '']
  const value = Array.isArray(rawValue) ? rawValue : ['', '']

  const defaultMin = 0
  const defaultMax = 10

  // ✅ Set default if untouched
  useEffect(() => {
    const isEmpty =
      !Array.isArray(value) || value.some((v) => v === '' || v == null)
    if (isEmpty) {
      form.setValue(name, [defaultMin, defaultMax])
    }
  }, [])

  const handleSliderChange = (newValue) => {
    if (newValue[0] > newValue[1]) {
      alert('Min value cannot be greater than max value')
      return
    }
    form.setValue(name, newValue)
  }

  const sliderValue = [
    isNaN(parseInt(value[0])) ? defaultMin : parseInt(value[0]),
    isNaN(parseInt(value[1])) ? defaultMax : parseInt(value[1]),
  ]

  return (
    <div className="flex flex-col gap-2 w-full max-w-md mt-5">
      {label && (
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <label>
            {label}:{' '}
            <span className="text-[#b82025]">{sliderValue[0]}</span> –{' '}
            <span className="text-[#b82025]">{sliderValue[1]}</span>
          </label>
        </div>
      )}

      <Slider.Root
        className="relative flex w-full touch-none select-none items-center h-5"
        value={sliderValue}
        onValueChange={handleSliderChange}
        min={defaultMin}
        max={defaultMax}
        step={1}
        {...props}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-[#b82025] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow" />
        <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow" />
      </Slider.Root>
    </div>
  )
}
