import crypto from "crypto";
import fs from "fs";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const arg = params[0];
  try {
    const input = fs.createReadStream(arg);
    const fileHash = await new Promise((resolve, reject) => {
      const hash = crypto.createHash("sha256");
      const rs = input;
      rs.on("error", reject);
      rs.on("data", (chunk) => hash.update(chunk));
      rs.on("end", () => resolve(hash.digest("hex")));
    });
    env.print(`Hash is:\n${fileHash}`);
    return "";
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: hash <path_to_file>\nCalculate hash for file and print it into console`,
  colors.fg.green
);

const hash = () => {
  return { func, about };
};

export default hash;
