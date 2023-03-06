import { convertEpochTimeToString } from '@/utils/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';


interface UserI {
    login: string;
    name: string;
    url: string;
}

export const WeatherHook = () => {
    const [user, setUser] = useState<UserI>({ login: "", name: "", url: "" })
    const [rerender, setRerender] = useState<boolean>(true);
    const [weatherData, setWeatherData] = useState<any>()
    const humanDate = convertEpochTimeToString(weatherData?.dt);
    const router = useRouter();

    const getUserData = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/user/user-data", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('accessToken')
                }
            });
            setUser({ login: data.login, name: data.name, url: data.url })

        } catch (error: any) {
            console.log(error.message)
        }
    }
    const getWeatherForecast = async (city: string) => {
        try {
            const { data } = await axios.post("http://localhost:5000/weather", { city: city }, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            setWeatherData(data)

        } catch (error: any) {
            console.log(error.message)
        }
    }

    return {
        user,
        setUser,
        getUserData,
        setRerender,
        rerender,
        weatherData,
        setWeatherData,
        humanDate,
        router,
        getWeatherForecast
    };
}