import React, { useState } from 'react'
import { Typography, Box, Grid, TextField, Avatar, Button, Paper, styled } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { useMutation } from '@tanstack/react-query'
import { RegisterApi } from '../Registerapi/registerfun'
import { toast } from 'react-toastify'
import CloudUploadIcon from "@mui/icons-material/CloudUpload"


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
const Register = () => {
    const [images, setImage] = useState()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const mutation = useMutation({
        mutationFn: RegisterApi,
        onSuccess: (data) => {
            toast(data.message)
            navigate('/login')
        },
        onError: (data) => {
            toast(data.message)
            console.log("error")
        }
    })

    const onSubmit = (data) => {
        let formdata = new FormData()
        formdata.append("first_name", data.first_name)
        formdata.append("last_name", data.last_name)
        formdata.append("email", data.email)
        formdata.append("password", data.password)
        formdata.append("profile_pic", images)

        mutation.mutate(formdata)
    }
    return (
        <>
            <div class="d-flex justify-content-center w-100 vh-200 body">

                <div class="">
                    <Grid>
                        <Paper style={{ padding: "20px", height: '85vh', width: "450px", marginTop: '20px', border: "1px solid #E7F651" }}>
                            <Grid align='center'>
                                <Avatar style={{ backgroundColor: "#C8B002" }}><AppRegistrationIcon /></Avatar>
                                <h3 className='text-white pt-1 text'>Sign Up</h3>
                            </Grid>
                            <Box component='form' onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '50px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField label='FirstName' placeholder='FirstName*'
                                            {...register('first_name', { required: true })}
                                        />
                                        {errors?.first_name?.type === "required" && <p style={{ color: 'red' }}>This field is Required</p>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label='LastName' placeholder='LastName*'
                                            {...register('last_name', { required: true, maxLength: 10 })}
                                        />
                                        {errors?.last_name?.type === 'required' && <p style={{ color: 'red' }}>This field is Required</p>}

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label='Email' name="email" style={{ width: "410px" }} placeholder='Email*'
                                            {...register('email', { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ })}
                                        />
                                        {errors?.email?.type === 'required' && <p style={{ color: 'red' }}>This Field is Required</p>}
                                        {errors?.email?.type === 'pattern' && <p style={{ color: 'red' }}>Email address must be a valid address</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label='Password' name="password" type='password' style={{ width: "410px" }}
                                            {...register('password', { required: true })}
                                        />
                                        {errors?.password?.type === 'required' && <p style={{ color: 'red' }}>This field is Required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            component="label"
                                            style={{backgroundColor: "#E7F651"}}
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
                                <Typography className='mt-2'> Already have an account? &nbsp;
                                    <Link to='/login' underline="none">
                                        Sign In
                                    </Link>

                                </Typography>
                                <div className='mt-3'>
                                    <Button type='submit' variant='contained' style={{backgroundColor: "#E7F651"}} fullWidth>Register</Button>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Register