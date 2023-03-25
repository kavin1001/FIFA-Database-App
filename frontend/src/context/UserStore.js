import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const UserStore = create(
  persist(
    (set, get) => ({
      userData: null,
      login: async (username, password) => {
        try {
          const res = await axios.get("http://localhost:8080/api/user/login", {params: {
            username: username,
            password: password,
          }},
          {withCredentials: true});
            set({
                userData: res.data.user,
            });
        } catch (e) {
          alert(e.response.data.message);
          return
        }
        
      },
      logout: async (username) => {
        await axios.get("http://localhost:8080/api/user/logout", {params: {
          username: username,
        }},
        {withCredentials: true});
          
        set({
            userData: null,
        });
          
      },
      updateUserData: async (username) => {
          
        const res = await axios.get("http://localhost:8080/api/user/getUser", {params: {
            username: username,
          }},
          {withCredentials: true});
          if (res.status === 200) {
            set({
                userData: res.data.user,
            });
          } 
          
      },
    }),
    {
      name: "user-storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);