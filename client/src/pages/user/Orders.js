import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { AuthContext } from '../../context/AuthProvider'
import moment from 'moment'

const Orders = () => {

  const [orders, setOrders] = useState([])

  const { auth } = useContext(AuthContext)

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/orders`)
      if (auth?.token) setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line
  }, [auth?.token])

  return (
    <Layout title={'Your Orders'} >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow m-2 px-2">
                  <table className='table' >
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Qantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td key={o._id} >{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="col-md-12">
                      {o?.products?.map((p) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                          <div className="col-md-4">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              height='200px'
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders