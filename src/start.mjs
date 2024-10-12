import path, { dirname } from "path";
import fm from "./fm.mjs";

const env = {};

process.stdin.resume();
process.stdin.setEncoding("utf-8");

const args = process.argv;
env.userName = 'undefined';
if (args.length > 2) {
  const splitParam = args[2].split('=');
  if (splitParam.length > 1 && splitParam[0] === '--username') env.userName = splitParam[1];
};

env.workPath = 'workPath';

env.input = process.stdin;
env.output = process.stdout;
env.print = (outputData) => {
  if (typeof outputData === 'string') env.output.write(outputData);
  else env.output.write(JSON.stringify(outputData));
};

process.stdin.on("data", async (inputString) => {
  fm(env, inputString);
  env.print(`You are currently in ${env.workPath} > `);
});

process.on( "SIGINT", function() {
  process.exit();
} );

process.on( "exit", function() {
  console.log(`\n\nThank you for using File Manager, ${env.userName}, goodbye!\n`);
} );

env.print(`Welcome to the File Manager, ${env.userName}!\n`);
env.print(`You are currently in ${env.workPath} > `);
