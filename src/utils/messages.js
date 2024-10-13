import coloring, { colors } from "./colors.js";

const messages = {
  OperationFailed: coloring("Operation failed", colors.fg.red),
  OperationSuccessful: coloring("Operation successful", colors.fg.green),
  InvalidInput: coloring("Invalid input", colors.fg.yellow),
  InvalidParameters: coloring(
    "Invalid input. Wrong parameters.\nTry command 'help' to get help",
    colors.fg.yellow
  ),
};

export default messages;
