import FileUpload from "@/components/share/form/FileUpload"
import FormInputField from "@/components/share/form/FormInputField"
import { MultiImageUploader } from "@/components/share/form/MultiFileUpload"
import SelectFilter from "@/components/share/form/SelectFilter"
import TextEditor from "@/components/share/form/TextEditor"
import api from "@/lib/api"
import { useEffect, useState } from "react"
import MainTabSideBar from "./MainTabSideBar"


const MainTab = ({ form, setImageUpload, updateImage }) => {
  const [brand, setBrand] = useState()
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await api.get(`/brands?limit=100&take_all=true`)
        if (response.status === 200) {
          const modifyProjectData = response?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })

          setBrand(modifyProjectData)
        }
      } catch (error) {
        console.log("error",error)
      }
    }
    fetchBrand()
  }, [])
  return (
    <>
      <div className='mb-6 flex gap-4'>
        <div className='w-3/4'>
          <div className='grid grid-cols-2 gap-4'>
            <FormInputField
              form={form}
              name='sku'
              placeholder='Enter Sku'
              label='SKU'
            />
            <SelectFilter
              form={form}
              name='brand_id'
              placeholder='Enter Brand'
              label='Brand'
              options={brand}
            />
            <FileUpload form={form} name='image' label='MainImage' className={'h-12'}/>

            <FormInputField
              form={form}
              name='short_description'
              label='Short Description'
              placeholder='Enter Description'
            />
          </div>
          <div className='grid grid-cols-1 mt-4'>
          <TextEditor
            form={form}
            name='description'
            label='Long Description'
            placeholder='Enter Description'
          />
          </div>
          <div className='grid grid-cols-1 mt-4'>
          <MultiImageUploader
            setImageUpload={setImageUpload}
            updateImage={updateImage}
          />
          </div>
        </div>
        <div className='rounded-6 bg-gray-light mt-4 w-1/4 border border-slate-200 p-3.5'>
          <MainTabSideBar form={form} />
        </div>
      </div>
    </>
  )
}

export default MainTab
