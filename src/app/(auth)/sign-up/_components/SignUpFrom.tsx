"use client";
import { ROUTER_WEB } from "@/util/route";
import Link from "next/link";
import React from "react";
import { FieldError, useForm } from "react-hook-form";
const SignUpFrom: React.FC = () => {
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
          {/* Name Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.name as FieldError).message}
              </p>
            )}
          </div>
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
            Sign up
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-gray-400 mt-4">
          have an account?{" "}
          <Link
            href={ROUTER_WEB.LOGIN}
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpFrom;
