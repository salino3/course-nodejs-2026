import { mkdir, readFile, writeFile } from "node:fs/promises";

const contentReadFile = await readFile("./archivo.txt", "utf-8");

console.log("contentReadFile: ", contentReadFile);

const outputDir = "output/files/documents";
// with 'recursive' it makes the folder even if not exist the
// first folder and it makes the nexts folder if they don't exist
await mkdir(outputDir, { recursive: true });

const upperCaseContent = contentReadFile.toUpperCase();
await writeFile(`./${outputDir}/archivo-uppercase.txt`, upperCaseContent);
console.log("upperCaseContent: ", upperCaseContent);
