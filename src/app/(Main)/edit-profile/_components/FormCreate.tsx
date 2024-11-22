"use client";
import React from "react";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Lewis Hamilton",
      username: "@Lewishamilton",
      email: "lewishamilton@mail.com",
      bio: '🌿 Capturing the essence of nature through my lens\n✨ "In every walk with nature, one receives far more than he seeks." - John Muir',
    },
  });

  const onSubmit = (data: any) => {
    console.log("Updated Profile:", data);
  };

  return (
    <div className="mt-[50px] w-[70%] pr-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-6  rounded-lg "
      >
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <button className="text-blue-400 hover:underline">
            Change profile photo
          </button>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^@\w+$/,
                message: "Username must start with @",
              },
            })}
            className="w-full p-3 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-3 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Bio Input */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full p-3 h-32 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-[40px]"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
