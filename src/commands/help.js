import coloring, { colors } from "../utils/colors.js";

const func = () => {
  return coloring(
    'Try "man <command>" to get information about <command>',
    colors.fg.green
  );
};

const about = coloring(
  'The "help" command is a tool that allows users to access information about command "man"',
  colors.fg.green
);

const help = () => {
  return { func, about };
};

export default help;
