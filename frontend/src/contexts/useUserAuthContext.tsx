import { create } from "zustand";
import { Inputs, UserAuthState } from "../types";

const saveUserToSessionStorage = (user: Inputs | null) => {
  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("user");
  }
};

const getUserFromSessionStorage = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const useUserAuthStore = create<UserAuthState>((set) => ({
  user: getUserFromSessionStorage(),
  isAuthenticated: !!getUserFromSessionStorage(),

  userLogin:(data) => {
      saveUserToSessionStorage(data);
      set({user: data, isAuthenticated: true });
  },

  logout: () => {
    saveUserToSessionStorage(null);
    set({ user: null, isAuthenticated: false });
  },
}));

export default useUserAuthStore;
