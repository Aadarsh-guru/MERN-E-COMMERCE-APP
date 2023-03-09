import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { AuthContext } from '../../context/AuthProvider'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {

  const { auth, setAuth } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(()=>{
    const { name, email, password, phone, address } = auth?.user;
    setName(name)
    setEmail(email)
    setPassword(password)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put('/api/v1/auth/profile', { name, email, password, phone, address })
      if (data?.error) {
        toast.error(data.error)
      }else{
        setAuth({...auth, user: data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Profile Updated successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }



  return (
    <Layout title={"Your Profile"} >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-controller">
              <h1 className='m-5'>User Profile</h1>
              <form onSubmit={handleSubmit} >
                <div className="mb-3">
                  <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Passward' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">UPDATE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile