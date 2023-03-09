import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartProvider'
import { toast } from "react-hot-toast";

const CategoryProduct = () => {

    const { cart, setCart } = useContext(CartContext)

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        if (params?.slug) {
            getProductByCat()
        }
    }, [params?.slug])

    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={'category product'}>
            <div className="container mt-3 ">
                <h2 className="text-center">
                 Category - {category[0]?.name}
                </h2>
                <h6 className="text-center">
                    {products?.length} results found
                </h6>
                <div className="row">
                <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}  >More Details</button>
                  <button className="btn btn-secondary ms-1" onClick={() =>{
                    setCart([...cart,p])
                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
                    toast.success('Item Added to Cart')
                  }} >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct