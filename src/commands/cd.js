import coloring, { colors } from "../utils/colors.js";

const func = (params, env) => {
  if (!params.length) return coloring("Invalid input", colors.fg.yellow);
  const pathToDirectory = params[0];
  try {
    process.chdir(pathToDirectory);
    env.workPath = process.cwd();
    return coloring('Operation successful', colors.fg.green);
  } catch (err) {
    return coloring("Operation failed", colors.fg.red);
  }
};

const about = coloring(
  `Go to dedicated folder from current directory (path_to_directory can be relative or absolute)`,
  colors.fg.green
);

const cd = () => {
  return { func, about };
};

export default cd;
