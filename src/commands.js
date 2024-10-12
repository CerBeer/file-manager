import man from "./commands/man.js";
import help from "./commands/help.js";
import exit from "./commands/exit.js";

const commandsList = {
  man: man,
  help: help,
  "?": help,
  ".exit": exit,
};

const isKnownCommand = (command) => {
  return command.length && commandsList.hasOwnProperty(command);
};

const getCommand = (command) => {
  if (!isKnownCommand(command)) {
    return () => {
      return 'Command not found, try "help"';
    };
  }
  const { func } = commandsList[command]();
  return func;
};

export const getMan = (command) => {
  if (!isKnownCommand(command)) {
    return 'Command not found, Try "man *" to get a list of commands';
  }
  const { about } = commandsList[command]();
  return about;
};

export const getCommandsList = () => {
  return Object.keys(commandsList).sort().join(",");
};

export default getCommand;
