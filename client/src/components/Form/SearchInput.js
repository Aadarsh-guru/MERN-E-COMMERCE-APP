import React, { useContext } from 'react'
import { SearchContext } from '../../context/SearchProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {

  const { values, setValues } = useContext(SearchContext)

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    try {
      e.preventDefault()
      const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
      setValues({...values, results: data })
      navigate('/search')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit} >
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
        <button className="btn btn-outline-secondary" type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchInput