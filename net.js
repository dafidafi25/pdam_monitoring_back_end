import net from "net";

export default class netServer {
  constructor(port, ip) {
    this.port = port;
    this.ip = ip;
    this.connected = false;
    this.retrying = false;
    this.timeout = 1000;
    this.client = new net.Socket();
    this.client.on("connect", () => {
      this.connected = true;
      console.log("Connected to " + this.ip + " " + this.port);
    });
    this.client.on("data", (data) => {
      console.log("Received: " + data);
    });
    this.client.on("close", () => {
      this.connected = false;
      console.log("Connection closed");
      if (!this.retrying) {
        retrying = true;
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
    console.log(data + id);
    // if (this.connected) {
    //   if (id == "1310") {
    //     this.client.write(
    //       "<" + id + "," + data.dimmer + "," + data.condition + ">"
    //     );
    //   }
    //   if (id == "1250" || id == "1240") {
    //     this.client.write("<" + id + "," + data.condition + ">");
    //     console.log("<" + id + "," + data.condition + ">");
    //   }
    // }
  }
}
