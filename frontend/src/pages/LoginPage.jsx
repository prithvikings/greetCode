import React from 'react'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
const LoginPage = () => {

  const {register,handleSubmit,formState: { errors },} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-screen flex  justify-center items-center p-4'>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 space-y-2 shadow-lg h-fit">

        <legend className="fieldset-legend text-2xl">Login</legend>


        <label className="label">Email</label>
        <input type="email" className="input outline-none  w-full"  placeholder="Email" {...register("email", { required: "Email is required"})}/>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}


        <label className="label">Password</label>
        <input type="password" className="input outline-none  w-full" placeholder="Password" {...register("password", {required: "Password is required"})}/>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <p className='text-center font-normal text-sm text-base-content'>if you don't have account <Link to="/signup" className="text-secondary underline">Create Now </Link></p>
        <button type="submit" className="btn btn-secondary mt-4 shadow-xl">Login</button>
      </fieldset>
    </form>
    
  )
}

export default LoginPage

