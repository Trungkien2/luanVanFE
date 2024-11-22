import { IUser } from "@/interface/user.interface";
import { create } from "zustand";

interface UserState {
  user: IUser | null; // Trạng thái thông tin người dùng
  setUser: (user: IUser) => void; // Hàm để lưu thông tin người dùng
  clearUser: () => void; // Hàm để xóa thông tin người dùng khi đăng xuất
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
