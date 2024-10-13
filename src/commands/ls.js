import fs from "node:fs/promises";
import coloring, { colors } from "../utils/colors.js";

const listDir = async (source) => {
  const dirEntry = await fs.readdir(source, { withFileTypes: true });

  const result = new Array();
  dirEntry.forEach((entry) => {
    const newEntry = {
      Name: entry.name,
      Type: entry.isFile() ? "file" : "directory",
    };
    result.push(newEntry);
  });
  return result;
};

const func = async (_, env) => {
  try {
    const result = await listDir(env.workPath);
    result.sort((a, b) => {
      const af = `${a.Type}${a.Name}`;
      const bf = `${b.Type}${b.Name}`;
      if (af > bf) return 1;
      if (af < bf) return -1;
      return 0;
    });
    console.table(result);
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailed;
  }
};

const about = coloring(
  `Usage: ls
Print in console list of all files and folders in current directory. List contain:
-files and folder names (for files - with extension)
-folders and files are sorted in alphabetical order ascending, but list of folders goes first
-type of directory content marked explicitly as a corresponding column value`,
  colors.fg.green
);

const ls = () => {
  return { func, about };
};

export default ls;
