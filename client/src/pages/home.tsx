import { Box, Button, Flex, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik';
import { InputField } from '@/components/InputField';
import { Wrapper } from '@/components/wrapper';
import axios from 'axios';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {
    const [rerender, setRerender] = useState<boolean>(true);
    const [weatherData, setWeatherData] = useState<any>()
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            router.push('/');
        }
    }, [rerender])
    const getWeatherForecast = async (city: string) => {
        const data = await axios.post("http://localhost:5000/home", { city: city }, {
            headers: {
                'Accept': 'application/json'
            }
        })
        setWeatherData(data.data)

    }
    console.log(weatherData)
    const epochTime = weatherData?.dt; // example epoch time in seconds
    const date = new Date(epochTime * 1000); // convert to milliseconds and create Date object
    const humanDate = date.toLocaleString();
    return (
        <Wrapper >
            <Box mt={4}>
                <Button marginLeft='100%' onClick={() => {
                    localStorage.removeItem('accessToken')
                    setRerender(!rerender);
                }}>
                    Log out
                </Button>
                <Box mt={100}>
                    <Formik initialValues={{ city: "" }} onSubmit={async ({ city }) => {
                        return getWeatherForecast(city);
                    }}>
                        {({ isSubmitting }) => {
                            return (
                                <Form>
                                    <Heading as='h1' size='4xl' noOfLines={6}>Welcome to the weather forecast application!</Heading>
                                    <Box mt={50}>
                                        <InputField name='city' label='City Name' placeholder='City Name' />
                                        <Button mt={5} type='submit' isLoading={isSubmitting}>Display Weather</Button>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </Box>
                <Box mt={12}>
                    {
                        weatherData ? <TableContainer>
                            <Table variant='simple'>
                                <TableCaption>Imperial to metric conversion factors</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th>Temp(C)</Th>
                                        <Th isNumeric>Description</Th>
                                        <Th>Main</Th>
                                        <Th>Pressure</Th>
                                        <Th>Humidity</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>{weatherData ? humanDate : null}</Td>
                                        <Td>{weatherData ? weatherData.main.temp : null}</Td>
                                        <Td isNumeric>{weatherData ? weatherData.weather[0].description : null}</Td>
                                        <Td isNumeric>{weatherData ? weatherData.weather[0].main : null}</Td>
                                        <Td isNumeric>{weatherData ? weatherData.main.pressure : null}</Td>
                                        <Td isNumeric>{weatherData ? weatherData.main.humidity : null}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer> : null
                    }
                </Box>
            </Box>
        </Wrapper>);
}

export default Home;