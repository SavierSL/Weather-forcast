import { WeatherHook } from '@/components/hooks/weatherHook';
import { InputField } from '@/components/InputField';
import { WeatherTable } from '@/components/weatherTable';
import { Wrapper } from '@/components/wrapper';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {
    const {
        getUserData,
        user,
        rerender,
        setRerender,
        humanDate,
        weatherData,
        router,
        getWeatherForecast } = WeatherHook();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            router.push('/');
        }
        getUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender])

    return (
        <Wrapper >
            <Box mt={4}>
                <Flex>
                    <Button ml={"auto"} onClick={() => {
                        localStorage.removeItem('accessToken')
                        setRerender(!rerender);
                    }}>
                        Log out
                    </Button>
                </Flex>
                <Box mt={100}>
                    <Formik initialValues={{ city: "" }} onSubmit={async ({ city }) => {
                        return getWeatherForecast(city);
                    }}>
                        {({ isSubmitting }) => {
                            return (
                                <Form>
                                    <Heading as='h3' size='2xl' noOfLines={3}> Hi! <span style={{ color: 'darkcyan' }}>{user.name}</span>, </Heading>
                                    <Heading as='h1' size='4xl' noOfLines={6}>
                                        Welcome to the weather forecast application!</Heading>
                                    <Box mt={3}> <span style={{
                                        fontSize: '15px'
                                    }}>{user.url}</span></Box>
                                    <Box mt={50}>
                                        <InputField name='city' label='City Name' placeholder='City Name' />
                                        <Button mt={5} type='submit' isLoading={isSubmitting}>Display Weather</Button>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </Box>
                <WeatherTable weatherData={weatherData} humanDate={humanDate} />
            </Box>
        </Wrapper>);
}

export default Home;