'use client'
import PasswordInput from '@/components/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { errorMessage } from '../ToasterMessage'
import LoadingButton from '../loading-button'
import FormInputField from '../share/form/FormInputField'

export default function Login() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const router = useRouter()
  const form = useForm({
    // resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSubmit(data) {
    const { email, password } = data

    setIsSigningIn(true)

    try {
      const signInResponse = await signIn('credentials', {email, password,
        redirect: false
      })


      if (signInResponse?.status === 401) {
        errorMessage({ description: 'Invalid email or password' })
        return
      }

      if (!signInResponse?.ok) {
        errorMessage({
          description: signInResponse?.error || 'An error occurred'
        })
        return
      }

      form.reset()
      router.replace('/dashboard')
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <section className='custom-box-shadow w-full max-w-lg space-y-6 rounded-lg bg-background px-6 py-8'>
        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormInputField
              control={form.control}
              name='email'
              label='Email'
              type='email'
              placeholder='Enter your email'
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id='password'
                      className='border-color-grey h-12 bg-white'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col items-center space-y-4 pt-4'>
              <LoadingButton
                loading={isSigningIn}
                className='site-button'
                loadingText='Signing In...'
              >
                Sign In
              </LoadingButton>
            </div>
          </form>
        </Form>
      </section>
    </div>
  )
}
