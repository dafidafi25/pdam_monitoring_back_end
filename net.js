import net from "net";

export default class netServer {
  constructor(port, ip, db) {
    this.port = port;
    this.ip = ip;
    this.connected = false;
    this.retrying = false;
    this.timeout = 1000;
    this.client = new net.Socket();
    this.db = db;

    this.client.on("connect", () => {
      this.connected = true;
      console.log("Connected to " + this.ip + " " + this.port);
    });

    this.client.on("data", (data) => {
      data = String(data);

      if (!data) return;
      const date_index = data.indexOf(",");
      const start_time_index = data.indexOf(",", date_index + 1);
      const end_time_index = data.indexOf(",", start_time_index + 1);
      const measurement_index = data.indexOf(">", end_time_index + 1);

      const created_at = data.substring(1, date_index);
      const start_time = data.substring(date_index + 1, start_time_index);
      const end_time = data.substring(start_time_index + 1, end_time_index);
      const measurement = data.substring(end_time_index + 1, measurement_index);

      this.db.insertPdamData(created_at, start_time, end_time, measurement);

      // console.log(test);
    });

    this.client.on("close", () => {
      this.connected = false;
      console.log("Connection closed");
      if (!this.retrying) {
        this.retrying = true;
        console.log("Reconnecting...");
      }
      setTimeout(this.open(), this.timeout);
    });

    this.client.on("error", () => {
      console.log("Error Trying to reconnecting.......");
    });

    this.client.on("timeout", () => {
      console.log("Timeout");
    });

    this.open();
  }
  open() {
    this.client.connect(this.port, this.ip);
  }
  send(data, id) {
    console.log(`<${id},${data}>`);
    this.client.write(`<${id},${data}>`);
  }
}

// let lampu_static_1 = new netServer(5000, "192.168.1.101");
// client = new net.Socket();
// client.connect(5000, "192.168.1.101");

// client.write("<" + 1 + "," + 0 + ">");
