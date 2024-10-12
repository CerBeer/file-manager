const func = (_, env) => {
  env.rl.close();
};

const about =
  'The ".exit" command is a command that exit from File Manager\nAlso you might use "ctrl + c"';

const exit = () => {
  return { func, about };
};

export default exit;
