import express from "express";
import cors from "cors";

import mysql from "mysql";
import bodyParser from "body-parser";

let app = express();

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

app.listen(5000, () => {
  console.log("CORS ENABLED");
});

function main() {
  // let lampu_static_1 = new netServer(5000, "192.168.1.103");
  // let lampu_static_2 = new netServer(5000, "192.168.1.102");
  // let wemosDimmer = new firebaseListener('1310', server1);
  // wemosDimmer.listen();
  // let wemosLamp1 = new firebaseListener("1240", lampu_static_1);
  // let wemosLamp2 = new firebaseListener("1250", lampu_static_2);
}
main();
