import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'


export default function PrivateRoute(){
    const [ok, setOk] = useState(false)
    const { auth } = useContext(AuthContext)

    useEffect(()=>{
        const authCheck = async()=>{
            const res = await axios.get('/api/v1/auth/user-auth') 
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    },[auth?.token])

    return ok? <Outlet/> : <Spinner/>

}