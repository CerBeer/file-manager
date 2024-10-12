import parseInputString from "./utils/parseInputString.js";
import getCommand from "./commands.js";

const fm = (env, inputString) => {
  const command = parseInputString(inputString);
  const func = getCommand(command.command);
  const result = func(command.args, env);
  // console.log(result);
  if (typeof result === "string") {
    if (result.length) env.print(result);
    env.print("\n");
    env.printCurrentDir();
  }
};

export default fm;
