import coloring, { colors } from "../utils/colors.js";

const func = (_, env) => {
  env.rl.close();
};

const about = coloring(
  'The ".exit" command is a command that exit from File Manager\nAlso you might use "ctrl + c"',
  colors.fg.green
);

const exit = () => {
  return { func, about };
};

export default exit;
