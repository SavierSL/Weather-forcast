import { Box, Button, Flex, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik';
import { InputField } from '@/components/InputField';
import { Wrapper } from '@/components/wrapper';
import axios from 'axios';

interface HomeProps {

}
interface UserI {
    login: string;
    name: string;
    url: string;
}

const Home: React.FC<HomeProps> = ({ }) => {
    const [rerender, setRerender] = useState<boolean>(true);
    const [weatherData, setWeatherData] = useState<any>()
    const [user, setUser] = useState<UserI>({ login: "", name: "", url: "" })
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            router.push('/');
        }
        getUserData()
    }, [rerender])
    const getWeatherForecast = async (city: string) => {
        const data = await axios.post("http://localhost:5000/home", { city: city }, {
            headers: {
                'Accept': 'application/json'
            }
        })
        setWeatherData(data.data)

    }
    const getUserData = async () => {
        const { data } = await axios.get("http://localhost:5000/user/getUser", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            }
        });

        setUser({ login: data.login, name: data.name, url: data.url })

    }

    console.log(user)
    const epochTime = weatherData?.dt; // example epoch time in seconds
    const date = new Date(epochTime * 1000); // convert to milliseconds and create Date object
    const humanDate = date.toLocaleString();
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