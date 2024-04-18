"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API } from '@/utils/api.service';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import useSnackbar from '@/utils/useSnackbar';

const MuiTextfieldStylings = {
    "& .MuiInput-underline:after": {
        borderBottomColor: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "black",
    },
};

const Signup: React.FunctionComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const [error, setError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [formValid, setFormValid] = useState(false);

    const addSnackbar = useSnackbar();

    useEffect(() => {
        router.replace('/signup');
    }, [router])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
        checkValidation();
    };

    const checkValidation = () => {
        if (!emailRegex.test(user.email)) {
            user.email && setError("Email is not valid.")
            setFormValid(false)
        }
        if (!user.email || !user.password || !user.confirmPassword) {
            user.email && setError("");
            setFormValid(false)
        }
        if (user.password && user.confirmPassword && user.password != user.confirmPassword) {
            setPwdError("Password not matched.");
            setFormValid(false);
        }
        if (user.email && user.password && user.confirmPassword && user.password === user.confirmPassword && emailRegex.test(user.email)) {
            setError("");
            setPwdError("");
            setFormValid(true);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {

            if (!user.email || !user.password) {
                setFormValid(false)
            }
            API.post('/auth/signup', { email: user.email, password: user.password }).then((res: any) => {
                console.log(res.data)
                if (res.data.message == "User Created Sucessfully.") {
                    router.push("/login");
                    setError("");
                    setPwdError("");
                    setFormValid(true);
                    setUser({
                        email: "",
                        password: "",
                        confirmPassword: ""
                    });
                    addSnackbar({
                        key: "success",
                        text: res.data.message,
                        variant: "success",
                        icon: CheckCircleIcon
                    })
                }
                else if(res.data.status == 400) {
                    addSnackbar({
                        key: "warning",
                        text: res.data.message,
                        variant: "warning",
                        icon: CheckCircleIcon
                    })
                }
                
            }, err => {
                console.log(err.message)
            })

        } catch (error) {
            console.log(error);
            setError("");
        }
    };

    const handleKeyPress = (e: any) => {
        e.key == 'Enter' && handleSubmit(e);
    }

    const navigateToLogin = () => {
        router.push("/")
    }

    return (
        <div className='login'>
            <div className='text-center'>
                <h3 className='font-bold text-2xl tracking-wide'>Sign Up</h3>
                <p className='text-xs font-medium mt-1 tracking-wide'>Already have an account? <span className='tracking-wide font-medium hover:underline font-bold cursor-pointer' onClick={navigateToLogin}>Log In</span></p>
            </div>
            <br />

            <div className='loginForm w-[300px] mx-auto'>
                <div className='mb-5'>
                    <TextField id="email" label="Email" variant="standard" name="email" value={user.email} className='w-[100%] font-normal' sx={MuiTextfieldStylings} onInput={handleInputChange} onBlur={checkValidation} />
                    {error ? <p className='text-xs font-normal text-red-600 float-right italic'>{error}</p> : null}
                </div>
                <TextField id="password" label="Password" type="password" variant="standard" name="password" value={user.password} className='w-[100%] font-normal mb-5' sx={MuiTextfieldStylings} onInput={handleInputChange} onBlur={checkValidation} />
                <div className='mb-5'>
                    <TextField id="confirmPassword" label="Confirm Password" type="password" name="confirmPassword" value={user.confirmPassword} variant="standard" className='w-[100%] font-normal' sx={MuiTextfieldStylings} onInput={handleInputChange} onKeyDown={handleKeyPress} onBlur={checkValidation} />
                    {pwdError ? <p className='text-xs font-normal text-red-600 float-right italic'>{pwdError}</p> : null}
                </div>


                <Button variant="contained" className="w-[100%] mt-4 bg-black" disabled={!formValid} onClick={handleSubmit}>Sign Up</Button>
            </div>


        </div>
    )
}

export default Signup