import { useState, createContext, useEffect } from 'react'

export const CartContext = createContext(null)

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    useEffect(()=>{
        let cartData = localStorage.getItem('cart')
        if (cartData) {
           setCart(JSON.parse(cartData)) 
        }
    },[])

    return (
        <CartContext.Provider value={{
            cart,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider