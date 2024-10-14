import { getMan, getCommandsList } from "../commands.js";
import coloring, { colors } from "../utils/colors.js";

const func = (params = []) => {
  if (!params.length)
    return coloring(
      'Usage: man <command>\nTry command "man man"',
      colors.fg.yellow
    );
  const command = params[0];
  if (command === "*") return coloring(getCommandsList(), colors.fg.green);
  return getMan(command);
};

const about = coloring(
  `Usage: man <command>\nThe "man" command is a tool that allows users to access detailed information about commands\nTry "man *" to get a list of commands`,
  colors.fg.green
);

const man = () => {
  return { func, about };
};

export default man;
