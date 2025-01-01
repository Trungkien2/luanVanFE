"use client";
import postApi from "@/api/post/post.api";
import uploadApi from "@/api/upload/upload.api";
import { useSnackbar } from "@/context/SnackbarContext";
import useUserStore from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";

interface IProps {
  postId?: string;
}
interface PostFormData {
  body: string;
  media: File[]; // Định nghĩa media là một mảng File
  status: string; // Thêm trường postType
  visibility: string; // Thêm trường privacy
}

const FormCreate: React.FC<IProps> = ({ postId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>();
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]); // Dùng mảng cho nhiều ảnh xem trước
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const userStore = useUserStore((state) => state.user);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);

  const privacy = watch("visibility");

  useEffect(() => {
    if (privacy === "followers") {
      setOpenFriendsModal(true);
    } else {
      setOpenFriendsModal(false);
    }
  }, [privacy]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        const post = await postApi.findOne(postId, {
          fields: ["$all"],
        });
        setValue("body", post.data.body);
        setValue("visibility", post.data.visibility);
        // Optionally, set media previews if needed
      }
    };
    fetchPostData();
  }, [postId, setValue]);

  const onSubmit = async (data: PostFormData) => {
    if (postId) {
      try {
        await postApi.update(postId, {
          body: data.body,
          privacy: data.visibility,
        });
        showSnackbar("Update post successfully", "success");
      } catch (error: any) {
        console.error(error);
        showSnackbar("Error updating post", "error");
      }
    } else {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append(data.status === "POST" ? "files" : "file", file);
      });
      try {
        const response: any = data.status === "POST" ? await uploadApi.uploadImages(formData) : await uploadApi.uploadVideo(formData);
        console.log("🚀 ~ onSubmit ~ response:", response);

        showSnackbar("Create post successfully", "success");
        await postApi.create({
          title: "title",
          body: data.body,
          media: data.status === "POST" ? JSON.stringify(response?.files?.map((item: any) => item?.imageUrl)) : JSON.stringify(response?.videoUrl),
          status: data.status,
          visibility: data.visibility,
          user_id: userStore?.id,
        });
        // Xử lý gửi dữ liệu ở đây
      } catch (error: any) {
        console.error(error);
        showSnackbar("Error create post", "error");
      }
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Giải phóng các URL cũ
    mediaPreviews.forEach((url) => URL.revokeObjectURL(url));

    // Lấy file mới từ input
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files); // Lưu file để sử dụng khi cần upload

    // Tạo URL tạm thời
    const previews = files.map((file) => URL.createObjectURL(file));
    setMediaPreviews(previews);
  };

  // Cleanup các URL khi component unmount
  useEffect(() => {
    return () => {
      mediaPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaPreviews]);

  const sampleFriends = [
    { id: 1, name: "John Doe", picture: "/path/to/picture1.jpg" },
    { id: 2, name: "Jane Smith", picture: "/path/to/picture2.jpg" },
    { id: 3, name: "Alice Johnson", picture: "/path/to/picture3.jpg" },
  ];

  return (
    <div className="mt-[50px] w-[70%] pr-5 bg-dark_1 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Caption */}
        <div>
          <p className="block text-[18px] font-bold text-gray-300 mb-[12px]">
            Caption
          </p>
          <textarea
            id="body"
            {...register("body", { required: "Caption is required" })}
            className="w-full px-4 py-2 mt-2 bg-dark_3 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500 h-[114px]"
          />
        </div>

        {/* Post Type */}
        {!postId && (
          <div>
            <p className="block text-[18px] font-bold text-gray-300 mb-[12px]">
              Post Type
            </p>
            <select
              id="postType"
              {...register("status", { required: "Post type is required" })}
              className="w-full px-4 py-2 mt-2 bg-dark_3 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
            >
              <option value="REEL">Reel</option>
              <option value="POST">Post</option>
            </select>
          </div>
        )}

        {/* Privacy */}
        <div>
          <p className="block text-[18px] font-bold text-gray-300 mb-[12px]">
            Privacy
          </p>
          <select
            id="visibility"
            {...register("visibility", { required: "Privacy is required" })}
            className="w-full px-4 py-2 mt-2 bg-dark_3 text-white border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
          >
            <option value="public">Public</option>
            <option value="followers">Friends</option>
            <option value="private">Only Me</option>
          </select>
        </div>

        {/* Upload Media */}
        {!postId && (
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
                  {mediaPreviews.map((preview, index) => {
                    const file = selectedFiles[index];
                    return file.type.startsWith("image/") ? (
                      <img
                        key={index}
                        src={preview}
                        alt={`Media Preview ${index + 1}`}
                        className="w-32 h-32 rounded-md object-cover"
                      />
                    ) : (
                      <video
                        key={index}
                        src={preview}
                        controls
                        className="w-32 h-32 rounded-md object-cover"
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <svg
                    className="h-12 w-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8.5 11a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm8.4 5H7.1c-.4 0-.7-.2-.9-.5a.7.7 0 01.2-.9l2.2-1.7 1.3 1.2c.3.3.8.3 1.1 0l4.3-4.4a.7.7 0 011 0l2.5 3.3a.7.7 0 01-.9 1H16.9c-.3.1-.7 0-.9-.3z" />
                  </svg>
                  <p>Drag photos and videos here</p>
                  <p className="text-sm text-gray-500">
                    SVG, PNG, JPG or GIF (max. 800×400px)
                  </p>
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
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-[40px]"
        >
          {postId ? "Update Post" : "Share Post"}
        </button>
      </form>
      <SnackbarComponent />

      <Modal open={openFriendsModal} onClose={() => setOpenFriendsModal(false)}>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="bg-dark_1 p-4 rounded-lg w-[80%] max-w-[500px]">
            <h2 className="text-white mb-4">Select Friends</h2>
            <div className="flex flex-col gap-4">
              {sampleFriends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-4">
                  <Avatar src={friend.picture} />
                  <p className="text-white">{friend.name}</p>
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => setOpenFriendsModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormCreate;
