const envs = import.meta.env;
console.log(envs);
export const CONSTANTS = {
  GPT_URL: `${envs["API_HOST"]}:${envs["API_PORT"]}${envs["API_GPT"]}`,
};
