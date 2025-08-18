'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import FormSelectField from '../share/form/FormSelect'
import { StatusData, TypeData } from '../constants/StaticData'
import SkillApi from '@/services/settings/SkillApi'

const SkillForm = ({ setSubmitOpenModal, fetchList, editData }) => {
    const form = useForm({
        defaultValues: {
            title: '',
            type: '',
            status: ''
        },
    })

    const editId = editData?.id || ''
    useEffect(() => {

        setTimeout(()=>{
            if (editData) {
                const data = {
                    title: editData.title || '',
                    type: editData.type || '',
                    status: String(editData.status ?? '')
                }
                form.reset(data) 
            }
        },1000)
      
    }, [editData])
    

    const onSubmit = async (data) => {
        try {
            const response = editData
                ? await SkillApi.editSkill(editId, data)
                : await SkillApi.addSkill(data)

            if (response.status === 200) {
                setSubmitOpenModal(false)
                fetchList()
                successMessage({ description: response?.data?.message })
            }
        } catch (error) {
            console.error('Form submission error:', error)
            errorMessage({ description: error?.message })
        }
    }

    // Optional: Log form type on change
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'type') {
                console.log('Current type:', value?.type)
            }
        })
        return () => subscription.unsubscribe()
    }, [form])

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-4'>
                    <FormInputField
                        form={form}
                        name='title'
                        label='Title'
                        placeholder='Enter Title'
                    />

                    <FormSelectField
                        name='type'
                        label='Type'
                        form={form}
                        options={TypeData}
                        className='colum-box-bg-change'
                    />
                </div>

                <div className='grid grid-cols-1 gap-4 mt-2'>
                    <FormSelectField
                        name='status'
                        label='Status'
                        form={form}
                        options={StatusData}
                        className='colum-box-bg-change'
                    />
                </div>

                <div className='mt-4 flex justify-end gap-4'>
                    <Button type='submit' className='site-button'>
                        {editData ? 'Update' : 'Submit'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default SkillForm
