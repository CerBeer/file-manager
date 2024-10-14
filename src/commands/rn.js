import { resolve } from "path";
import { rename } from "node:fs/promises";
import fileUtils from "../utils/file.js";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (params.length < 2) return env.messages.InvalidParameters;
  const source = resolve(params[0]);
  const destination = resolve(params[1]);
  if (source === destination) return env.messages.InvalidParameters;

  try {
    const check = await fileUtils.checkSourceExistDestinationNotExist(source, destination);
    if (!check.checked) {
      return env.messages.OperationFailedWithError(check.errMsg);
    }

    await rename(source, destination);
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: rn <path_to_file> <new_filename>\nRename file, content remain unchanged`,
  colors.fg.green
);

const rn = () => {
  return { func, about };
};

export default rn;
