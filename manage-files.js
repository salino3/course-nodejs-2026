import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

// slash '/' optional
const contentReadFile = await readFile("./archivo.txt", "utf-8");

console.log("contentReadFile: ", contentReadFile);

//* Version 1
// const outputDir = "output/files/documents";

//* Version 2 with 'join' for every operation system, (slashes folders)
const outputDir = join("output", "files", "documents");

// with 'recursive' it makes the folder even if not exist the
// first folder and it makes the nexts folder if they don't exist
await mkdir(outputDir, { recursive: true });

const upperCaseContent = contentReadFile.toUpperCase();
await writeFile(`./${outputDir}/archivo-uppercase.txt`, upperCaseContent);
console.log("upperCaseContent: ", upperCaseContent);
console.log("Name extention: ", extname(upperCaseContent));
console.log(
  "Name basename: ",
  basename(`./${outputDir}/archivo-uppercase.txt`)
);
