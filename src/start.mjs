import { homedir } from "os";
import readline from "readline";

import userNameFromArgs from "./utils/user.js";
import fm from "./fm.js";

import messages from "./utils/messages.js";

process.chdir(homedir());

const env = {};
env.messages = messages;
env.userName = userNameFromArgs();
env.workPath = process.cwd();
env.output = process.stdout;
env.print = (outputData) => {
  if (typeof outputData === "string") env.output.write(outputData);
  else env.output.write(JSON.stringify(outputData));
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
env.rl = rl;

rl.on("line", (line) => fm(env, line))
  .on("SIGINT", () => rl.close())
  .on("close", () => printGoodBye());

const printGoodBye = () =>
  env.print(
    `\n\nThank you for using File Manager, ${env.userName}, goodbye!\n`
  );

env.printCurrentDir = () =>
  env.print(`\nYou are currently in ${env.workPath}\n> `);

env.print(`Welcome to the File Manager, ${env.userName}!\n`);
env.printCurrentDir();
