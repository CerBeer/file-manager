import coloring, { colors } from "../utils/colors.js";

const func = () => {
  return coloring(
    `File Manager is a tutorial project that can do the following:
-Perform basic file operations (copy, move, delete, rename, etc.)
-Get information about the host machine's operating system
-Perform hash calculations
-Compress and decompress files`,
    colors.fg.green
  );
};

const aboutCommand = coloring(
  'The "about" command is a tool that allows users to access information about File Manager',
  colors.fg.green
);

const about = () => {
  return { func, about: aboutCommand };
};

export default about;
