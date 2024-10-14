import { resolve, parse } from "path";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import fileUtils from "../utils/file.js";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (params.length < 2) return env.messages.InvalidParameters;
  const source = resolve(params[0]);
  const { base } = parse(source);
  const destination = resolve(params[1], base);
  console.log(source, base, params[1], destination);
  if (source === destination) return env.messages.InvalidParameters;

  try {
    const check = await fileUtils.checkSourceExistDestinationNotExist(source, destination);
    if (!check.checked) {
      return env.messages.OperationFailedWithError(check.errMsg);
    }

    const read = createReadStream(source);
    const write = createWriteStream(destination);
    await pipeline(read, write);
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: cp <path_to_file> <path_to_new_directory>\nCopy file to new directory`,
  colors.fg.green
);

const cp = () => {
  return { func, about };
};

export default cp;
