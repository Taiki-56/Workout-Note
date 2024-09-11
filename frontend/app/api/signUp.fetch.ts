import Config from "react-native-config";

// import "dotenv/config";
// import { API_URL } from "@env";

const API_URL = Config.API_URL;

type UserType = {
  name: string;
  email: string;
  password: string;
};

export const signUpFetch = async (newUser: UserType) => {
  console.log(API_URL);

  console.log(newUser);

  //   const res = await fetch(`${apiUrl}/signUp`, {
  const res = await fetch("http://localhost:10000/api/auth/signUp", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  //* return data to show error message to user if it is
  return res.json();
};
