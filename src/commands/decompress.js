import { resolve } from "path";
import util from "util";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
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

    const read = createReadStream(source);
    const write = createWriteStream(destination);

    const pipelinePromis = util.promisify(pipeline);
    await pipelinePromis(read, createBrotliDecompress(), write);
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: decompress <path_to_file> <path_to_destination_file>\nDecompress file using Brotli algorithm`,
  colors.fg.green
);

const decompress = () => {
  return { func, about };
};

export default decompress;
