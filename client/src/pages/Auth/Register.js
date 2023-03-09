import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer })
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
        <Layout title={'Registration'}>
            <div className="form-controller">
                <h1 className='m-5'>Registration page</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Passward' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter secret answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register