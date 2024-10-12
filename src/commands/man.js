import { getMan, getCommandsList } from "../commands.js";

const func = (params = []) => {
  if (!params.length) return 'Usage: man <command>';
  const command = params[0];
  if (command === "*") return getCommandsList();
  return getMan(command);
};

const about =
  'Usage: man <command>\nThe "man" command is a tool that allows users to access detailed information about commands\nTry "man *" to get a list of commands';

const man = () => {
  return { func, about };
};

export default man;
