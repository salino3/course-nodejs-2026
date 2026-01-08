import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

//* node --experimental-permission --permission <name file.extension>
//* node --experimental-permission --permission --allow-fs-read="*" <name file.extension>
//* node --experimental-permission --permission --allow-fs-write="*" <name file.extension>
//* node --experimental-permission --permission --allow-fs-read="./archvio.txt" --allow-fs-write="./output/*" <name file.extension>

let contentReadFile = "";

if (process.permission && process.permission.has("fs.read", "./archivo.txt")) {
  // slash '/' optional
  contentReadFile = await readFile("./archivo.txt", "utf-8");

  console.log("contentReadFile: ", contentReadFile);
} else {
  console.log("Error, no permission read file");
}

const outputDir = join("output", "files", "documents");

if (
  process.permission.has("fs.write", `./${outputDir}/archivo-uppercase.txt`)
) {
  //* Version 1
  // const outputDir = "output/files/documents";

  //* Version 2 with 'join' for every operation system, (slashes folders)

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
} else {
  console.log("Error, no permission write file");
}
