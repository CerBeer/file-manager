import path, { resolve } from "path";
import fs from "node:fs/promises";
import fileUtils from "../utils/file.js";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const destination = resolve(params[0]);
  const errDst = {
    message: `WFPoN: Wrong file path or name, destination: ${destination}`,
  };
  if (path.dirname(destination) !== env.workPath)
    return env.messages.OperationFailedWithError(errDst);
  try {
    const check = await fileUtils.checkDestinationNotExist(destination);
    if (!check.checked) {
      return env.messages.OperationFailedWithError(check.errMsg);
    }

    await fs.writeFile(destination, "");
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: add <new_file_name>\nCreate empty file in current working directory`,
  colors.fg.green
);

const add = () => {
  return { func, about };
};

export default add;
