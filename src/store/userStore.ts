import { IUser } from "@/interface/user.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: IUser | null; // Trạng thái thông tin người dùng
  setUser: (user: IUser) => void; // Hàm để lưu thông tin người dùng
  clearUser: () => void; // Hàm để xóa thông tin người dùng khi đăng xuất
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // Tên key trong localStorage
      // Optional: serialize & deserialize nếu cần tùy chỉnh
      // serialize: (state) => JSON.stringify(state),
      // deserialize: (str) => JSON.parse(str),
    }
  )
);

export default useUserStore;
