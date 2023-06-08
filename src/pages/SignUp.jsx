// import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {db} from '../firebase'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import {toast} from 'react-toastify'

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    const [showPassword, setShowPassword] = useState(false);


    const {email, password, name} = formData;

    const navigate = useNavigate();
    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    async function onSubmit(e) {
        // console.log("oliver")
        e.preventDefault();
        try {
            const auth =  getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                updateProfile(auth.currentUser, {
                displayName: name
            })
            const user = userCredential.user;
            const formDataCopy = {
                ...formData 
            }
                delete formDataCopy.password
                formDataCopy.timestamp = serverTimestamp();
                await setDoc(doc(db, 'users', user.uid), formDataCopy)
                navigate('/')
                toast.success("Sign up was successful")
            console.log(user);
        } catch (error) {
            if(name.length <= 5 || name.length === 0)
            toast.error('Name contains less than five characters')
            if(password.length <=5  || password.length === 0)
            toast.error('Password contains less than five characters')
            if(email.length === 0) {
                toast.error('Email input field is empty')
            }
            else {
                navigate('/')
                toast.success("Sign up was successful")
            }
        }
    }
    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
            <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60" alt="key" className='w-full rounded-2xl' />
                </div>
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            id='name' 
                            value={name} 
                            onChange={onChange} 
                            placeholder='Full name'
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-4"
                        />
                        <input 
                            type="email" 
                            id='email' 
                            value={email} 
                            onChange={onChange} 
                            placeholder='Email address'
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-4"
                        />
                        <div className='relative mb-6'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                value={password}
                                onChange={onChange}
                                placeholder='Password'
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                            />
                            { showPassword ?  
                            (<AiFillEyeInvisible className='absolute right-5 top-3.5 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)} />)
                                : 
                            ( <AiFillEye className='absolute right-5 top-3.5 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)} />) }
                        </div>
                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                            <p className='mb-6'>Have a account
                                <Link className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1' to="/sign-in">Sign in</Link>
                            </p>
                            <p>
                                <Link className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out ml-1' to="/forgot-password">Forgot password</Link>
                            </p>
                        </div>
                        <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-900' type='submit'>Sign up</button>
                        <div className='my-4  flex  items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                            <p className='text-center font-semibold mx-4'>OR</p>
                        </div>
                        <Oauth />
                    </form>
                </div>
            </div>

        </section>
    )
}

export default SignUp