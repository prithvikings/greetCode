import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { Loader2, Command, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

// Define the Zod schema
const loginschema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .nonempty({ message: "Password is required" }),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginschema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 p-4 lg:p-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"></div>
      <Link
        to="/"
        className="absolute top-8 left-8 text-zinc-900 dark:text-zinc-50 font-poppins text-sm flex items-center cursor-pointer"
      >
        <ArrowLeft className="inline-block mr-2 w-5 h-5" /><span className="hidden md:block">Back to Home</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] z-10">
        {/* Header Section */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-zinc-900 dark:bg-white p-2 rounded-lg">
              <Command className="w-6 h-6 text-white dark:text-black" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-inter">
            Enter your email to sign in to your account
          </p>
        </div>

        {/* Global Error Message from Redux */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-md font-medium text-center animate-in fade-in zoom-in-95">
            {error}
          </div>
        )}

        {/* Form Section */}
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {/* Email Field */}
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-900 dark:text-zinc-100"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={loading}
                  {...register("email")}
                  className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-zinc-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 font-medium mt-1 animate-in slide-in-from-top-1 fade-in-0">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-900 dark:text-zinc-100"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  disabled={loading}
                  {...register("password")}
                  className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-zinc-200"
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 font-medium mt-1 animate-in slide-in-from-top-1 fade-in-0">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button (Custom Style) */}
              <Button
                variant="default"
                disabled={loading}
                type="submit"
                className="
                  font-inter corner-squircel px-4 py-1
                  bg-sky-500 hover:bg-sky-600
                  cursor-pointer text-white
                  [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
                  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
                  active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
                  active:translate-y-[1px]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-sky-400/60
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-transparent
                  transition-all duration-200
                "
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Sign In with Email"
                )}
              </Button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400 font-poppins">
                Or continue with
              </span>
            </div>
          </div>

          <p className="px-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium font-poppins"
            >
              Create Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;