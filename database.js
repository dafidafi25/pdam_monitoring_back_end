import mysql from "mysql";

export default class databases {
  constructor(host, user, password, database) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;

    this.db = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: "pdam_monitoring",
    });
  }

  insertPdamData(date, start_time, end_time, measurement) {
    var query = `INSERT INTO pdam (date,start_time,end_time,measurement) VALUES ('${date}','${start_time}','${end_time}','${measurement}')`;
    this.db.query(query, (err, result) => {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
  }

  getPdamDataByPage() {
    var query = `SELECT * FROM pdam`;
    this.db.query(query, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    });
  }
}

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
