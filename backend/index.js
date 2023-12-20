import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./routes/data.js";
import sql from "mssql";
import dotenv from "dotenv";
import {fileURLToPath} from 'url'
import path from "path";
import sqlConfig from "./configuration/sqlConfig.js";

const PORT = 3000;
const app = express();

// Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const appPool = new sql.ConnectionPool(sqlConfig);

// Routes
app.use("/data", data);


if(process.env.NODE_ENV == "production"){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname,'../frontend/data-parser/build',)))
  app.get("*",(req,res) =>{
      res.sendFile(path.resolve(__dirname,'../','frontend','data-parser','build','index.html'))
  })
}

appPool
  .connect()
  .then(function (pool) {
    console.log("Successfully Connected to remote MS SQL server")
    app.locals.db = pool;
    const server = app.listen(PORT, function () {
      const host = server.address().address;
      const port = server.address().port;
      console.log("Example app listening at http://%s:%s", host, port);
    });
  })
  .catch(function (err) {
    console.error("Error creating connection pool", err.message);
    const server = app.listen(PORT, function () {
      const host = server.address().address;
      const port = server.address().port;
      console.log("Example app listening at http://%s:%s", host, port);
    });
  });
