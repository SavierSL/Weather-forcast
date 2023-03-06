import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

interface WeatherTableProps {
    weatherData: any;
    humanDate: any;
}

export const WeatherTable: React.FC<WeatherTableProps> = ({ weatherData, humanDate }) => {
    return (<>
        <Box mt={12}>
            {
                weatherData ? <TableContainer>
                    <Table variant='simple'>
                        <Thead background={'lightcyan'}>
                            <Tr>
                                <Th textAlign="center">Date</Th>
                                <Th textAlign="center">Temp(C)</Th>
                                <Th textAlign="center" isNumeric>Description</Th>
                                <Th textAlign="center">Main</Th>
                                <Th textAlign="center">Pressure</Th>
                                <Th textAlign="center">Humidity</Th>
                            </Tr>
                        </Thead>
                        <Tbody background={'lightseagreen'}>
                            <Tr>
                                <Td color={'white'} isNumeric textAlign="center">{weatherData ? humanDate : null}</Td>
                                <Td color={'white'} textAlign="center">{weatherData ? weatherData.main.temp : null}</Td>
                                <Td color={'white'} textAlign="center">{weatherData ? weatherData.weather[0].description : null}</Td>
                                <Td color={'white'} isNumeric textAlign="center">{weatherData ? weatherData.weather[0].main : null}</Td>
                                <Td color={'white'} isNumeric textAlign="center">{weatherData ? weatherData.main.pressure : null}</Td>
                                <Td color={'white'} isNumeric textAlign="center">{weatherData ? weatherData.main.humidity : null}<span>%</span></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer> : null
            }
        </Box></>);
}