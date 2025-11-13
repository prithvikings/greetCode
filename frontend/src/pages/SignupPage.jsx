import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // or 'zod/v4'


// Define the Zod schema for form validation
const signupschema = z.object({
  name: z.string().min(3, { message: "Name is required" }).max(50, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).nonempty({ message: "Password is required" }),
});


const SignupPage = () => {

  // Initialize the form with React Hook Form and Zod resolver
  const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(signupschema),});

  const onSubmit = (data) => {
    console.log(data);
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-screen flex  justify-center items-center p-4'>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 space-y-2 shadow-lg h-fixed">

        <legend className="fieldset-legend text-2xl">Signup</legend>

        <label className="label">Name</label>
        <input type="text" className="input outline-none  w-full" placeholder="Name" {...register("name")}/>
        {errors.name && <p className="text-error font-medium tracking-wide">{errors.name.message}</p>}


        <label className="label">Email</label>
        <input type="email" className="input outline-none  w-full"  placeholder="Email" {...register("email")}/>
        {errors.email && <p className="text-error font-medium tracking-wide">{errors.email.message}</p>}


        <label className="label">Password</label>
        <input type="password" className="input outline-none  w-full" placeholder="Password" {...register("password")}/>
        {errors.password && <p className="text-error font-medium tracking-wide">{errors.password.message}</p>}

        <p className='text-center font-normal text-sm text-base-content'>if you already have an account <Link to="/login" className="text-secondary font-semibold ">Login Now </Link></p>

        <button type="submit" className="btn btn-secondary mt-4 shadow-xl">Signup</button>
      </fieldset>
    </form>
    
  )
}

export default SignupPage

