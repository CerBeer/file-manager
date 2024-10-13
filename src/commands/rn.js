import { resolve } from "path";
import fs, { rename } from "node:fs/promises";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (params.length < 2) return env.messages.InvalidParameters;
  const source = resolve(params[0]);
  const destination = resolve(params[1]);
  if (source === destination) return env.messages.InvalidParameters;

  try {
    const errorSourceNeedThrow = await fs
      .access(source)
      .then(() => false)
      .catch(() => true);
    const errSrc = { message: `FNF: File not found, source: ${source}` };
    if (errorSourceNeedThrow)
      return env.messages.OperationFailedWithError(errSrc);

    const errorDestNeedThrow = await fs
      .access(destination)
      .then(() => true)
      .catch(() => false);
    const errDest = {
      message: `FAE: File already exist, destination: ${destination}`,
    };
    if (errorDestNeedThrow)
      return env.messages.OperationFailedWithError(errDest);

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
