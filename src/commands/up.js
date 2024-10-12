import coloring, { colors } from "../utils/colors.js";

const func = (_, env) => {
  try {
    process.chdir("..");
    env.workPath = process.cwd();
    return coloring('Operation successful', colors.fg.green);
  } catch (err) {
    return coloring("Operation failed", colors.fg.red);
  }
};

const about = coloring(
  `Go upper from current directory (when you are in the root folder this operation not change working directory)`,
  colors.fg.green
);

const up = () => {
  return { func, about };
};

export default up;
