import os from "node:os";

console.log("OS: ", os.type());
console.log("Platform: ", os.platform());
console.log("Architcture: ", os.arch());
console.log("Total meomory (bytes): ", os.totalmem());
console.log("Free memory (bytes): ", os.freemem());
console.log("Directory user: ", os.homedir());
console.log("Time activity (Seconds): ", os.uptime());
console.log("CPUS: ", os.cpus());
console.log("Network interface: ", os.networkInterfaces());
console.log("--------------------");

console.log("Number nucleos: ", os.cpus().length);
console.log("Hostname: ", os.hostname());
console.log("Release OS: ", os.release());
