const API_URL = process.env.EXPO_PUBLIC_API_URL;

type UserType = {
  name: string;
  email: string;
  password: string;
};

export const signUpFetch = async (newUser: UserType) => {
  console.log(API_URL);

  console.log(newUser);

  const res = await fetch(`${API_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  //* return data to show error message to user if it is
  return res.json();
};
