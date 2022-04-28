import express from "express";
import cors from "cors";
import netServer from "./net.js";
import EventEmitter from "events";

import mysql from "mysql";
import bodyParser from "body-parser";

import databases from "./database.js";

let app = express();

const watcher = new EventEmitter();

const db = new databases("localhost", "root", "root", "pdam_monitoring");

var lampu_static_1 = new netServer(5000, "192.168.1.101", db);

// lampu_static_1.send();
watcher.on("Send", ({ trigger, id }) => {
  switch (id) {
    case "1":
      lampu_static_1.send(trigger, id);
      break;

    case "2":
      lampu_static_1.send(trigger, id);
      break;

    default:
      break;
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pdam_monitoring",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());

app.get("/", (req, res) => {
  res.json("Testing Acces From Local Network");
});

app.get("/devices/list", (req, res) => {
  con.query(
    "SELECT * FROM devices ORDER BY id",
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.get("/devices/get/:id", (req, res) => {
  const { id } = req.params;

  con.query(
    `SELECT * FROM devices WHERE id=${id} `,
    function (err, result, fields) {
      if (err) throw err;
      res.json(result[0]);
    }
  );
  // res.json("wawa");
});

app.get("/transaction/:id", (req, res) => {
  con.query(
    "SELECT * FROM devices ORDER BY id",
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/device/update/status/:id", (req, res) => {
  const status = req.body.status;
  const id = req.params.id;
  con.query(
    `UPDATE devices SET STATUS=${status} WHERE id = ${id}`,
    function (err, result, fields) {
      if (err) throw err;
      watcher.emit("Send", { id: id, trigger: status });

      res.json(result);
    }
  );
});

app.get("/device/update/price/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.query;
  con.query(
    `UPDATE devices SET PRICE=${price} WHERE id = ${id}`,
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.on("error", (err) => {
  console.log("Server already started");
});

app.once("error", function (err) {
  if (err.code === "EADDRINUSE") {
    // port is currently in use
  }
});

app.once("listening", function () {
  // close the app if listening doesn't fail
  app.close();
});

app.listen(5000, () => {
  console.log("CORS ENABLED");
});
