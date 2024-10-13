import coloring, { colors } from "./utils/colors.js";
import man from "./commands/man.js";
import help from "./commands/help.js";
import exit from "./commands/exit.js";
import about from "./commands/about.js";
import cat from "./commands/cat.js";
import cd from "./commands/cd.js";
import ls from "./commands/ls.js";
import up from "./commands/up.js";
import os from "./commands/os.js";

const commandsList = {
  ".exit": exit,
  "?": help,
  about: about,
  man: man,
  help: help,
  cat: cat,
  cd: cd,
  ls: ls,
  up: up,
  os:os,
};

const isKnownCommand = (command) => {
  return command.length && commandsList.hasOwnProperty(command);
};

const getCommand = (command) => {
  if (!isKnownCommand(command)) {
    return () => {
      return coloring(
        'Invalid input\nCommand not found, try "help"',
        colors.fg.yellow
      );
    };
  }
  const { func } = commandsList[command]();
  return func;
};

export const getMan = (command) => {
  if (!isKnownCommand(command)) {
    return coloring(
      'Command not found, Try "man *" to get a list of commands',
      colors.fg.yellow
    );
  }
  const { about } = commandsList[command]();
  return about;
};

export const getCommandsList = () => {
  return Object.keys(commandsList).sort().join(",");
};

export default getCommand;
