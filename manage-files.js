import { readFile } from "node:fs/promises";

const contentReadFile = await readFile("./archivo.txt", "utf-8");

console.log("contentReadFile: ", contentReadFile);
