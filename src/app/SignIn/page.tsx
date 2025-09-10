'use client'
import { useState, useActionState } from 'react'
import { Heading, Button, Input, Link} from '@chakra-ui/react'
import React from 'react'

const page = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [gmailLoading, setGmailLoading] = useState<boolean>(false);

    const [error, submitAction, isPending] = useActionState( 
      async (prevState, formData) => {
            //Extract Form data
            email: formData.get('email');
            password:formData.get('password');
            
            //Call Signin function
            try {
              const {
                success,
                data,
                error: SignInError,
              } = await func;

              //Handle known error (return error)

              if(SignInError) {
                return new Error(SignInError);
              }
              if(success) {
                //Navigate to Dashboard
                return null;
              } 

            } catch (error) {

            }

    }, null)

  return (

    <div className='w-[90%] h-full flex flex-col items-center !m-auto gap-8 !mt-16'>
            <Heading>Signin to your account</Heading>
            <form action={submitAction} className='w-full flex flex-col gap-20'>
            <div className='w-full flex flex-col gap-4'>
            <Input
            onChange={(e) => e.target.value}
            type='email'
            name='email'
            required 
            placeholder='Eg.saptarshi@example.com' />
            <Input
            onChange={(e) => e.target.value}
            type='password'
            name='password'
            required 
            placeholder='password' />
            <Link
            className='!text-gray-400 !text-[10px] !mt-[-8px] !ml-2'
            >Forgot Password?</Link>
            </div>
            <div className='w-full flex flex-col gap-4'>
            <Button loading={loading} variant={'solid'} colorPalette={'teal'}>Sign In</Button>            
            <Button loading={gmailLoading} variant={'solid'} >Sign In with Gmail</Button> 
            </div>
            </form>       
        </div>
  )
}

export default page
