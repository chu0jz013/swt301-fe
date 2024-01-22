import { useState } from 'react';
import './ChangePassword.css';
import imagelogo from './imagelogo/FrogFind.png';
import { privateAxios } from '../../service/axios';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export default function ChangePassword() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user.id;
  const [errorMessage, setErrorMessage] = useState('');
  const schema = yup.object().shape({
    oldPassword: yup.string().required('Old Password is required'),
    newPassword: yup
      .string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmNew: yup
      .string()
      .required('Confirm New Password is required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNew: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const response = privateAxios
      .put('change-password', {
        userid,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      .then((res) => {
        setErrorMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };
  return (
    <div
      className='container d-flex justify-content-center align-items-center'
      style={{ marginTop: '20vh' }}
    >
      <div className='row border rounder-5 p-3 bg-white shadow box-area'>
        <div className='col-md-6 left-box rounder-4 d-flex justify-content-center align-items-center flex-column'>
          <div className='featured-image mb-3'>
            <img
              src={imagelogo}
              className='img-fluid'
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='right-box'>
              <div className='row justify-content-center'>
                <div
                  className='header-text mb-4'
                  style={{ color: 'orangered', fontWeight: 'bold' }}
                >
                  <h3 style={{ fontWeight: 'bold' }}>Change Password?</h3>
                </div>
                <div className='input-group mb-3'>
                  <input
                    type='password'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Your old password'
                    {...register('oldPassword')}
                    autoComplete='off'
                  />
                </div>
                {errors.oldPassword && (
                  <p style={{ color: 'red' }}>{errors.oldPassword.message}</p>
                )}
                <div className='input-group mb-3'>
                  <input
                    type='password'
                    placeholder='Your new password'
                    className='form-control form-control-lg bg-light fs-6'
                    {...register('newPassword')}
                  />
                </div>
                {errors.newPassword && (
                  <p style={{ color: 'red' }}>{errors.newPassword.message}</p>
                )}
                <div className='input-group mb-3'>
                  <input
                    type='password'
                    placeholder='Confirm your new password'
                    className='form-control form-control-lg bg-light fs-6'
                    {...register('confirmNew')}
                  />
                </div>
                {errors.confirmNew && (
                  <p style={{ color: 'red' }}>{errors.confirmNew.message}</p>
                )}
              </div>
              {errorMessage && (
                <div style={{ color: errorMessage === 'Change Password Successfully!' ? 'green' : 'red' }}>{errorMessage}</div>
              )}
              <div className='input-group mb-3'>
                <button
                  type='submit'
                  className='btn btn-lg login w-100 fs-6 font-text'
                  style={{ backgroundColor: 'orangered', color: 'white' }}
                >
                  Change Password
                </button>
                <div
                  className='col-md-12'
                  style={{
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Link
                    to={
                      user.roleName === 'STUDENT'
                        ? '/student/home'
                        : user.roleName === 'MANAGER'
                          ? '/manager/dashboard'
                          : '/admin'
                    }
                  >
                    <button
                      type='submit'
                      className='btn btn-lg login w-100 fs-6 font-text'
                      style={{ backgroundColor: 'orangered', color: 'white' }}
                    >
                      Back to Dashboard <KeyboardReturnIcon />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
