import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const dir = process.argv[2] ?? ".";

const formatBytes = (size) => {
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(2)} KB`;
};

const files = await readdir(dir);

console.log("clog1", files);

const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name);
    const info = await stat(fullPath);

    return {
      name,
      isDIr: info.isDirectory(),
      size: formatBytes(info.size),
    };
  })
);

for (const entry of entries) {
  const icon = entry.isDIr ? "📁" : "📄";
  const size = entry.isDIr ? "-" : `${entry.size}`;
  console.log("clog2", `${icon}   ${entry.name.padEnd(25)} ${size}`);
}

//
// const args = process.argv ;
// console.log("Args", args);
