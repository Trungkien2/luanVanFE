"use client";
import uploadApi from "@/api/upload/upload.api";
import userApi from "@/api/user/user.api";
import { useSnackbar } from "@/context/SnackbarContext";
import { IUser } from "@/interface/user.interface";
import useUserStore from "@/store/userStore";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Iprops {
  user: IUser;
}

const FormCreate: React.FC<Iprops> = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Lưu trữ ảnh tạm
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.name,
      user_name: user?.user_name,
      email: user?.email,
      bio: user?.bio,
      picture: user?.picture || "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Updated Profile:", data);
    try {
      showSnackbar("Profile updated successfully", "success");
     const userRes:any= await userApi.update(user?.id,data)
     setUser(userRes?.[0])
    } catch (error) {
      showSnackbar("Error updating profile", "error");
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit

        showSnackbar("File size exceeds 2MB", "error");

        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string); // Chuyển file thành URL
      reader.readAsDataURL(file);
      try {
        const imageLinkRes: any = await uploadApi.uploadImage(formData);
        setValue("picture", imageLinkRes?.imageUrl);

        showSnackbar(" updated imahe successfully", "success");
      } catch (error) {
        showSnackbar("Error uploading image", "error");
      }
    }
  };

  return (
    <div className="mt-[50px] w-[70%] pr-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src={
              selectedImage ||
              user?.picture ||
              "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <label
            htmlFor="profile-photo"
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Change profile photo
          </label>
          <input
            id="profile-photo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
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
            {...register("user_name", {
              required: "Username is required",
              pattern: {
                value: /^@\w+$/,
                message: "Username must start with @",
              },
            })}
            className="w-full p-3 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.user_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.user_name.message}
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
      <SnackbarComponent />
      {/* Snackbar for Notifications */}
     
    </div>
  );
};

export default FormCreate;
