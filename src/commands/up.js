import coloring, { colors } from "../utils/colors.js";

const func = (_, env) => {
  try {
    process.chdir("..");
    env.workPath = process.cwd();
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailed;
  }
};

const about = coloring(
  `Usage: up\nGo upper from current directory (when you are in the root folder this operation not change working directory)`,
  colors.fg.green
);

const up = () => {
  return { func, about };
};

export default up;
