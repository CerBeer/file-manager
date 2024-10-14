import fs from "node:fs/promises";

const exist = async (file) => {
  const result = await fs
    .access(file)
    .then(() => true)
    .catch(() => false);
  return result;
};

const notExist = async (file) => {
  const result = await exist(file);
  return !result;
};

const checkSourceExist = async (file) => {
  const fileExist = await exist(file);
  const result = { checked: true, errMsg: "" };
  if (!fileExist) {
    result.checked = false;
    result.errMsg = { message: `FNF: File not found, source: ${file}` };
  }
  return result;
};

const checkDestinationNotExist = async (file) => {
  const fileExist = await exist(file);
  const result = { checked: true, errMsg: "" };
  if (fileExist) {
    result.checked = false;
    result.errMsg = { message: `FAE: File already exist, destination: ${file}` };
  }
  return result;
};

const checkSourceExistDestinationNotExist = async (source, destination) => {
  const result = await checkSourceExist(source);
  if (!result.checked) return result;
  return await checkDestinationNotExist(destination);
};

const fileUtils = {
  exist,
  notExist,
  checkSourceExist,
  checkDestinationNotExist,
  checkSourceExistDestinationNotExist,
};

export default fileUtils;
