const parseInputString = (inputString) => {
  const result = { command: "", args: [] };
  const stripString = inputString.trim();
  if (!stripString.length) return result;

  const splitString = stripString.split(" ");

  result.command = splitString[0];
  if (splitString.length === 1) return result;

  const params = splitString.slice(1);
  let complexParam = false;
  for (let i = 0; i < params.length; i += 1) {
    let currParam = params[i];
    if (complexParam) {
      if (currParam.slice(-1) === '"') {
        complexParam = false;
        currParam = currParam.slice(0, -1);
      }
      result.args[result.args.length - 1] = `${
        result.args[result.args.length - 1]
      } ${currParam}`;
    } else {
      if (currParam.length) {
        if (currParam.slice(0, 1) === '"') {
          currParam = currParam.slice(1);
          complexParam = true;
          if (currParam.slice(-1) === '"') {
            complexParam = false;
            currParam = currParam.slice(0, -1);
          }
        }
        result.args.push(currParam);
      }
    }
  }
  return result;
};

export default parseInputString;
