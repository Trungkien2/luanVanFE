"use client";
import { GoogleIcon } from "@/app/assets";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FieldError, useForm } from "react-hook-form";
import { ROUTER_WEB } from "@/util/route";
const LoginFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
    // Handle login logic here
  };
  return (
    <div className="mt-[32px]">
      <div className="w-full max-w-md ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.email as FieldError).message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.password as FieldError).message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Log in
          </button>
        </form>

        {/* Google Sign In Button */}
        <button className="w-full mt-4 py-2 bg-white text-black rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition-colors">
          <Image src={GoogleIcon} alt="Google icon" className="h-5 w-5" />
          Sign in with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link
            href={ROUTER_WEB.SIGN_UP}
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginFrom;
