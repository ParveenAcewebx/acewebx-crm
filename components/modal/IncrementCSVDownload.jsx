'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { startOfWeek, endOfWeek, subDays } from 'date-fns'
import Link from 'next/link'
import FormInputFileUploaderSingleCSV from '../share/form/FormInputFileUploaderSingleCSV'
import { useEffect } from 'react'

const IncrementCSVDownload = ({ isOpen, onClose, handleDownloadCSV, skillsData }) => {

    const form = useForm()
    useEffect(() => {
        form.setValue("file", "")

    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger />
            <DialogContent className="!top-4 !translate-y-0 w-full max-w-[40vw]"
                onInteractOutside={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <DialogTitle>Import Increment CSV</DialogTitle>
                <div>
                    <FormProvider {...form}>
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                form.handleSubmit(handleDownloadCSV)()
                            }}
                        >



                            <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                                <FormInputFileUploaderSingleCSV
                                    name='file'
                                    control={form.control}
                                    form={form}
                                    label='Drop CSV here or click to upload*'
                                />            </div>

                            <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                            </div>
                            <div className='mb-4 grid grid-cols-2 gap-6 md:grid-cols-2'>


                            </div>


                            <div className="flex justify-between items-center gap-4 mt-4">
                                <Button type="submit" className="site-button">
                                    Import CSV
                                </Button>
                                {/* <span> */}
                                <Link href="../sample-emplyee-increment-import.csv" target="_blank" >  Download Sample File</Link>
                                {/* </span> */}
                            </div>

                        </form>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default IncrementCSVDownload
