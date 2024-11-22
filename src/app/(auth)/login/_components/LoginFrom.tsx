"use client";
import { GoogleIcon } from "@/app/assets";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FieldError, useForm } from "react-hook-form";
import { ROUTER_WEB } from "@/util/route";
import { Bounce, toast } from "react-toastify";
import authApi from "@/api/auth/auth.api";
import { useRouter } from "next/navigation";
import ToastProvider from "@/provider/ToastProvider";
import useUserStore from "@/store/userStore";

interface LoginFormData {
  name: string;
  email: string;
  password: string;
}

const LoginFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const onSubmit = async (data: LoginFormData) => {
    try {
      const res: any = await authApi.login(data);
      if (res) {
        await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: res?.access_token }),
        });
      }
      setUser(res?.userInfo)
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
      router.push(ROUTER_WEB.HOME_PAGE);
    } catch (error: any) {
      console.log("🚀 ~ file: LoginFrom.tsx ~ line 51 ~ onSubmit ~ error", error.response)
      toast.error(
        `${
          error.response.data?.message?.en || "An unknown error occurred"
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
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
        <button
          className="w-full mt-4 py-2 bg-white text-black rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition-colors"
          onClick={handleLoginGoogle}
        >
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
      <ToastProvider /> 
    </div>
  );
};

export default LoginFrom;
