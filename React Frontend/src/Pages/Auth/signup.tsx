import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import logo from '../../assets/react.svg'
import leftImg from '/image/signup.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { signupUserHandler } from '../../store/slice/Auth/signup-slice'


type FormValues = {
  username: string
  password: string
}

const SignupPage: React.FC = () => {
  const Navigate = useNavigate()
  const dispatch = useAppDispatch()

  const signupState = useAppSelector((state) => state.signup)
  const [showPassword, setShowPassword] = useState(false)

  const initialValues: FormValues = {
    username: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .max(25, 'Username must be at most 25 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters')
      .max(15, 'Password must be at most 15 characters')
      .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
        'Password must contain at least one special character'),
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      await dispatch(signupUserHandler(values));
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  useEffect(() => {
    if (signupState?.data && signupState?.data?.data) {
      Navigate('/');
    }
  }, [signupState?.data])

  const SigninCall = () => {
    Navigate('/')
  }

  return (
    <div className="min-h-screen flex">
      <div className='hidden md:block flex-1'>
        <img src={leftImg} alt="Signup" className="w-full h-full object-fill" />    
      </div>

      <div className="flex flex-1 items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md w-full">
          <div className="flex flex-col justify-center items-center text-center gap-3 mb-6">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <div className='text-2xl font-bold mb-2'>  Create Your Account!!  </div>
          </div>


          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }: { isSubmitting: boolean }) => (
              <Form className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    className="mt-1 block w-full px-3 py-2 border rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="username" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      className="block w-full pr-10 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button  type="button" onClick={() => setShowPassword((s) => !s)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 cursor-pointer">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
                  
                </div>

                <div>
                  <button  type="submit"  disabled={isSubmitting} className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60">  Sign up </button>
                </div>

                <div className="pt-4 ">
                  <div className="text-center text-md text-gray-500 mb-3 flex gap-x-2 justify-center"> Already Have Account ??  <p className="text-center text-gray-400 cursor-pointer hover:text-indigo-500 hover:underline " onClick={SigninCall}> Sign in </p>   </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default SignupPage