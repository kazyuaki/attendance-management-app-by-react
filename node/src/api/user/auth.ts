// src/api/user/auth.ts

import axios from "axios";

type RegisterParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const userRegister = async (params: RegisterParams) => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true, 
    });

    const response = await axios.post(
        "http://localhost:8000/api/user/register",
        params,
        {
            withCredentials: true, 
        }
    );
    return response.data;
};
