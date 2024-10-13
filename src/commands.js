import coloring, { colors } from "./utils/colors.js";
import about from "./commands/about.js";
import add from "./commands/add.js";
import cat from "./commands/cat.js";
import cd from "./commands/cd.js";
import cp from "./commands/cp.js";
import compress from "./commands/compress.js";
import decompress from "./commands/decompress.js";
import man from "./commands/man.js";
import hash from "./commands/hash.js";
import help from "./commands/help.js";
import exit from "./commands/exit.js";
import ls from "./commands/ls.js";
import os from "./commands/os.js";
import mv from "./commands/mv.js";
import rn from "./commands/rn.js";
import up from "./commands/up.js";

const commandsList = {
  ".exit": exit,
  "?": help,
  about: about,
  add: add,
  cat: cat,
  cd: cd,
  cp: cp,
  compress: compress,
  decompress: decompress,
  man: man,
  hash: hash,
  help: help,
  ls: ls,
  os: os,
  mv: mv,
  rn: rn,
  up: up,
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
