"use client";
import authApi from "@/api/auth/auth.api";
import { ROUTER_WEB } from "@/util/route";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { FieldError, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUpFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const router = useRouter();
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const res: any = await authApi.signUp(data);
      toast.success(`${res?.message?.en}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      router.push(ROUTER_WEB.LOGIN);
    } catch (error: any) {
      if (error) {
        // Handle the error message if it is an instance of Error
        toast.error(`${error.response.data.message.message.en}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      } else {
        // Fallback for non-Error cases
        toast.error("An unknown error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      }
    }
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
              {...register("email", {
                required: "Email is required",
              })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message:
                    "Password must contain at least one uppercase letter and one special character",
                },
              })}
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
