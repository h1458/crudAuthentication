import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList, clearTitle, clearTitles, productRemove } from '../Redux/CrudSlice';
import { Image } from '../AxiosInstance/axiosInstance';

const Product = () => {
  const { List: list, totalpage } = useSelector((state) => state?.crud)
  const [totalRecords, setPage] = useState()
  const navigate = useNavigate()

  const handleChange = (e,page) => {
    setPage(page)
    dispatch(ProductList({
      page: page,
      perpage: 10
    }))
  }
  console.log("total",totalRecords)

  console.log("list", list)
  const dispatch = useDispatch()

  const [delete_id, setDeleted] = useState("")

  useEffect(() => {
    if (delete_id !== "") {
      dispatch(productRemove({ id: delete_id })).then(() => { dispatch(ProductList()) })
    }
  }, [delete_id])

  useEffect(() => {
    dispatch(ProductList())

  }, [list])

  const cleartitle = () => {
    dispatch(clearTitle())
  }
  const removetitle = () => {
    dispatch(clearTitles())
    navigate("/product")
  }

  return (
    <>
      <Link to='/createpro'><button className='btn' onClick={cleartitle} style={{ backgroundColor: "#A6F13F", marginTop: "20px" }}>Create Product</button></Link>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
         {
          list?.length !== 0 ? (<>
           {
            list?.map((lists) => {
              return (
                <>
                  <tr>
                    <td>{lists.title}</td>
                    <td><img src={lists?.image ? Image(lists?.image) : "error"} alt="" style={{ width: "80px", height: '80px' }} /></td>
                    <td>{lists.description}</td>
                    <td><Link to={`/update/${lists?._id}`}><button className='btn' style={{ backgroundColor: "#E7F651" }} onClick={removetitle}>Update</button></Link></td>
                    <td><button className='btn' onClick={() => setDeleted(lists?._id)} style={{ backgroundColor: "#E7F651" }}>Delete</button></td>
                  </tr>
                </>
              )
            })
          }
          </>) : (<>
          <p>No Data Found</p>
          </>)
         }
        </tbody>
      </table>
      <div className='d-flex justify-content-center'>
        {list?.length !== 0 ? (

          <Pagination count={totalpage} onChange={handleChange} totalRecords={totalRecords} />

        ) : (

          <>
          <h2>no product found</h2>
          </>
        )}

      </div>
    </>
  )
}

export default Product