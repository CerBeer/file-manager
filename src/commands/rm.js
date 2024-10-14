import { resolve } from "path";
import { rm } from "fs/promises";
import fileUtils from "../utils/file.js";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const source = resolve(params[0]);

  try {
    const check = await fileUtils.checkSourceExist(source);
    if (!check.checked) {
      return env.messages.OperationFailedWithError(check.errMsg);
    }

    await rm(source);
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: rm <path_to_file>\nDelete file`,
  colors.fg.green
);

const remove = () => {
  return { func, about };
};

export default remove;
