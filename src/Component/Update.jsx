import React, { useEffect, useState } from 'react'
import { Grid, Button, Box, Paper, TextField, styled } from '@mui/material'
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useDispatch, useSelector } from 'react-redux';
import { productDetails, productUpdate } from '../Redux/CrudSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from '../AxiosInstance/axiosInstance';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const Update = () => {
    const { id } = useParams()
    const [images, setImage] = useState()
    const [user, setUser] = useState({
        title: "",
        description: ""
    })
    const { updates: update } = useSelector((state) => state?.crud)
    const {redirect} = useSelector((s) => s?.crud)
    console.log(update)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }
    console.log(user)
    useEffect(() => {
        dispatch(productDetails(id))
    }, [id])

    useEffect(() => {
        if (update !== null) {
            setUser({
                title: update?.title,
                description: update?.description
            })
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append("title", user.title)
        formdata.append("description", user.description)
        formdata.append("image", images)
        formdata.append("id", id)
        dispatch(productUpdate(formdata))
    }

    const redirectToProduct = () => {
        const title = localStorage.getItem("title")
        const isUpdatepage = window.location.pathname.toLowerCase() === `/update/${id}`
        if(title !== null && title !== undefined && title !== ""){
            isUpdatepage && navigate("/product")
        }
    }

    useEffect(() => {
        redirectToProduct()
    },[redirect])
    return (
        <>
            <div class="d-flex justify-content-center w-100 vh-200 body">

                <div class="">
                    <Grid>
                        <Paper style={{ padding: "20px", height: '65vh', width: "450px", marginTop: '20px', border: "1px solid #E7F651" }}>
                            <Grid align='center'>
                                <h3 className='text-black pt-1 text'>Update Product</h3>
                            </Grid>
                            <Box component='form' onSubmit={onSubmit} style={{ marginTop: '50px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label='Title' style={{ width: "410px" }} name="title" value={user.title} onChange={handleUpdate}/>
                                        <span></span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label='Description' style={{ width: "410px" }} name="description" value={user.description} onChange={handleUpdate}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            component="label"
                                            style={{ backgroundColor: "#E7F651" }}
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Photo
                                            <VisuallyHiddenInput type="file" onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
                                        </Button>
                                        {images !== "" && images !== undefined && images !== null ?
                                            (<img
                                                height="40px"
                                                src={URL.createObjectURL(images)}
                                                alt=""
                                                className="upload-img"
                                            />
                                            ) : (
                                                <>
                                                    {update?.image === "" ?
                                                        (<img
                                                            height="70px"
                                                            src={Image}
                                                            alt=""
                                                            className="upload-img"
                                                        />
                                                        ) : (
                                                            <img
                                                                height="60px"
                                                                src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${update?.image}`}
                                                                alt=""
                                                                className="upload-img"
                                                            />
                                                        )}
                                                </>
                                            )}
                                        {images === "" && (
                                            <p>Drag or drop content here</p>
                                        )}
                                    </Grid>
                                </Grid>
                                <div className='mt-3'>
                                    <Button type='submit' variant='contained' style={{ backgroundColor: "#E7F651" }} fullWidth>Update</Button>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Update