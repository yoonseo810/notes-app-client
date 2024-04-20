import Navbar from '../../components/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name must be less than 15 characters'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Field cannot be empty')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/users/create', {
        email: values.email,
        password: values.password,
        fullName: values.name,
      });

      if (response.data && response.data.accessToken) {
        setLoading(false);
        // localStorage.setItem('token', response.data.accessToken);
        navigate('/login');
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  const { handleSubmit, touched, handleBlur, errors, values, handleChange } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: SignUpValidationSchema,
      validateOnMount: true,
      enableReinitialize: true,
      onSubmit: handleSignUp,
    });

  const isDisabled = Object.values(errors).some((error) => error);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="input-box"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors?.name && (
              <p className="text-red-500 text-xs pb-4">{errors.name}</p>
            )}
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              className="input-box"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors?.email && (
              <p className="text-red-500 text-xs pb-4">{errors.email}</p>
            )}
            <PasswordInput
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              handleBlur={handleBlur}
            />
            {touched.password && errors?.password && (
              <p className="text-red-500 text-xs pb-4">{errors.password}</p>
            )}
            <PasswordInput
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              handleBlur={handleBlur}
            />
            {touched.confirmPassword && errors?.confirmPassword && (
              <p className="text-red-500 text-xs pb-4">
                {errors.confirmPassword}
              </p>
            )}
            {error && <p className="text-red-500 text-xs pb-4">{error}</p>}
            <button
              type="submit"
              disabled={isDisabled || loading}
              onClick={handleSignUp}
              className={classNames(
                'btn-primary',
                (isDisabled || loading) &&
                  'cursor-not-allowed bg-gray-300 hover:bg-gray-900'
              )}
            >
              {loading ? 'Loading...' : 'Create Account'}
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
