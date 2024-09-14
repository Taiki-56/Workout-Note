const API_URL = process.env.EXPO_PUBLIC_API_URL;

type DayType = {
  title: string;
  exercises: string[];
};

export const dayFetch = async (newDay: DayType) => {
  const res = await fetch(`${API_URL}/day`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newDay),
  });

  //* return data to show error message to user if it is
  return res.json();
};
