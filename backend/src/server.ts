import "dotenv/config";
import app from "./app";
import MongoDB from "./data/mongo/mongo-database";

export const main = async () => {
  const PORT = process.env.PORT;
  const HOST = process.env.HOST;

  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
  }

  //* Database connection
  await MongoDB.connect(mongoUrl);

  app.listen(PORT, () => {
    console.log(`Server is running at: ${HOST}:${PORT}`);
  });
};

(async () => main())();
