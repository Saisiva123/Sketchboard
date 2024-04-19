"use client";

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API } from '@/utils/api.service';
import useSnackbar from '@/utils/useSnackbar';
import Cookies from 'js-cookie';
import '@/app/globals.css';
import {
    CheckCircleIcon,
    ExclamationCircleIcon
} from "@heroicons/react/24/outline";

const MuiTextfieldStylings = {
    "& .MuiInput-underline:after": {
        borderBottomColor: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "black",
    }
};


const Login = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/login');
    }, [router])


    const addSnackbar = useSnackbar();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const [error, setError] = useState("");
    const [formValid, setFormValid] = useState(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
        checkValidation();
    };

    const checkValidation = () => {
        if (!emailRegex.test(user.email)) {
            user.email && setError("Email is not valid")
            setFormValid(false)
        }
        if (!user.email || !user.password) {
            user.email && setError("");
            setFormValid(false)
        }
        if (user.email && user.password && emailRegex.test(user.email)) {
            setError("");
            setFormValid(true)
        }
    }

    const navigateToSignUp = () => {
        router.push("/signup")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            setFormValid(false)
        }
        API.post('/auth/login', { email: user.email, password: user.password }).then((res: any) => {
            if (res.data.message == 'Login Successful') {
                router.push("/home");
                addSnackbar({
                    key: "success",
                    text: res.data.message,
                    variant: "success",
                    icon: CheckCircleIcon
                })
               
                Cookies.set('token', res.data.token, { expires: 1 });
                Cookies.set('email', res.data.email, { expires: 1 });
                setError("");
                setFormValid(true);
                setUser({
                    email: "",
                    password: "",
                });
            }
            else {
                if (res.data.status == 400) {
                    addSnackbar({
                        key: "error",
                        text: res.data.message,
                        variant: "error",
                        icon: ExclamationCircleIcon
                    })
                    router.push("/signup")
                }
               else addSnackbar({
                    key: "error",
                    text: res.data.message,
                    variant: "error",
                    icon: ExclamationCircleIcon
                })
            }
               
        }, err => {
            console.log(err.message)
        })

    };

    const handleKeyPress = (e: any) => {
        e.key == 'Enter' && handleSubmit(e);
    }

    const loginWithOAuth = (type: 'google' | 'github') => {
        window.open(`/api/auth/${type}/callback`, '_self')
    }

    return (
            <div className='login'>
                <div className='text-center'>
                    <h3 className='font-bold text-2xl tracking-wide'>Sign In</h3>
                    <p className='text-xs font-medium mt-1 tracking-wide'>Don't have an account? <span className='tracking-wide font-medium hover:underline font-bold cursor-pointer' onClick={navigateToSignUp}>Sign Up</span></p>
                </div>
                <br />
                <div className='flex justify-between gap-3 items-center'>
                    <div className='loginForm w-[40%]'>
                        <div className='mb-5'>
                            <TextField id="email" label="Email" variant="standard" className='w-[100%] font-normal' name="email" value={user.email} onInput={handleInputChange} onBlur={checkValidation} sx={MuiTextfieldStylings} />
                            {error ? <p className='text-xs font-normal text-red-600 float-right italic'>{error}</p> : null}
                        </div>

                        <TextField id="password" label="Password" type="password" variant="standard" className='w-[100%] font-normal mb-5' name="password" value={user.password} onKeyDown={handleKeyPress} onInput={handleInputChange} onBlur={checkValidation} sx={MuiTextfieldStylings} />
                        <div className='flex justify-between items-center w-[100%] mt-4'>
                            <div className='flex justify-start items-center gap-2'>
                                <input type="checkbox"></input>
                                <p className='text-xs font-medium text-gray-500'>Remember me</p>
                            </div>
                            <p className='text-xs font-medium text-gray-500 cursor-pointer'>Forgot Password?</p>
                        </div>
                        <Button variant="contained" className="w-[100%] mt-2 bg-black" disabled={!formValid} onClick={handleSubmit}>Log In</Button>
                    </div>

                    <div className='divider relative w-[10%] text-center'>or</div>

                    <div className='OauthProviders w-[40%]'>
                        <div className='flex justify-start items-center gap-4 px-5 p-2 w-[230px] provider text-center mb-4 cursor-pointer' onClick={() => loginWithOAuth('google')}>
                            <GoogleIcon sx={{ color: '#d52222', fontSize: '17px' }} />
                            <p className='font-normal text-sm'>Continue with Google</p>
                        </div>
                        <div className='flex justify-start items-center gap-4 px-5 p-2 w-[230px] provider text-center mb-4 cursor-pointer' onClick={() => loginWithOAuth('github')}>
                            <GitHubIcon sx={{ fontSize: '17px' }} />
                            <p className='font-normal text-sm'>Continue with Github</p>
                        </div>
                    </div>
                </div>

            </div>

    )


}

export default Login
