import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

// permitir solicitudes desde cualquier origen
app.use(
  cors({
    origin: function (origin, callback) {
      // Permite las solicitudes de cualquier origen si se trata de una solicitud de desarrollo local
      if (!origin || origin === "http://localhost:5173") {
        callback(null, true);
      } else {
        // Solo permite las solicitudes de los orígenes especificados para el entorno de producción
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
