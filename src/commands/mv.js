import { resolve, parse } from "path";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import fs, {rm} from "fs/promises";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (params.length < 2) return env.messages.InvalidParameters;
  const source = resolve(params[0]);
  const { base } = parse(source);
  const destination = resolve(params[1], base);
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

    const read = createReadStream(source);
    const write = createWriteStream(destination);
    await pipeline(read, write);
    await rm(source);
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: mv <path_to_file> <path_to_new_directory>\nMove file to new directory`,
  colors.fg.green
);

const mv = () => {
  return { func, about };
};

export default mv;
