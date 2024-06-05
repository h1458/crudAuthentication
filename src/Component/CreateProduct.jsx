import React, { useEffect, useState } from 'react'
import { Box, Paper, Button, Grid, TextField, styled } from '@mui/material'
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useDispatch, useSelector } from 'react-redux';
import { productCreate } from '../Redux/CrudSlice';
import { useNavigate } from 'react-router-dom';

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

const CreateProduct = () => {

    const initialState = {
        title: "",
        description: ""
    }

    const {redirect} = useSelector((s)=> s.crud)

    
    const [images, setImage] = useState()
    const [error, setError] = useState({});
    const [user, setUser] = useState(initialState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // console.log("helo", user)

    let name, value;
    const postUserData = (e) => {
      name = e.target.name;
      value = e.target.value;
  
      if (name === "title") {
        if (value.length === 0) {
          setError({ ...error, title: "Title is Required" });
          setUser({ ...user, title: "" });
        } else {
          setError({ ...error, title: "" });
          setUser({ ...user, title: value });
        }
      }
  
      if (name === "description") {
        if (value.length === 0) {
          setError({ ...error, description: "Description is Required" });
          setUser({ ...user, description: "" });
        } else {
          setError({ ...error, description: "" });
          setUser({ ...user, description: value });
        }
      }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("title", user.title);
        formData.append("description", user.description);
        formData.append("image", images)
        dispatch(productCreate(formData))
    }

    const redirectToproduct = () => {
        const title = localStorage.getItem('title')
        const isCreateProduct = window.location.pathname.toLowerCase() === "/createpro"
        if(title !== null && title !== undefined && title !== ""){
            isCreateProduct && navigate("/product")
        }
    }

    useEffect(()=>{
        redirectToproduct()
    },[redirect])

    return (
        <>
            <div class="d-flex justify-content-center w-100 vh-200 body">

                <div class="">
                    <Grid>
                        <Paper style={{ padding: "20px", height: '65vh', width: "450px", marginTop: '20px', border: "1px solid #E7F651" }}>
                            <Grid align='center'>
                                <h3 className='text-black pt-1 text'>Create Product</h3>
                            </Grid>
                            <Box component='form' onSubmit={onSubmit} style={{ marginTop: '50px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label='Title' style={{ width: "410px" }} name="title" onChange={postUserData} Value={user.title} />
                                        <span>{error.title}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label='Description' style={{ width: "410px" }} name="description" onChange={postUserData} Value={user.description}/>
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
                                        {images !== "" && images !== undefined && images !== null ? (
                                            <img style={{ height: "120px", width: "150px" }}
                                                src={URL.createObjectURL(images)}
                                                alt='' />
                                        ) : (
                                            <>{images === "" && <p>Photo is not Uploaded</p>}</>
                                        )}
                                    </Grid>
                                </Grid>
                                <div className='mt-3'>
                                    <Button type='submit' variant='contained' style={{ backgroundColor: "#E7F651" }} fullWidth>Create</Button>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default CreateProduct