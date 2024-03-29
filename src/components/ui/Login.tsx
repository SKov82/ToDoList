import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import {authMe} from '../../state/app-reducer';
import {useDispatch} from 'react-redux';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (!/^[A-Z0-9._%+-]{4,}$/i.test(values.password)) {
                errors.password = 'The password must contain more than 3 characters'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(authMe({
                type: 'login',
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe
            }))
        },
    })

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel style={{fontWeight: 600}}>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null
                        }
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password
                            ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                            : null
                        }
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox checked={formik.values.rememberMe}
                                                             {...formik.getFieldProps('rememberMe')}
                                          />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}