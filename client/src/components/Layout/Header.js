import { NavLink, Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { CartContext } from "../../context/CartProvider"
import toast from "react-hot-toast"
import SearchInput from "../Form/SearchInput"
import useCategory from "../../hooks/useCategory"
import { Badge } from 'antd'

const Header = () => {

  const { auth, setAuth } = useContext(AuthContext)
  const { cart, setCart } = useContext(CartContext)
  const categories = useCategory()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth')
    toast.success('user logout successfully')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">E-Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to='/category' data-bs-toggle="dropdown">
                  Category
                </NavLink>
                <ul className="dropdown-menu">
                  {categories?.map(c => (
                    <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" aria-current="page" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                    </li>
                  </>
                )
                  :
                  (<>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" to='/dashboard' data-bs-toggle="dropdown">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} >Dashboard</Link></li>
                        <li><Link className=" dropdown-item" onClick={() => handleLogout()} aria-current="page" to="/login">LogOut</Link></li>
                      </ul>
                    </li>
                  </>)
              }
              <li className="nav-item">              
                  <NavLink className="nav-link" aria-current="page" to="/cart">Cart<Badge count={cart?.length} showZero ></Badge></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header