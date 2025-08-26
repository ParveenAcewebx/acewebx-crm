'use client'

import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export function FormDateRangePicker({
  label,
  name,
  form
}) {
  const [open, setOpen] = useState(false)

  const setRange = (start, end) => {
    form.setValue(name, {
      startDate: start,
      endDate: end,
      key: 'selection',
    })
  }
  useEffect(() => {
    // if(){

    // }
  }, [])
  return (
    <div className="flex flex-col gap-2 ">

      <Controller
        name={name}
        label={label}
        control={form.control}
        render={({ field }) => {
          const { value, onChange } = field

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" style={{ borderRadius: "2px", fontWeight: "300px" }} className="w-full justify-start text-left !py-6 !rounded-xs">
                  <CalendarIcon className="mr-2 h-3.5 w-4" />
                  {value?.startDate
                    ? `${value.startDate.toDateString()} - ${value.endDate.toDateString()}`
                    : 'Select Date'}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-auto dark-calendar-popover"
                // onInteractOutside={(e) => e.preventDefault()}
                // onPointerDownOutside={(e) => e.preventDefault()}
              >
                <div className="text-end">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-lg px-3 py-1 rounded-md  text-gray-400"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex">
                  {/* Presets */}
                  <div className="flex flex-col gap-1 bg-[#b82025] p-4 text-white text-base w-40 !leading-[35px] font-medium">

                    <button onClick={() => setRange(new Date(), new Date())}>Today</button>
                    <button onClick={() => setRange(subDays(new Date(), 1), subDays(new Date(), 1))}>Yesterday</button>
                    <button onClick={() => setRange(startOfWeek(new Date()), endOfWeek(new Date()))}>This Week</button>
                    <button onClick={() => setRange(subDays(startOfWeek(new Date()), 7), subDays(endOfWeek(new Date()), 7))}>Last Week</button>
                    <button onClick={() => setRange(startOfMonth(new Date()), endOfMonth(new Date()))}>This Month</button>
                    <button onClick={() => setRange(startOfMonth(subDays(new Date(), 30)), endOfMonth(subDays(new Date(), 30)))}>Last Month</button>
                  </div>

                  {/* Calendar */}
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => onChange(item.selection)}
                    moveRangeOnFirstSelection={false}
                    ranges={[
                      value || {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]}
                    months={2}
                    direction="horizontal"
                    rangeColors={['#b82025']}
                    className="dark-date-range"
                  />
                </div>
              </PopoverContent>
            </Popover>
          )
        }}
      />
    </div>
  )
}
