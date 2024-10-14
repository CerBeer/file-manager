import coloring, { colors } from "./colors.js";

const messages = {
  OperationFailed: coloring("Operation failed", colors.fg.red),
  OperationFailedWithError: (err) => {
    const errMessage = err.message.replace(": ", ":\n").replace(", ", ",\n");
    return `${coloring("Operation failed!", colors.fg.red)}\n${coloring(
      errMessage,
      colors.fg.yellow
    )}`;
  },
  OperationSuccessful: coloring("Operation successful", colors.fg.green),
  InvalidInput: coloring("Invalid input", colors.fg.yellow),
  InvalidParameters: coloring(
    "Invalid input. Wrong parameters.\nTry command 'help' to get help",
    colors.fg.yellow
  ),
};

export default messages;
