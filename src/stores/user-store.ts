import { create } from "zustand";
import type { User } from "../types/user";

type UserState = {
  user: User;
  setUser: (user: Partial<User>) => void;
};

const userData: Record<string, string> | undefined = JSON.parse(
  localStorage.getItem("user") || "null"
);
const initialUser: User = {
  id: userData?.["id"],
  username: userData?.["username"],
  email: userData?.["email"],
  token: userData?.["token"],
};

const userStore = create<UserState>()((set) => ({
  user: initialUser,
  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user: { ...user } });
  },
}));

export default userStore;
