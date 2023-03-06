import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Form, Formik } from 'formik'
import { InputField } from '@/components/InputField'
import { Box, Button } from '@chakra-ui/react'
import { Wrapper } from '@/components/wrapper'
import { Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    async function getAccessToken() {
      const data = await axios.get("http://localhost:5000/user?code=" + codeParam)
      if (data.data.access_token) {
        localStorage.setItem('accessToken', data.data.access_token)
        setToken(localStorage.getItem('accessToken'))

      }
    }

    if (codeParam && (localStorage.getItem('accessToken') === null)) {
      getAccessToken();
    }

  }, [token])


  if (typeof window !== 'undefined') {
    // Perform localStorage action
    if (localStorage.getItem('accessToken')) {
      router.push('/home')

    }
  }


  return (
    <Box mt={100} >
      <Wrapper >
        <Formik initialValues={{ clientId: "0cc16f60158be8d1cc39" }} onSubmit={async ({ clientId }) => {
          return window.location.assign('https://github.com/login/oauth/authorize?client_id=' + clientId);
        }}>
          {({ isSubmitting }) => {
            return (
              <Form>
                <Heading as='h1' size='4xl' noOfLines={6}>Welcome to the weather forecast application!</Heading>
                <Heading mt={5} as='h3' size='md' color={'darkcyan'} noOfLines={6}>Please login with your Github user to use the application and view the weather in your city!</Heading>
                <Box mt={8}>
                  <Button type='submit' isLoading={isSubmitting}>Log in with Github</Button>
                </Box>
              </Form>
            )
          }}
        </Formik>
      </Wrapper>
    </Box>
  )
}
