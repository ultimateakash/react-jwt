import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import authService from '../services/auth.service';
import { useState } from 'react';

const RegisterComponent = () => {

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState();

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password should contains a lowercase, a uppercase character and a digit.')
  });

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data) => {
    setIsSubmitted(true)
    try {
      const result = await authService.register(data);
      if (result.data) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.data.message);
    }
    setIsSubmitted(false)
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="name" className="form-control" id="inputName" {...register('name')} />
            <div className="form-text text-danger">
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" {...register('email')} />
            <div className="form-text text-danger">
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" {...register('password')} />
            <div className="form-text text-danger">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitted || !isDirty || !isValid}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterComponent