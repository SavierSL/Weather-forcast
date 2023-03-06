/* eslint-disable react-hooks/exhaustive-deps */
import { IndexHook } from '@/components/hooks/indexHook'
import { Wrapper } from '@/components/wrapper'
import { getCodeParam } from '@/utils/utils'
import { Box, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const { token, getAccessToken } = IndexHook();
  const router = useRouter();

  useEffect(() => {
    const codeParam = getCodeParam(window.location.search);
    if (codeParam && (localStorage.getItem('accessToken') === null)) {
      getAccessToken(codeParam);
    }
  }, [token])

  if (typeof window !== 'undefined') {
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
