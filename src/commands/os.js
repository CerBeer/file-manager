import { cpus, userInfo, EOL, homedir } from "os";
import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const arg = params[0];
  try {
    switch (arg) {
      case "--cpus":
        const cpusInfo = cpus().map(({ model, speed }) => ({
          model,
          speed: (speed / 1000).toFixed(1),
        }));
        console.table(cpusInfo);
        env.print(`Quantity: ${cpusInfo.length}\n`);
        break;
      case "--architecture":
        env.print(process.arch);
        break;
      case "--homedir":
        env.print(homedir());
        break;
      case "--username":
        env.print(userInfo().username);
        break;
      case "--EOL":
        env.print(JSON.stringify(EOL));
        break;
      default:
        return env.messages.InvalidParameters;
    }
    env.print("\n");
    return "";
  } catch (err) {
    return env.messages.OperationFailed;
  }
};

const about = coloring(
  `Usage: os --<paramater>
Operating system info, prints following information in console:
--EOL
  default system End-Of-Line
--cpus
  host machine CPUs info
--homedir
  home directory
--username
  current system user name
--architecture
  CPU architecture for which Node.js binary has compiled and print it to console`,
  colors.fg.green
);

const os = () => {
  return { func, about };
};

export default os;
