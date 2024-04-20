import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useFormik } from 'formik';
import axiosInstance from '../../utils/axiosInstance';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/users/login', {
        email: values.email,
        password: values.password,
      });

      if (response.data && response.data.accessToken) {
        setLoading(false);
        localStorage.setItem('token', response.data.accessToken);
        toast.success('Logged in successfully');
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  const { handleSubmit, touched, handleBlur, errors, values, handleChange } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: LoginValidationSchema,
      validateOnMount: true,
      enableReinitialize: true,
      onSubmit: handleLogin,
    });

  const isDisabled = Object.values(errors).some((error) => error);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Login</h4>
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
            {error && <p className="text-red-500 text-xs pb-4">{error}</p>}

            <button
              type="submit"
              disabled={isDisabled || loading}
              onClick={handleLogin}
              className={classNames(
                'btn-primary',
                (isDisabled || loading) &&
                  'cursor-not-allowed bg-gray-300 hover:bg-gray-900'
              )}
            >
              {loading && 'Loading...'}
              {!loading && 'Login'}
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{' '}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
