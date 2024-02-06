const envs = import.meta.env;

export const CONSTANTS = {
  GPT_URL: `${envs["API_HOST"]}:${envs["API_PORT"]}${envs["API_GPT"]}`,
};
