import { resolve } from "path";
import { pipeline } from "stream/promises";
import { Writable } from "stream";
import fs from "fs";
import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return coloring("Invalid input", colors.fg.yellow);
  const pathToFile = params[0];
  try {
    const file = resolve(pathToFile);
    const read = fs.createReadStream(file, "utf-8");
    await pipeline(read, new Writable({
      decodeStrings: false,
      write(chunk, _, callback) {
        console.log(chunk);
        callback();
      },
    }));
    return coloring("Operation successful", colors.fg.green);
    // env.print("\n");
    // env.printCurrentDir();
  } catch (err) {
    return coloring("Operation failed", colors.fg.red);
  }
};

const about = coloring(
  `Usage: cat <path_to_file>\nRead file and print it's content in console`,
  colors.fg.green
);

const cat = () => {
  return { func, about };
};

export default cat;