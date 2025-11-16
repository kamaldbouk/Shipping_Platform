import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import sequelize from "./config/database"

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB error:", err));

export default app;
