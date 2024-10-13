import { resolve } from "path";
import fs, { rm } from "fs/promises";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const source = resolve(params[0]);

  try {
    const errorSourceNeedThrow = await fs
      .access(source)
      .then(() => false)
      .catch(() => true);
    const errSrc = { message: `FNF: File not found, source: ${source}` };
    if (errorSourceNeedThrow)
      return env.messages.OperationFailedWithError(errSrc);

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
