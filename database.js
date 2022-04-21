import mysql from "mysql";

let con = mysql.createConnection({
  host: "192.168.1.100",
  user: "root",
  password: "root",
  database: "pdam_monitoring",
});

console.log("tes");

// var db = new sqlite3.Database(
//   "./database/home_key.db",
//   sqlite3.OPEN_READWRITE,
//   (err) => {
//     if (err) return console.error(err.message);

//     console.log("connection Successful");
//   }
// );

///////Creating Table RUN ONCE/////////////
// db.run(`CREATE TABLE door_home(
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   NAME TEXT NOT NULL,
//   RFID_KEY TEXT NOT NULL
// )`);

// //////Insert Data //////////////////
// const sql = `INSERT INTO door_home(id,NAME,RFID_KEY) VALUES(?,?,?)`;

// db.run(sql, [, "david", "F7 D3 7B B5 EA"], (err) => {
//   if (err) return console.error(err.message);

//   console.log("New Rows has been created");
// });

// //////Read Data //////////////////
// const sql = `select * from door_home`;

// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   console.log(rows);
//   //   rows.forEach((row) => {
//   //     console.log(row);
//   //   });
// });

// //////Delete Data //////////////////
// const sql = `DELETE FROM door_home
// WHERE ID = 3`;

// db.run(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   console.log("data has been deleted");
// });

// db.close((err) => {
//   if (err) return console.error(err.message);

//   console.log("connection Closed");
// });
