import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function useApi(urls = '') {
    const { token } = useSelector((s) => s.users)

    const [requests, setRequests] = useState({
        baseURL: process.env.REACT_APP_BASEURL || urls,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    useEffect(() => {
        setRequests({
            ...requests,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }, [])

    return axios.create(requests)
}

export default useApi