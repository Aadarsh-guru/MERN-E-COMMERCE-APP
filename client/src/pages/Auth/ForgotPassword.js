import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Layout title={'forgot-password'} >
            <div className="form-controller">
                <h1 className='m-5'>Reset Password</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter the secret answer' value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter New Passward' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className='m-2 text-center' >
                        <button type="submit" className="btn btn-primary">Reset</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword