const { VITE_API_GPT, VITE_API_HOST, VITE_API_PORT } = import.meta.env;

export const CONSTANTS = {
  GPT_URL: `${VITE_API_HOST}:${VITE_API_PORT}${VITE_API_GPT}`,
};
