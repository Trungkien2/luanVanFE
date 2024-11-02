"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface PostFormData {
  body: string;
  media: File[]; // Định nghĩa media là một mảng File
}

const FormCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]); // Dùng mảng cho nhiều ảnh xem trước

  const onSubmit = async (data: PostFormData) => {
    try {
      console.log(data);
      // Xử lý gửi dữ liệu ở đây
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="mt-[50px] w-[70%] pr-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Caption */}
        <div>
          <p className="block text-[18px] font-bold text-gray-300 mb-[12px]">Caption</p>
          <textarea
            id="body"
            {...register("body", { required: "Caption is required" })}
            className="w-full px-4 py-2 mt-2 bg-dark_3 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500 h-[114px]"
          />
        </div>

        {/* Upload Media */}
        <div className="bg-dark_2 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-300 font-semibold mb-2">Add Photos/Videos</p>
          <div className="border-2 border-dashed border-gray-500 rounded-lg p-4 text-center cursor-pointer relative">
            <input
              type="file"
              accept="image/*,video/*"
              multiple // Cho phép chọn nhiều file
              {...register("media")}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleMediaChange}
            />
            {mediaPreviews.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-4">
                {mediaPreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Media Preview ${index + 1}`}
                    className="w-32 h-32 rounded-md object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8.5 11a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm8.4 5H7.1c-.4 0-.7-.2-.9-.5a.7.7 0 01.2-.9l2.2-1.7 1.3 1.2c.3.3.8.3 1.1 0l4.3-4.4a.7.7 0 011 0l2.5 3.3a.7.7 0 01-.9 1H16.9c-.3.1-.7 0-.9-.3z"/>
                </svg>
                <p>Drag photos and videos here</p>
                <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-dark_4 text-white rounded-lg"
                >
                  Select from computer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-[40px]"
        >
          Share Post
        </button>
      </form>
    </div>
  );
};

export default FormCreate;
