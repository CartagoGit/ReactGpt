export const ENDPOINTS = {
  ORTHOGRAPHY: {
    CHECK: "/orthography/check",
  },
  PRO_CON: {
    DICUSSER: "/pro-con/dicusser",
    STREAM: "/pro-con/stream",
  },
  TRANSLATE: "/translate",
  TEXT_TO_AUDIO: {
    AUDIO: "/text-to-voice",
    STREAM: "/text-to-voice/stream",
    DATA: "/text-to-voice/data",
  },
} as const;
