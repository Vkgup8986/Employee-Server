import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectToDatabase from "./db/DB.js";
import path from "path";

connectToDatabase();
const app = express();
app.use(
  cors({
    origin: "https://employee-gui.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public/Uploads"));
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/public", express.static(path.join(process.cwd(), "public"))); //for ProfileImage

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});
