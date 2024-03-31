import create from "zustand";

interface User {
  token: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const useUserStore = create<UserStore>((set) => {
  let initialUser = null;

  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  }

  return {
    user: initialUser,

    setUser: (user) => set({ user }),

    get isLoggedIn() {
      return !!this.user;
    },
  };
});

export default useUserStore;
