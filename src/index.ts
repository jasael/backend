import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./shared/database";
import generateRoutes from "./routes/router";
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
generateRoutes(app);

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
