import coloring, { colors } from "../utils/colors.js";

const func = (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const pathToDirectory = params[0];
  try {
    process.chdir(pathToDirectory);
    env.workPath = process.cwd();
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: cd <path_to_directory>\nGo to dedicated folder from current directory (path_to_directory can be relative or absolute)`,
  colors.fg.green
);

const cd = () => {
  return { func, about };
};

export default cd;
