import app from "./app";

export const main = async () => {
  const PORT = 1000;
  const HOST = "localhost";

  app.listen(PORT, () => {
    console.log(`Server is running at https://${HOST}:${PORT}`);
  });
};

(async () => main())();
