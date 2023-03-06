import axios from 'axios'
import { useState } from 'react'

export const IndexHook = () => {
    const [token, setToken] = useState<string | null>(null)
    const getAccessToken = async (codeParam: string) => {
        const { data } = await axios.get("http://localhost:5000/user?code=" + codeParam)
        if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token)
            setToken(localStorage.getItem('accessToken'))
        }
    }
    return { token, getAccessToken };
}