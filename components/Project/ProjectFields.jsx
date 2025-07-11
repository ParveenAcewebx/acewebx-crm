import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import FinancialTab from './FinancialTab'
import InfoTab from './InfoTab'

const ProjectFields = ({ form ,updateImage, setImageUpload}) => {


  return (
    <>
      <Tabs defaultValue='info'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='info'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Info
          </TabsTrigger>
          <TabsTrigger
            value='financial'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Financial
          </TabsTrigger>
        </TabsList>

        <TabsContent value='info'>
          <InfoTab form={form} updateImage={updateImage} setImageUpload={ setImageUpload} />
        </TabsContent>

        <TabsContent value='financial'>
          <FinancialTab form={form} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ProjectFields
