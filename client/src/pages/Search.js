import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchProvider'
import Layout from '../../src/components/Layout/Layout'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartProvider'
import { toast } from "react-hot-toast";

const Search = () => {

    const { values } = useContext(SearchContext)
    const {cart, setCart} = useContext(CartContext)
    const navigate = useNavigate()

    return (
        <Layout title={'search page'} >
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? 'No Products Founde' : `Founde ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap">
                        {values?.results.map((p) => (
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
                                    <button className="btn btn-secondary ms-1" onClick={() => {
                                        setCart([...cart, p])
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

export default Search