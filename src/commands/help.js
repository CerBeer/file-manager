const func = () => {
  return 'Try "man <command> to get information about <command>';
};

const about =
  'The "help" command is a tool that allows users to access information about command "man"';

const help = () => {
  return { func, about };
};

export default help;
