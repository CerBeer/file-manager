const userNameFromArgs = () => {
  const args = process.argv;
  let userName = "undefined";
  if (args.length > 1) {
    args.forEach((val) => {
      const splitParam = val.split("=");
      if (splitParam.length > 1 && splitParam[0] === "--username")
        userName = splitParam[1];
    });
  }
  return userName;
};

export default userNameFromArgs;
