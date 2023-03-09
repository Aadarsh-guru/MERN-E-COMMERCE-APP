import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/auth/login', { email, password })
            if (response.data.success) {
                toast.success(response.data.message)
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                })
                localStorage.setItem('auth', JSON.stringify(response.data))
                navigate(location.state || '/')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }


    return (
        <Layout title={'Login'}>
            <div className="form-controller">
                <h1 className='m-5'>Login page</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Passward' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='m-2 text-center' >
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-secondary" onClick={() => { navigate('/forgot-password') }} >Forgot Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login