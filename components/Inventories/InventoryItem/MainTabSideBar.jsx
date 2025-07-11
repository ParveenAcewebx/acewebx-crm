'use client'

import FormCheckBox from "@/components/share/form/CheckBox"
import { errorMessage } from "@/components/ToasterMessage"
import { CardDescription } from "@/components/ui/card"
import api from "@/lib/api"
import { useEffect, useState } from "react"



const MainTabSideBar = ({ form }) => {
  const [list, setList] = useState([])
  const [tag, setTags] = useState([])
  const getCategories = async () => {
    try {
      const response = await api.get(
        '/product-categories?limit=100&take_all=true'
      )
      if (response.status === 200) {
        setList(response?.data?.data)
      }
    } catch (error) {
      if (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  const getTags = async () => {
    try {
      const response = await api.get('/product-tags?limit=100&take_all=true')
      if (response.status === 200) {
        setTags(response?.data?.data)
      }
    } catch (error) {
      if (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }
  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      <div className="custom-checkbox">
        <CardDescription className='text-black-900 mb-3 mt-3 text-xl font-semibold'>
          Product Category
        </CardDescription>
        <div className='pl-2 '>
          <FormCheckBox
            name='itemCategories'
            form={form}
            label=''
            items={list?.map(item => ({
              label: item.name,
              value: item.id
            }))}
            className='mb-2 flex gap-2 flex-col'
          />
        </div>
      </div>
      <div className="custom-checkbox">
        <CardDescription className='text-black-900 mb-3 mt-5 text-xl font-semibold'>
          Select Tags
        </CardDescription>
        <div className='pl-2'>
          <FormCheckBox
            name='itemTags'
            form={form}
            label=''
            items={tag?.map(item => ({
              label: item.title,
              value: item.id
            }))}
            className='mb-2 flex gap-2 flex-col'
          />
        </div>
      </div>
    </>
  )
}

export default MainTabSideBar
