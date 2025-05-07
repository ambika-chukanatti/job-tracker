import "dotenv/config";
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

import sequelize from "./utils/database.js";
import routes from "./routes/routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin:'*',
    methods: ['GET', 'POST', 'DELETE','PUT','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => console.error(err));